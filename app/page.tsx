import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import BarberCarousel from "@/components/BarberCarousel";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import FloatingBookingButton from "@/components/FloatingBookingButton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { barbersData } from "@/data/barbers";
import { blogPostsData } from "@/data/blogPosts";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <WhoWeAre />
      <BarberCarousel barbers={barbersData} />
      <Blog posts={blogPostsData} />
      <Contact />
      <Footer />
      <FloatingBookingButton />
    </main>
  );
}
