import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import PricingPlans from '@/components/PricingPlans';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Planes y Precios | Neo Barbería',
  description:
    'Descubre nuestros planes de servicio: Esencial, Signature y Elite. Reserva tu experiencia de barbería premium en Quilicura.',
  keywords: 'precios barbería, planes barbería, cortes de pelo, afeitado, barbería premium, Quilicura',
};

export default function PlanesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-32 sm:pb-40 px-4 sm:px-6 max-w-7xl mx-auto">
        <PricingPlans />
      </div>
      <Footer />
    </main>
  );
}
