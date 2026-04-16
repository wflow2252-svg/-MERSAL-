import HeroSection from "@/components/HeroSection";
import TrustSignals from "@/components/TrustSignals";
import CategoryWall from "@/components/CategoryWall";
import ProductTabHub from "@/components/ProductTabHub";
import StoreShowcase from "@/components/StoreShowcase";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <TrustSignals />
      <CategoryWall />
      <ProductTabHub />
      <StoreShowcase />
    </div>
  );
}

