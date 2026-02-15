import Navbar from '@/components/Navbar';
import GallerySection from '@/components/GallerySection';
import Footer from '@/components/Footer';

export default function GaleriaPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <GallerySection variant="full" />
      <Footer />
    </main>
  );
}
