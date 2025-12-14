import type { Metadata } from "next";
import "./globals.css";
import "yet-another-react-lightbox/styles.css";
import "./lightbox.css";
import BookingModalProvider from "../components/BookingModalProvider";

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
        <title>Neo Barbería | La Barbería que está revolucionando Quilicura</title>
        {/* Favicon: logo de la barbería */}
        <link rel="icon" href="https://res.cloudinary.com/dddfx1xwt/image/upload/v1764116007/1_t2y8pa.png" type="image/png" />
        {/* Color del navegador / barra en móviles */}
        <meta name="theme-color" content="#E6B464" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif" }}>
        <BookingModalProvider>
          {children}
        </BookingModalProvider>
      </body>
    </html>
  );
}
