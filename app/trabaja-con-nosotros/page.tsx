import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import JoinTheCrew from '@/components/JoinTheCrew';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Trabaja con Nosotros | Neo Barbería',
  description:
    'Únete al equipo de Neo Barbería. Buscamos barberos apasionados que quieran desafiar los límites del cuidado masculino en Quilicura.',
};

export default function TrabajaConNosotrosPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <JoinTheCrew />
      <Footer />
    </main>
  );
}
