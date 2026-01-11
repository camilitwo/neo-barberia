import React from 'react';

interface EmbedFrameProps {
  html: string;
  className?: string;
}

// Componente genérico para renderizar HTML embebido (iframes, blockquotes, etc.)
// dentro de un contenedor responsivo y con el mismo look & feel de las tarjetas.
export const EmbedFrame: React.FC<EmbedFrameProps> = ({ html, className }) => {
  return (
    <div
      className={
        'w-full max-w-xl mx-auto overflow-hidden rounded-2xl border border-border bg-surface/80 ' +
        (className ?? '')
      }
    >
      <div
        className="w-full"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default EmbedFrame;
