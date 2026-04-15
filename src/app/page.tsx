import HeroSection from "@/components/HeroSection";
import CampaignBar from "@/components/CampaignBar";
import CategoryWall from "@/components/CategoryWall";
import ProductTabHub from "@/components/ProductTabHub";
import StoreShowcase from "@/components/StoreShowcase";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <CampaignBar />
      <CategoryWall />
      <ProductTabHub />
      <StoreShowcase />
    </div>
  );
}
