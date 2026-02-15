import Hero from "@/components/Hero";
import FloatingLogo from '@/components/FloatingLogo';
import WhoWeAre from "@/components/WhoWeAre";
import BarberCarousel from "@/components/BarberCarousel";
import PopularCutsSection from "@/components/PopularCutsSection";
import GallerySection from "@/components/GallerySection";
import Contact from "@/components/Contact";
import FloatingBookingButton from "@/components/FloatingBookingButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { barbersData } from "@/data/barbers";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <FloatingLogo />
      <Hero />
      <WhoWeAre variant="preview" />
      <BarberCarousel barbers={barbersData} />
      <PopularCutsSection />
      {/*<GallerySection variant="preview" />*/}
      <Contact />
      <Footer />
      <FloatingBookingButton url="https://neooc2b.setmore.com/?fbclid=PAZXh0bgNhZW0CMTEAAaaOGfb00uDJuEsMw9NMHy2Da7Qy6sfgyZHYMtwgSEj_5R3HK1mp4I51bxU_aem_ZEFdpvIRt2yhMVwlxEbhQg#services" />
    </main>
  );
}
