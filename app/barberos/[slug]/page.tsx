import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import BarberBookingButton from '@/components/BarberBookingButton';
import { barbersData } from '@/data/barbers';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import type { Metadata } from 'next';

interface BarberPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return barbersData.map((barber) => ({ slug: barber.slug }));
}

export function generateMetadata({ params }: BarberPageProps): Metadata {
  const barber = barbersData.find((item) => item.slug === params.slug);

  if (!barber) {
    return {
      title: 'Barbero no encontrado | Neo Barbería',
    };
  }

  return {
    title: `${barber.nombre} (${barber.apodo}) | Neo Barbería`,
    description: barber.descripcion,
    keywords: [
      barber.nombre,
      barber.apodo,
      barber.especialidad,
      ...barber.especialidades,
      'barbero en Quilicura',
      'Neo Barbería',
    ],
    openGraph: {
      title: `${barber.nombre} (${barber.apodo}) | Neo Barbería`,
      description: barber.descripcion,
      images: [barber.imagen],
    },
  };
}

export default function BarberPage({ params }: BarberPageProps) {
  const barber = barbersData.find((item) => item.slug === params.slug);

  if (!barber) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-surface text-foreground">
      <Navbar />

      <section className="max-w-6xl mx-auto px-4 pt-28 pb-16 grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">Barbero Neo Barbería</p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gradient text-gradient-fallback">
            {barber.nombre} <span className="text-primary">“{barber.apodo}”</span>
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-2xl">{barber.bio}</p>

          <div className="flex flex-wrap gap-3">
            {barber.especialidades.map((item) => (
              <span
                key={item}
                className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/30 text-sm font-semibold"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <BarberBookingButton barberId={barber.id} label={`Agendar con ${barber.apodo}`} />
            <div className="flex items-center gap-3 text-muted">
              {barber.instagram && (
                <a
                  href={barber.instagram}
                  className="hover:text-primary transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
              )}
              {barber.facebook && (
                <a
                  href={barber.facebook}
                  className="hover:text-primary transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FontAwesomeIcon icon={faFacebook} size="lg" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="relative w-full h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-border">
          <Image
            src={barber.imagen}
            alt={barber.nombre}
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg text-sm text-white">
            {barber.especialidad}
          </div>
        </div>
      </section>

      <section className="bg-background/40 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Galería</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {barber.galeria.map((item) => (
                <div key={item.url} className="relative aspect-video overflow-hidden rounded-2xl border border-border">
                  <Image
                    src={item.url}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-border bg-surface/80 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Disponibilidad</h3>
              <ul className="space-y-3">
                {barber.disponibilidad.map((item) => (
                  <li key={`${item.dia}-${item.horario}`} className="p-3 rounded-xl bg-background border border-border/80">
                    <p className="font-semibold text-foreground">{item.dia}</p>
                    <p className="text-sm text-muted">{item.horario}</p>
                    {item.nota && <p className="text-xs text-primary mt-1">{item.nota}</p>}
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <BarberBookingButton barberId={barber.id} className="w-full justify-center flex" />
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-border bg-surface/80 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Servicios destacados</h3>
              <div className="space-y-4">
                {barber.servicios.map((servicio) => (
                  <div key={servicio.nombre} className="p-4 rounded-xl bg-background border border-border/70">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-foreground">{servicio.nombre}</p>
                        <p className="text-sm text-muted leading-relaxed">{servicio.descripcion}</p>
                      </div>
                      {servicio.precio && <span className="text-primary font-semibold">{servicio.precio}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="rounded-3xl border border-border bg-gradient-to-r from-background via-background/80 to-background shadow-xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">Reserva directa</p>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Agenda con {barber.apodo} en segundos</h3>
            <p className="text-muted max-w-2xl">Elige la fecha y horario disponibles sin seleccionar barbero nuevamente. Tu página personal ya está lista para posicionarse en Google.</p>
          </div>
          <BarberBookingButton barberId={barber.id} className="w-full md:w-auto" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
