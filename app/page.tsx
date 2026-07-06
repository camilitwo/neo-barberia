import Hero from "@/components/Hero";
import FloatingLogo from '@/components/FloatingLogo';
import WhoWeAre from "@/components/WhoWeAre";
import BarberCarousel from "@/components/BarberCarousel";
import StylesShowcase from "@/components/StylesShowcase";
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
      <Hero />
     
      <WhoWeAre variant="preview" />
      <BarberCarousel barbers={barbersData} />
       <StylesShowcase />
      <Contact />
      <Footer />
      <FloatingBookingButton url="https://club.neobarberia.cl/" />
    </main>
  );
}
