import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/db"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "CUSTOMER",
          isOnboarded: false,
        }
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter both email and password');
        }
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user || !user.password) throw new Error('No user found with this email');
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) throw new Error('Incorrect password');
        return user;
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      // 1. Initial User Connection
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isOnboarded = user.isOnboarded;
        token.age = (user as any).age;
        token.phone = (user as any).phone;
        token.interests = (user as any).interests;

        // Check if user is a Vendor
        const vendor = await prisma.vendor.findUnique({
          where: { userId: user.id },
          select: { id: true, status: true }
        });
        token.isVendor = !!vendor;
        token.vendorId = vendor?.id;
        token.vendorStatus = vendor?.status;
      }
      
      // 2. SOVEREIGN MASTER OVERRIDE: Authorized Super Admins
      const masterAdmins = ["zomatube2012@gmail.com", "Blackhatsd.sd@gmail.com"];
      if (token.email && masterAdmins.includes(token.email)) {
        token.role = "ADMIN";
        token.isOnboarded = true; // Skip onboarding for master admins
      }

      // 3. Dynamic Updates
      if (trigger === "update" && session) {
        token.isOnboarded = session.isOnboarded !== undefined ? session.isOnboarded : token.isOnboarded;
        if (session.user) {
           token.name = session.user.name;
           token.age = session.user.age;
           token.phone = session.user.phone;
           token.interests = session.user.interests;
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).isVendor = token.isVendor;
        (session.user as any).vendorId = token.vendorId;
        (session.user as any).vendorStatus = token.vendorStatus;
        (session.user as any).isOnboarded = token.isOnboarded;
        (session.user as any).age = token.age;
        (session.user as any).phone = token.phone;
        (session.user as any).interests = token.interests;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl;
    }
  },
  pages: {
    signIn: '/login',
    newUser: '/onboarding',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};
