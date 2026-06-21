import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import FeaturedEbooks from "@/components/home/FeaturedEbooks";
import TopWriters from "@/components/home/TopWriters";
import PopularGenres from "@/components/home/PopularGenres";

export default function HomePage() {
  return (
    <div style={{ backgroundColor: "#0A1A0F" }}>
      <HeroSection />
      <StatsBar />
      <FeaturedEbooks />
      <TopWriters />
      <PopularGenres />
    </div>
  );
}