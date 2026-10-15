import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiInstagram } from 'react-icons/si';

import { barbersData } from '@/data/barbers';
import CdnImage from '@/components/CdnImage';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return barbersData.map((barber) => ({ id: String(barber.id) }));
}

export default async function BarberProfilePage({ params }: PageProps) {
  const { id } = await params;
  const barber = barbersData.find((b) => b.id === Number(id));

  if (!barber) return notFound();

  const barberIndex = barbersData.findIndex((b) => b.id === barber.id);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground antialiased">
      <header className="fixed left-0 right-0 top-0 z-[60] px-4 py-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/#equipo"
            className="inline-flex h-11 items-center justify-center border border-white/14 bg-black/45 px-4 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md transition-colors duration-200 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.97]"
          >
            Equipo
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center border border-white/14 bg-black/45 px-4 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md transition-colors duration-200 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.97]"
          >
            Neo
          </Link>
        </div>
      </header>

      <main className="relative">
        <section className="relative min-h-[100dvh] overflow-hidden px-4 pt-24 sm:px-6 lg:px-10">
          <div className="absolute inset-0 z-0">
            <CdnImage
              src={barber.imagen}
              alt={barber.nombre}
              fill
              priority
              sizes="100vw"
              className="object-cover grayscale contrast-125 brightness-[0.42]"
              style={{ objectPosition: barber.imagePosition ?? '50% 18%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/82 to-background/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80" />
          </div>

          <div className="relative z-10 mx-auto grid min-h-[calc(100dvh-6rem)] max-w-7xl grid-cols-1 items-end gap-10 pb-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.62fr)] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold text-primary">
                Barbero {String(barberIndex + 1).padStart(2, '0')}
              </p>
              <h1 className="max-w-[10ch] text-[clamp(4rem,13vw,8rem)] font-extrabold leading-[0.88] tracking-[-0.04em] text-white text-balance">
                {barber.apodo}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-300 sm:text-xl">
                {barber.descripcion}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {barber.instagram && (
                  <a
                    href={barber.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center gap-3 border border-primary bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-black transition-colors duration-200 hover:bg-primary-hover hover:border-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.97]"
                  >
                    <SiInstagram className="h-4 w-4" aria-hidden="true" />
                    Instagram
                  </a>
                )}
                <Link
                  href="/#equipo"
                  className="inline-flex min-h-12 items-center justify-center border border-white/16 bg-black/25 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.97]"
                >
                  Ver equipo
                </Link>
              </div>
            </div>

            <aside className="border border-white/12 bg-black/36 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.36)] backdrop-blur-md">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
                {barber.role}
              </p>
              <p className="mt-5 text-2xl font-semibold leading-tight text-white text-balance">
                &ldquo;{barber.quote}&rdquo;
              </p>
              <div className="mt-7 grid grid-cols-2 gap-4 border-t border-white/12 pt-5">
                <div>
                  <p className="text-4xl font-extrabold leading-none text-white">
                    {String(barber.yearsExperience).padStart(2, '0')}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-white/58">años de experiencia</p>
                </div>
                <div>
                  <p className="text-sm font-semibold leading-6 text-white">{barber.especialidad}</p>
                  <p className="mt-2 text-xs leading-5 text-white/58">especialidad principal</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1fr] lg:gap-14">
            <div>
              <p className="text-sm font-semibold text-primary">Forma de trabajar</p>
              <h2 className="mt-4 text-4xl font-extrabold leading-none tracking-[-0.035em] text-white sm:text-5xl text-balance">
                Detalle antes que prisa.
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {barber.interests.map((interest) => (
                <div key={interest} className="border border-white/10 bg-white/[0.035] px-4 py-4">
                  <p className="text-sm font-semibold leading-6 text-white">{interest}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-32 sm:px-6 lg:px-10">
          <div className="mb-8 flex items-end justify-between gap-6 border-t border-white/12 pt-10">
            <div>
              <p className="text-sm font-semibold text-primary">Archivo de cortes</p>
              <h2 className="mt-3 text-4xl font-extrabold leading-none tracking-[-0.035em] text-white sm:text-5xl">
                Trabajos destacados
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {barber.signatureCuts.map((cut, index) => (
              <div
                key={`${cut.imagen}-${index}`}
                className="group relative overflow-hidden border border-white/10 bg-black"
              >
                <CdnImage
                  src={cut.imagen}
                  alt={cut.label || `${barber.apodo} corte destacado ${index + 1}`}
                  width={900}
                  height={1125}
                  className="aspect-[4/5] w-full object-cover grayscale contrast-125 brightness-90 transition duration-500 ease-out group-hover:grayscale-0 group-hover:scale-[1.03]"
                />
                {cut.label && (
                  <div className="absolute bottom-3 left-3 border border-white/14 bg-black/42 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                    {cut.label.replaceAll('_', ' ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
