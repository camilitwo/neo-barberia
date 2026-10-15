import Link from 'next/link';
import CdnImage from '@/components/CdnImage';

export default function AboutStory() {
  return (
    <article className="neo-about relative isolate mx-auto max-w-7xl px-5 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-40">
      <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <header>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Nosotros · Neo Barbería</p>
          <h1 className="max-w-xl !font-sans text-[clamp(2.5rem,4vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.04em] text-foreground [text-wrap:balance]">
            Más que un corte.<br />Una experiencia.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Un espacio en Quilicura para desconectarte, encontrar tu estilo y salir sintiéndote mejor que cuando llegaste.
          </p>
          <Link href="/#equipo" className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-5 border border-primary bg-primary px-5 py-3 text-sm font-bold !text-background transition-colors hover:bg-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:w-auto">
            Conoce a los barberos <span aria-hidden="true">↗</span>
          </Link>
        </header>

        <figure className="relative min-w-0">
          <div className="neo-team-photo relative mr-2 sm:mr-3">
          <CdnImage
            src="https://ik.imagekit.io/cigv/neobarberia_2026-01-28_09_23/barbers/team-neo.webp"
            alt="Los tres integrantes del equipo de Neo Barbería frente al logo del local"
            width={1448}
            height={1086}
            priority
            sizes="(min-width: 1280px) 676px, (min-width: 1024px) 55vw, (min-width: 640px) calc(100vw - 48px), calc(100vw - 40px)"
            className="h-auto w-full"
          />
          </div>
          <figcaption className="relative mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm text-muted">
            <span>El equipo detrás de cada corte.</span>
            <span className="text-primary">Neo · Quilicura</span>
          </figcaption>
        </figure>
      </div>

      <section aria-labelledby="neo-details" className="mt-12 grid gap-7 border-t border-border pt-8 sm:mt-16 sm:gap-10 sm:pt-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <h2 id="neo-details" className="max-w-sm text-2xl font-bold leading-tight tracking-[-0.03em] text-foreground sm:text-3xl [text-wrap:balance]">
          Tu estilo, cuidado<br className="hidden sm:block" /> en cada detalle.
        </h2>
        <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          <p>Te escuchamos, conversamos sobre tu estilo y cuidamos la precisión del corte. Queremos que disfrutes el proceso tanto como el resultado.</p>
          <p>Compartimos una forma de entender la barbería: hacer las cosas bien, atenderte con cercanía y darte una experiencia que quieras repetir.</p>
          <dl className="grid gap-6 border-t border-border pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-muted">Te esperamos</dt>
              <dd className="mt-2 text-base font-medium text-foreground">Lunes a domingo<span className="mt-1 block text-muted">11:00–20:30</span></dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Trabajamos con</dt>
              <dd className="mt-2 text-base font-medium text-foreground">SirFausto / Nishman</dd>
            </div>
          </dl>
          <Link href="/#contacto" className="inline-flex min-h-11 items-center gap-3 text-base font-medium !text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:!text-foreground">
            Cómo llegar a Neo <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </article>
  );
}
