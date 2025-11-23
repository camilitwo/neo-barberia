import { BarberCarousel } from '@/components/BarberCarousel';

const principles = [
  'Elasticidad',
  'Anticipación',
  'Escena',
  'Acción',
  'Continuidad',
  'Suavidad',
  'Arcos',
  'Contexto',
  'Tiempo',
  'Exageración',
  'Volumen',
  'Atractivo',
];

const barbers = [
  {
    name: 'Luca Navarro',
    role: 'Director creativo',
    description:
      'Pulso seguro, líneas limpias y una mirada cinematográfica que anticipa el siguiente movimiento del cliente.',
    specialties: ['Fade líquido', 'Peinados editoriales', 'Cejas impecables'],
    principle: 'Anticipación y escena',
  },
  {
    name: 'María Rivera',
    role: 'Maestra en texturas',
    description:
      'Domina el volumen con capas suaves, curvas naturales y un ritmo que hace sentir cada corte como una coreografía.',
    specialties: ['Texturizado a tijera', 'Rizos definidos', 'Barbas con arcos'],
    principle: 'Suavidad y arcos',
  },
  {
    name: 'Elias Duarte',
    role: 'Especialista en barba',
    description:
      'Armoniza barba y cabello con continuidad perfecta, transiciones que fluyen y detalles que potencian el atractivo.',
    specialties: ['Perfilado premium', 'Afeitado clásico', 'Cuidado de piel'],
    principle: 'Continuidad y atractivo',
  },
  {
    name: 'Zoe Álvarez',
    role: 'Colorista y visagista',
    description:
      'Aplica color con elasticidad controlada, exaltando los rasgos del rostro y cuidando el contexto de cada estilo.',
    specialties: ['Color de autor', 'Visagismo', 'Brillos estratégicos'],
    principle: 'Elasticidad y contexto',
  },
];

export default function Home() {
  return (
    <>
      <a className="floating-cta" href="https://calendly.com/neo-barberia/agendar" target="_blank" rel="noreferrer">
        Agendar turno →
      </a>
      <main>
        <section className="section-shell hero" id="hero">
          <div>
            <div className="hero__badge">Barbería &amp; experiencia escénica</div>
            <h1 className="hero__title">
              Elegancia en movimiento, cortes con <span className="hero__highlight">alma cinematográfica</span>.
            </h1>
            <p>
              Inspiramos cada servicio en los 12 principios de animación: elasticidad, anticipación y continuidad
              para que todo fluya sin esfuerzo. Cada trazo vibra con suavidad, arcos naturales y un timing que
              mantiene la escena en tu rostro.
            </p>
            <div className="hero__actions">
              <a className="button" href="#quienes-somos">
                Conocer la casa
              </a>
              <a className="button secondary" href="#contacto">
                Contacto directo
              </a>
            </div>
          </div>
          <div className="section-shell" style={{ margin: 0 }}>
            <div className="section-heading">
              <span /> Principios en práctica
            </div>
            <p className="subtext">Cada visita coreografía tiempo, volumen y contexto para un resultado memorable.</p>
            <div className="timeline">
              {principles.map((item) => (
                <span key={item} className="pill">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell" id="quienes-somos">
          <div className="section-heading">
            <span /> ¿Quiénes somos?
          </div>
          <p className="subtext">
            Neo Barbería es un atelier de estilo que mezcla precisión técnica con narrativa visual. Cuidamos la
            continuidad entre cabello, barba y actitud para que salgas con un look que cuenta tu historia.
          </p>
          <div className="grid">
            <div className="card">
              <div className="pill">Escena principal</div>
              <div>
                <strong>Consultoría guiada</strong>
                <p>
                  Preparamos cada corte con anticipación: entendemos tu ritmo diario, tu rol y el clima para que
                  cada acción esté calculada cuadro a cuadro.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="pill">Elasticidad y suavidad</div>
              <div>
                <strong>Técnicas que fluyen</strong>
                <p>
                  Aplicamos tijera y máquina con arcos controlados, dejando que el volumen respire y la transición
                  sea continua, sin golpes ni cortes bruscos.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="pill">Contexto y exageración</div>
              <div>
                <strong>Detalles memorables</strong>
                <p>
                  Potenciamos rasgos clave con destellos de color, texturas y líneas que atraen la mirada sin perder
                  elegancia ni coherencia.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell" id="barberos">
          <div className="section-heading">
            <span /> Barberos en carrusel
          </div>
          <p className="subtext">
            Conoce al equipo que domina el tiempo, la continuidad y los arcos. Cada slide revela una
            especialidad, una dosis de exageración cuidada y la suavidad que define nuestra firma.
          </p>
          <BarberCarousel barbers={barbers} />
        </section>

        <section className="section-shell" id="contacto">
          <div className="section-heading">
            <span /> Contacto
          </div>
          <p className="subtext">
            Agenda con el botón flotante o escribe directo. Estamos listos para preparar la escena de tu próxima
            transformación.
          </p>
          <div className="contact-grid">
            <div className="card">
              <div>
                <p className="ribbon">Atención</p>
                <strong>Horarios elásticos</strong>
                <p>Lunes a sábado · 9:00 a 20:00 · Ajustamos el timing a tu disponibilidad.</p>
              </div>
            </div>
            <div className="card">
              <div>
                <p className="ribbon">Contacto directo</p>
                <strong>+57 320 000 0000</strong>
                <p>WhatsApp y llamadas con respuesta inmediata.</p>
              </div>
            </div>
            <div className="card">
              <div>
                <p className="ribbon">Ubicación</p>
                <strong>Calle 27 #45 · Barrio Prisma</strong>
                <p>Espacio íntimo con música curada y aromas suaves para que la escena sea tuya.</p>
              </div>
            </div>
          </div>
          <p className="footer-note">Neo Barbería · Donde el estilo se mueve contigo.</p>
        </section>
      </main>
    </>
  );
}
