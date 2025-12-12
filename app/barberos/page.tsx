import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BarberCarousel from '@/components/BarberCarousel';
import { barbersData } from '@/data/barbers';

export default function BarberosIndexPage() {
  return (
    <main className="min-h-screen bg-surface text-foreground">
      <Navbar />
      <section className="pt-24">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gradient text-gradient-fallback">Conoce al Equipo</h1>
          <p className="text-muted mb-10">Explora los perfiles de nuestros barberos y agenda tu cita con quien más te represente.</p>
        </div>
        {/* Reutilizamos el carrusel para destacar y facilitar navegación */}
        <div className="max-w-7xl mx-auto px-4">
          <BarberCarousel barbers={barbersData} />
        </div>
      </section>
      <Footer />
    </main>
  );
}

