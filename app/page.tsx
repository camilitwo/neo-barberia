import Hero from "@/components/Hero";
import FloatingLogo from '@/components/FloatingLogo';
import WhoWeAre from "@/components/WhoWeAre";
import BarberCarousel from "@/components/BarberCarousel";
import GallerySection from "@/components/GallerySection";
import Contact from "@/components/Contact";
import FloatingBookingButton from "@/components/FloatingBookingButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryPopup from "@/components/GalleryPopup";
import { barbersData } from "@/data/barbers";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <FloatingLogo />
      <Hero />
      <WhoWeAre />
      <BarberCarousel barbers={barbersData} />
      <GallerySection />
      <Contact />
      <Footer />
      <FloatingBookingButton />
      <GalleryPopup delaySeconds={5} />
    </main>
  );
}
