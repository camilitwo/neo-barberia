import Navbar from '@/components/Navbar';
import AboutStory from '@/components/AboutStory';
import Footer from '@/components/Footer';

export default function NosotrosPage() {
  return (
    <main id="inicio" className="min-h-screen scroll-mt-24">
      <Navbar />
      <AboutStory />
      <Footer />
    </main>
  );
}
