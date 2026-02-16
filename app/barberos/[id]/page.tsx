import { notFound } from 'next/navigation';
import Link from 'next/link';

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
  const [firstName, ...lastParts] = barber.nombre.split(' ');
  const lastName = lastParts.join(' ');

  return (
    <div className="concrete-texture font-mono text-gray-300 antialiased overflow-x-hidden min-h-screen">
      {/* Header */}
      <header className="pt-6 pb-4 px-4 sm:px-6 lg:px-10 flex items-center justify-between fixed top-0 w-full z-[60]">
        <Link
          href="/#equipo"
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border-2 border-gray-300/20 bg-[#1a1a1a]/80 backdrop-blur-sm text-gray-300 hover:text-white transition-colors"
        >
          <span className="material-icons text-lg sm:text-xl">arrow_back</span>
        </Link>
        <Link
          href="/"
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border-2 border-gray-300/20 bg-[#1a1a1a]/80 backdrop-blur-sm text-gray-300 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-lg sm:text-xl">menu</span>
        </Link>
      </header>

      {/* Main */}
      <main className="relative z-10 pt-24 sm:pt-28 pb-36 sm:pb-40 max-w-5xl mx-auto">
        {/* Hero Section */}
        <section className="flex flex-col px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6 lg:gap-10">
            {/* Years of experience — inline on mobile, column on sm+ */}
            <div className="flex sm:flex-none items-center sm:items-start gap-3 sm:gap-0 mb-6 sm:mb-0">
              <div className="flex flex-row sm:flex-col items-center gap-2 sm:gap-0">
                <span className="text-6xl sm:text-[8rem] font-stencil leading-none text-white block sm:-rotate-90 sm:origin-center sm:translate-y-24">
                  {String(barber.yearsExperience).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.3em] sm:tracking-[0.5em] uppercase text-gray-600 sm:vertical-text sm:mt-32">
                  EXPERIENCE_YEARS
                </span>
              </div>
            </div>

            {/* Name & Interests */}
            <div className="flex-grow pt-0 sm:pt-4">
              <h2 className="text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-3 sm:mb-4 bg-white/5 inline-block px-2 py-1">
                Personnel // {String(barberIndex + 1).padStart(2, '0')}
              </h2>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter leading-none mb-8 sm:mb-10 text-white">
                {firstName.toUpperCase()}
                <br />
                {lastName.toUpperCase()}
              </h1>

              <div className="space-y-8">
                <div>
                  <p className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 sm:mb-6 border-l-2 border-white pl-3">
                    TECHNICAL_INTERESTS
                  </p>
                  <ul className="space-y-3 sm:space-y-4">
                    {barber.interests.map((interest) => (
                      <li
                        key={interest}
                        className="text-base sm:text-lg md:text-xl font-bold uppercase tracking-tight flex items-center gap-2 sm:gap-3"
                      >
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white flex-none" />
                        {interest}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Signature Cuts Gallery */}
        <section className="mt-20 sm:mt-32 px-4 sm:px-6 lg:px-10">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-[9px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-[0.5em] mb-2">
              OUTPUT_ARCHIVE
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tighter text-white">
              SIGNATURE_CUTS
            </h3>
          </div>

          {/* Stacked on mobile, grid on lg+ */}
          <div className="relative space-y-[-30px] sm:space-y-[-40px] lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6">
            {barber.signatureCuts.map((cut, i) => {
              const isEven = i % 2 === 1;
              const zIndex = (i + 1) * 10;

              return (
                <div
                  key={cut.label}
                  className={`
                    relative
                    ${i === 0 ? 'w-[85%] sm:w-[80%]' : ''}
                    ${i === 1 ? 'w-[80%] sm:w-[75%] ml-auto translate-y-4 sm:translate-y-8' : ''}
                    ${i === 2 ? 'w-[90%] sm:w-[85%] translate-y-8 sm:translate-y-16' : ''}
                    lg:w-full lg:ml-0 lg:translate-y-0
                  `}
                  style={{ zIndex }}
                >
                  <div
                    className={`brutalist-border p-1 bg-black ${
                      isEven
                        ? 'shadow-[-6px_6px_0px_0px_rgba(255,255,255,0.05)] sm:shadow-[-10px_10px_0px_0px_rgba(255,255,255,0.05)]'
                        : 'shadow-[6px_6px_0px_0px_rgba(255,255,255,0.05)] sm:shadow-[10px_10px_0px_0px_rgba(255,255,255,0.05)]'
                    } lg:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.05)]`}
                  >
                    <CdnImage
                      src={cut.imagen}
                      alt={cut.label}
                      width={800}
                      height={1000}
                      className="w-full aspect-[4/5] lg:aspect-[3/4] object-cover grayscale contrast-150 brightness-90"
                    />
                  </div>
                  <div
                    className={`mt-2 text-[9px] sm:text-[10px] font-bold uppercase bg-white text-black inline-block px-2 sm:px-3 py-1 ${
                      isEven ? 'float-right lg:float-none' : ''
                    }`}
                  >
                    REF_{String(i + 1).padStart(2, '0')}: {cut.label}
                  </div>
                  {isEven && <div className="clear-both lg:hidden" />}
                </div>
              );
            })}
          </div>
        </section>

        {/* Quote Section */}
        <section className="mt-32 sm:mt-48 px-4 sm:px-6 lg:px-10">
          <div className="border-t-4 border-white pt-8 sm:pt-12 pb-8 sm:pb-12">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight uppercase tracking-tight text-white mb-4 sm:mb-6">
              &ldquo;{barber.quote}&rdquo;
            </p>
            <div className="flex items-center gap-2">
              <span className="h-[1px] w-8 sm:w-12 bg-gray-600" />
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.3em] text-gray-500 uppercase">
                {barber.apodo.toUpperCase()} / {barber.role}
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 w-full px-4 sm:px-6 lg:px-10 pb-6 sm:pb-8 pt-8 sm:pt-10 bg-gradient-to-t from-black to-transparent z-[60]">
        <div className="max-w-5xl mx-auto">
          {barber.instagram ? (
            <a
              href={barber.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-14 sm:h-16 bg-white text-black font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm flex items-center justify-between px-6 sm:px-8 shadow-[4px_4px_0px_0px_rgba(100,100,100,1)] sm:shadow-[6px_6px_0px_0px_rgba(100,100,100,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
            >
              <span>VER_INSTAGRAM</span>
              <span className="material-symbols-outlined font-black text-lg sm:text-2xl">arrow_forward</span>
            </a>
          ) : (
            <Link
              href="/#equipo"
              className="w-full h-14 sm:h-16 bg-white text-black font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-xs sm:text-sm flex items-center justify-between px-6 sm:px-8 shadow-[4px_4px_0px_0px_rgba(100,100,100,1)] sm:shadow-[6px_6px_0px_0px_rgba(100,100,100,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
            >
              <span>VOLVER_AL_EQUIPO</span>
              <span className="material-symbols-outlined font-black text-lg sm:text-2xl">arrow_forward</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
