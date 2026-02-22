import Navbar from '@/components/Navbar';
import WhoWeAre from '@/components/WhoWeAre';
import Footer from '@/components/Footer';

export default function NosotrosPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <WhoWeAre variant="full" />
      <Footer />
    </main>
  );
}
