"use client";

import React, { useState } from "react";

interface VisagismoAnalyzerProps {
  title?: string;
  description?: string;
  className?: string;
}

interface VisagismoApiResponse {
  success: boolean;
  report: string;
  [key: string]: any;
}

// Nuevo componente separado para mostrar el resultado con un layout más rico
const VisagismoResult: React.FC<{ report: string }> = ({ report }) => {
  const sections = report.split(/\n\n+/).filter(Boolean);

  const [intro, ...rest] = sections;

  const parseSection = (block: string) => {
    const [titleLine, ...contentLines] = block.split(/\n/).filter(Boolean);
    return {
      title: titleLine?.replace(/^\d+\.|\*\s*/g, "").trim(),
      rawTitle: titleLine,
      content: contentLines.join("\n").trim(),
    };
  };

  const parsed = rest.map(parseSection);

  const hairSection = parsed.find((s) =>
    /CORTE DE PELO|CORTES RECOMENDADOS/i.test(s.rawTitle || ""),
  );
  const beardSection = parsed.find((s) =>
    /BARBA|BARBAS RECOMENDADAS/i.test(s.rawTitle || ""),
  );
  const faceSection = parsed.find((s) => /FORMA DE LA CARA/i.test(s.rawTitle || ""));

  const otherSections = parsed.filter(
    (s) => s !== hairSection && s !== beardSection && s !== faceSection,
  );

  return (
    <div className="space-y-6">
      {intro && (
        <div className="rounded-3xl border border-border/60 bg-surface/70 px-4 py-4 sm:px-5 sm:py-5 shadow-lg/40">
          <p className="text-sm text-muted whitespace-pre-line">{intro}</p>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {faceSection && (
          <div className="rounded-3xl border border-primary/30 bg-primary/5 px-4 py-4 sm:px-5 sm:py-5 flex flex-col gap-2">
            <h4 className="text-xs font-semibold tracking-[0.3em] uppercase text-primary">
              {faceSection.rawTitle?.replace(/\d+\.|/g, "").trim() || "Forma de tu rostro"}
            </h4>
            <p className="text-sm text-foreground/90 whitespace-pre-line">
              {faceSection.content}
            </p>
          </div>
        )}

        {hairSection && (
          <div className="rounded-3xl border border-border/60 bg-surface/80 px-4 py-4 sm:px-5 sm:py-5 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm font-semibold text-foreground">
                Cortes de pelo recomendados
              </h4>
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
                Look de cabello
              </span>
            </div>
            <div className="space-y-2 text-sm text-muted whitespace-pre-line">
              {hairSection.content}
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {beardSection && (
          <div className="rounded-3xl border border-border/60 bg-surface/80 px-4 py-4 sm:px-5 sm:py-5 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-sm font-semibold text-foreground">
                Estilos de barba sugeridos
              </h4>
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-400">
                Barba & contornos
              </span>
            </div>
            <div className="space-y-2 text-sm text-muted whitespace-pre-line">
              {beardSection.content}
            </div>
          </div>
        )}

        {otherSections.length > 0 && (
          <div className="rounded-3xl border border-border/60 bg-surface/80 px-4 py-4 sm:px-5 sm:py-5 flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground">Tips extra para tu estilo</h4>
            <div className="space-y-2 text-sm text-muted">
              {otherSections.map((s, i) => (
                <p key={i} className="whitespace-pre-line">
                  {s.rawTitle && (
                    <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-primary mb-1">
                      {s.rawTitle.replace(/\d+\.|/g, "").trim()}
                    </span>
                  )}
                  {s.content}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="rounded-3xl border border-border/40 bg-gradient-to-r from-surface/80 via-surface to-surface/80 px-4 py-4 sm:px-5 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.24em] uppercase text-muted">
            Llévalo a tu próxima cita
          </p>
          <p className="mt-1 text-sm text-muted">
            Muestra este análisis a tu barbero para que juntos aterricen el corte y la barba que más van con tu personalidad.
          </p>
        </div>
        <div className="flex gap-2 text-[11px] text-muted">
          <span className="inline-flex items-center rounded-full border border-border/60 px-3 py-1">
            Ajuste de contornos
          </span>
          <span className="inline-flex items-center rounded-full border border-border/60 px-3 py-1">
            Volumen y proporciones
          </span>
        </div>
      </div>
    </div>
  );
};

const VisagismoAnalyzer: React.FC<VisagismoAnalyzerProps> = ({
  title = "Análisis de Visagismo",
  description = "Sube una foto de tu rostro y recibe un análisis personalizado con recomendaciones de cortes y estilos de barba.",
  className = "",
}) => {
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
    <div
      className={`rounded-3xl border border-border bg-surface/80 p-6 sm:p-8 ${className}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-xl">
            {description}
          </p>
        </div>
        <div className="mt-2 sm:mt-0 flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 border border-slate-800 px-3 py-2 rounded-full">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Potenciado por análisis inteligente de visagismo</span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)] items-start">
        {/* Columna izquierda: subida de imagen y controles */}
        <div className="space-y-4">
          <div className="relative border border-dashed border-slate-700 rounded-2xl p-4 sm:p-5 bg-slate-900/60 flex flex-col items-center justify-center text-center">
            {previewUrl ? (
              <div className="relative w-full max-w-xs aspect-[3/4] overflow-hidden rounded-2xl border border-slate-700 shadow-lg mb-4">
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
                  Idealmente de frente, con buena iluminación y sin filtros exagerados.
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

        {/* Columna derecha: resultado */}
        <div className="rounded-2xl border border-border bg-surface/80 p-4 sm:p-5 min-h-[220px] flex flex-col">
          <h3 className="text-sm font-semibold tracking-[0.18em] text-primary uppercase mb-3">
            Resultado del análisis
          </h3>

          {!result && !loading && !error && (
            <div className="flex-1 flex flex-col items-start justify-center text-sm text-slate-400">
              <p>
                Una vez que subas tu foto y hagas clic en "Obtener análisis personalizado", aquí verás un resumen claro de:
              </p>
              <ul className="mt-3 space-y-1 list-disc list-inside">
                <li>Forma de tu rostro y rasgos destacados.</li>
                <li>Cortes de pelo recomendados para equilibrar tus facciones.</li>
                <li>Estilos de barba que potencian tu estructura facial.</li>
              </ul>
              <p className="mt-3 text-xs text-slate-500">
                Usa este análisis para conversar con tu barbero y elegir el mejor look para ti.
              </p>
            </div>
          )}

          {result && !loading && (
            <div className="flex-1 mt-1 overflow-auto pr-1 custom-scrollbar">
              <VisagismoResult report={result.report} />
            </div>
          )}

          {loading && !error && (
            <div className="flex-1 flex flex-col items-start justify-center gap-3 text-sm text-slate-300">
              <p className="font-medium">Analizando tu rostro en tiempo real...</p>
              <p className="text-xs text-slate-400">
                Este proceso suele tardar solo unos segundos. Estamos detectando forma de rostro, proporciones y puntos clave para ajustar las recomendaciones a ti.
              </p>
            </div>
          )}
        </div>
      </div>

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
    </div>
  );
};

export default VisagismoAnalyzer;
