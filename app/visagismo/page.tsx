"use client";

import React, { useState } from "react";
import Link from "next/link";

interface VisagismoApiResponse {
  success: boolean;
  report: string;
  [key: string]: any;
}

// Componente que muestra el informe como "slides" tipo libro, a ancho completo y responsivo
const VisagismoSlides: React.FC<{ report: string }> = ({ report }) => {
  // Si el informe indica que no hay persona en la imagen, no generamos slides
  if (
    /no tengo una imagen de una persona|necesito una foto para analizar/i.test(
      report,
    )
  ) {
    return (
      <div className="w-full max-w-5xl mx-auto rounded-3xl border border-red-800/60 bg-red-950/60 px-5 py-6 text-sm sm:text-base text-red-100">
        <p className="font-semibold mb-2">No detectamos un rostro en la imagen.</p>
        <p className="mb-3">
          Sube una foto en la que se vea claramente el rostro de una persona para poder generar un análisis de visagismo.
        </p>
        <p className="text-xs text-red-200/80">
          Prueba con una foto de frente, bien iluminada y sin filtros que deformen la cara.
        </p>
      </div>
    );
  }

  const rawSections = report.split(/\n\n+/).filter(Boolean);

  // Cada bloque del texto extenso será una "página" o slide
  const slides = rawSections.map((block, index) => {
    const lines = block.split(/\n/).filter(Boolean);
    const titleLine = lines[0] || "";

    // Caso especial: primer bloque (introducción). Lo mostramos solo como texto de cabecera,
    // sin volver a repetirlo en el contenido.
    if (index === 0) {
      const introText = lines.join(" ").trim();
      return {
        rawTitle: introText,
        title: introText,
        contentLines: [] as string[],
      };
    }

    // Resto de bloques: separar título y cuerpo
    const inlineTitleMatch = titleLine.match(/^(\d+\.\s*)?([^:]+:)(\s+)(.+)$/);

    let derivedTitle = titleLine;
    let firstContentLine: string | null = null;

    if (inlineTitleMatch) {
      // inlineTitleMatch[2] contiene algo como "RECOMENDACIONES PARA EL CORTE DE PELO:"
      // inlineTitleMatch[4] contiene el texto de contenido que sigue al título
      derivedTitle = inlineTitleMatch[2].replace(/\*\*/g, "").trim();
      firstContentLine = inlineTitleMatch[4].trim();
    }

    const restContentLines = lines.slice(1);
    const contentLines = [
      ...(firstContentLine ? [firstContentLine] : []),
      ...restContentLines,
    ].filter(Boolean);

    const cleanTitle = derivedTitle
      .replace(/^[0-9]+\./, "")
      .replace(/\*\*/g, "")
      .trim();

    return {
      rawTitle: titleLine,
      title: cleanTitle || "Detalles",
      contentLines,
    };
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSlide = slides[currentIndex];
  const total = slides.length;

  const goPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev < total - 1 ? prev + 1 : prev));
  };

  const renderContentLine = (line: string, index: number) => {
    // Detecta líneas tipo "* **Estilo 1: Pompadour:** texto..."
    const match = line.match(/^\*\s*\*\*(.+?):\*\*\s*(.*)$/);

    if (match) {
      const styleName = match[1].trim();
      const rest = match[2].trim();

      return (
        <p key={index} className="mb-2">
          <span className="font-semibold text-foreground">{styleName}: </span>
          <span>{rest}</span>
        </p>
      );
    }

    return (
      <p key={index} className="mb-2">
        {line}
      </p>
    );
  };

  return (
    <section className="w-full flex flex-col items-center gap-4">
      <div className="w-full max-w-6xl mx-auto rounded-3xl border border-border bg-surface/90 px-4 py-6 sm:px-10 sm:py-8 shadow-2xl flex flex-col min-h-[340px] sm:min-h-[380px]">
        <header className="flex items-center justify-between gap-3 mb-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-primary">
              Página {currentIndex + 1} de {total}
            </p>
            <h2 className="mt-1 text-lg sm:text-xl font-semibold text-white">
              {currentSlide.title}
            </h2>
          </div>
        </header>

        {/* Contenido del slide, con ancho de lectura cómodo y justificado */}
        <div className="flex-1 flex items-start">
          <div className="w-full sm:w-[92%] md:w-[84%] mx-auto text-sm sm:text-base leading-relaxed text-muted text-justify">
            {currentSlide.contentLines.length > 0 ? (
              currentSlide.contentLines.map(renderContentLine)
            ) : currentIndex === 0 ? (
              // En la primera página no repetimos el texto de introducción en el cuerpo
              null
            ) : (
              <p>{currentSlide.rawTitle}</p>
            )}
          </div>
        </div>

        {/* Navegación tipo libro */}
        <footer className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-muted">
            <div className="flex items-center gap-1">
              <span className="inline-flex h-1.5 w-24 overflow-hidden rounded-full bg-slate-800">
                <span
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
                />
              </span>
              <span>
                Progreso {Math.round(((currentIndex + 1) / total) * 100)}%
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 text-sm">
            <button
              type="button"
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-1 rounded-full border border-border/60 px-3 py-1.5 text-xs font-medium text-muted hover:text-primary hover:border-primary transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="text-base">←</span>
              <span>Anterior</span>
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={currentIndex === total - 1}
              className="inline-flex items-center gap-1 rounded-full border border-primary/70 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>Siguiente</span>
              <span className="text-base">→</span>
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
};

const VisagismoPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VisagismoApiResponse | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setError(null);
    setResult(null);

    if (!selectedFile) {
      setFile(null);
      setPreviewUrl(null);
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setError("Por favor selecciona un archivo de imagen válido (JPG, PNG, etc.).");
      setFile(null);
      setPreviewUrl(null);
      return;
    }

    const maxSizeMB = 8;
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      setError(`La imagen es muy pesada. Tamaño máximo: ${maxSizeMB} MB.`);
      setFile(null);
      setPreviewUrl(null);
      return;
    }

    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Primero selecciona una foto para analizar.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("https://www.visagismoclub.com/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("No se pudo obtener el análisis. Intenta nuevamente.");
      }

      const data: VisagismoApiResponse = await response.json();

      if (!data || typeof data.report !== "string") {
        throw new Error("La respuesta del servicio no es válida.");
      }

      setResult(data);
    } catch (err: any) {
      console.error("Error analizando visagismo", err);
      setError(
        err?.message ||
          "Ocurrió un error al analizar tu imagen. Por favor, inténtalo nuevamente en unos minutos."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreviewUrl(null);
    setError(null);
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-16 px-4">
      <section className="max-w-6xl mx-auto">
        {/* Cabecera descriptiva */}
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.32em] uppercase text-primary">
              Análisis de visagismo
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-white">
              Descubre el look que realmente va contigo
            </h1>
            <p className="mt-3 text-sm sm:text-base text-muted max-w-xl">
              Sube una foto de tu rostro y obtén un informe claro y accionable con recomendaciones de cortes y estilos de barba pensados para tus facciones.
            </p>

            {/* Acción para volver al inicio */}
            <div className="mt-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface/70 px-3 py-1.5 text-[11px] font-medium text-muted hover:text-primary hover:border-primary transition"
              >
                <span className="text-xs">←</span>
                <span>Volver al inicio</span>
              </Link>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/70 px-3 py-1.5 text-[11px] text-muted">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Herramienta experimental de análisis facial</span>
          </div>
        </header>

        {/* Layout principal: columna de controles aún más compacta, slides más amplios */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.8fr)] items-start">
          {/* Columna izquierda: subida de imagen y controles (más pequeña) */}
          <div className="space-y-4 max-w-xs mx-auto w-full">
            <div
              className={`relative border border-dashed border-slate-700 rounded-3xl p-4 sm:p-4 bg-surface flex flex-col items-center justify-center text-center transition-all duration-300 ${
                result ? 'scale-90 opacity-80' : 'scale-100 opacity-100'
              }`}
            >
              {previewUrl ? (
                <div className="relative w-full max-w-xs aspect-[3/4] overflow-hidden rounded-2xl border border-border shadow-lg mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="Previsualización de la foto seleccionada"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleReset}
                    className="absolute top-3 right-3 rounded-full bg-slate-950/80 border border-slate-700 px-2 py-1 text-[11px] text-slate-200 hover:bg-slate-900 transition"
                  >
                    Cambiar foto
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 mb-3">
                    <span className="text-emerald-400 text-2xl">📸</span>
                  </div>
                  <p className="text-sm sm:text-base font-medium text-white">
                    Sube una foto de tu rostro
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-slate-400 max-w-xs">
                    De frente, con buena iluminación y sin filtros fuertes. Así el análisis será más preciso.
                  </p>
                </>
              )}

              <label className="mt-4 inline-flex items-center justify-center rounded-full bg-slate-100 text-slate-900 text-xs sm:text-sm font-medium px-4 py-2 cursor-pointer hover:bg-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={loading}
                />
                Elegir foto
              </label>

              <p className="mt-2 text-[11px] text-slate-500">
                Formatos: JPG, PNG. Tamaño máximo recomendado: 8MB.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!file || loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="inline-flex h-4 w-4 rounded-full border-2 border-emerald-100 border-t-transparent animate-spin" />
                  Analizando tu imagen...
                </>
              ) : (
                <>Obtener análisis personalizado</>
              )}
            </button>

            {error && (
              <div className="rounded-2xl border border-red-800/60 bg-red-950/60 px-4 py-3 text-xs sm:text-sm text-red-100">
                {error}
              </div>
            )}

            {loading && !error && (
              <div className="mt-2 flex flex-col gap-2">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-1/2 origin-left animate-[loading-bar_1.2s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500" />
                </div>
                <p className="text-[11px] text-slate-400">
                  Estamos leyendo tus rasgos faciales para recomendarte cortes y estilos que realmente te favorecen.
                </p>
              </div>
            )}
          </div>

          {/* Columna derecha: slides tipo libro con más espacio */}
          <div className="w-full flex flex-col">
            {!result && !loading && !error && (
              <div className="w-full max-w-5xl mx-auto rounded-3xl border border-border bg-surface/60 px-5 py-6 text-sm sm:text-base text-slate-400">
                <p>
                  Una vez que subas tu foto y generes el análisis, te mostraremos el resultado en varias páginas que podrás ir pasando como si leyeras un libro.
                </p>
                <p className="mt-3">
                  Así podrás leer con calma cada parte del informe: desde la forma de tu rostro, hasta los cortes y estilos de barba que mejor te quedan.
                </p>
              </div>
            )}

            {result && !loading && (
              <VisagismoSlides report={result.report} />
            )}

            {loading && !error && (
              <div className="w-full max-w-5xl mx-auto rounded-3xl border border-border bg-surface/70 px-5 py-6 text-sm text-slate-300 mt-2">
                <p className="font-medium mb-2">Analizando tu rostro en tiempo real...</p>
                <p className="text-xs text-slate-400">
                  En unos segundos tendrás un informe dividido en secciones para que puedas leerlo cómodo, slide por slide.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 999px;
        }
      `}</style>
    </main>
  );
};

export default VisagismoPage;
