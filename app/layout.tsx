import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neo Barbería | La Barbería que está revolucionando Quilicura",
  description: "Bienvenidos a NEOBARBERÍA, donde tu estilo es nuestra prioridad. Los mejores barberos de Quilicura te esperan.",
  keywords: "barbería, Quilicura, corte de pelo, afeitado, fades, barberos profesionales",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
