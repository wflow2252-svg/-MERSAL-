import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.json();
    const { image, filename } = formData; // For base64 or simpler handling if needed

    // However, native FormData is better for gallery uploads
    // Let's support both but prioritize standard FormData for mobile
    
    // If standard multi-part boundary exists:
    let data;
    try {
      data = await req.formData();
    } catch (e) {
      // Fallback for JSON-based base64 if necessary
      return NextResponse.json({ error: "Please use FormData for image uploads" }, { status: 400 });
    }

    const file = data.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize and generate unique name
    const ext = path.extname(file.name) || ".jpg";
    const uniqueName = `${crypto.randomUUID()}${ext}`;
    
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    
    // Ensure dir exists
    await mkdir(uploadDir, { recursive: true });
    
    const filePath = path.join(uploadDir, uniqueName);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${uniqueName}`;
    return NextResponse.json({ url: publicUrl });

  } catch (error: any) {
    console.error("Upload API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
