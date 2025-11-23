import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import BarberCarousel from "@/components/BarberCarousel";
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
      <WhoWeAre />
      <BarberCarousel barbers={barbersData} />
      <Contact />
      <Footer />
      <FloatingBookingButton url="https://booksy.com" />
    </main>
  );
}
