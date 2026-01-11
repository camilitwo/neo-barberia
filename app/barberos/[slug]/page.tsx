import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { barbersData } from '@/data/barbers';

interface BarberProfilePageProps {
  params: { slug: string };
}

export default function BarberProfilePage({ params }: BarberProfilePageProps) {
  const barber = barbersData.find((item) => item.slug === params.slug);

  if (!barber) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="px-4 pt-28 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 text-sm text-muted mb-6">
            <Link href="/" className="hover:text-primary">
              Inicio
            </Link>
            <span className="text-border">/</span>
            <span className="text-primary">{barber.apodo}</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-start">
            <div className="glass-effect rounded-3xl p-6 sm:p-8 border border-border">
              <div className="relative w-full h-[360px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={barber.imagen}
                  alt={`Retrato de ${barber.nombre}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.3em] text-primary">
                  {barber.especialidad}
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mt-3">
                  {barber.nombre}
                </h1>
                <p className="text-muted mt-4 leading-relaxed">{barber.descripcion}</p>

                <div className="mt-6 grid gap-4">
                  <div className="flex items-center justify-between rounded-2xl border border-border bg-surface/70 px-5 py-4">
                    <span className="text-sm uppercase tracking-[0.2em] text-muted">
                      Disponibilidad
                    </span>
                    <span className="text-sm font-semibold text-white">{barber.disponibilidad}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {barber.servicios.map((servicio) => (
                      <span
                        key={servicio}
                        className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary"
                      >
                        {servicio}
                      </span>
                    ))}
                  </div>
                </div>

                {(barber.instagram || barber.facebook) && (
                  <div className="mt-6 flex flex-wrap gap-4 text-sm">
                    {barber.instagram && (
                      <a
                        href={barber.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-border px-4 py-2 text-muted hover:text-primary hover:border-primary transition"
                      >
                        Instagram
                      </a>
                    )}
                    {barber.facebook && (
                      <a
                        href={barber.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-border px-4 py-2 text-muted hover:text-primary hover:border-primary transition"
                      >
                        Facebook
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Galería personal</h2>
                <div className="grid grid-cols-2 gap-4">
                  {barber.galeria.slice(0, 3).map((foto, index) => (
                    <div
                      key={foto.src}
                      className={`relative overflow-hidden rounded-2xl border border-border shadow-xl ${
                        index === 0 ? 'col-span-2 h-56' : 'h-40'
                      }`}
                    >
                      <Image
                        src={foto.src}
                        alt={foto.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-4">Publicaciones</h2>
                <div className="space-y-4">
                  {barber.publicaciones.slice(0, 1).map((post) => (
                    <article
                      key={post.titulo}
                      className="rounded-2xl border border-border bg-surface/80 px-5 py-4"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-primary">{post.fecha}</p>
                      <h3 className="text-lg font-semibold text-white mt-2">{post.titulo}</h3>
                      <p className="text-muted text-sm mt-2">{post.resumen}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
