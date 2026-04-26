import type { Metadata } from "next";
import ClarityInit from "@/components/ClarityInit";
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&family=Syncopate:wght@400;700&family=Big+Shoulders+Stencil+Display:wght@100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <title>Neo Barbería | La Barbería que está revolucionando Quilicura</title>
        {/* Favicon: logo de la barbería */}
        <link rel="icon" href="/neobarberia_2026-01-28_09_23/1_t2y8pa.png" type="image/png" />
        {/* Color del navegador / barra en móviles */}
        <meta name="theme-color" content="#E6B464" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="google-site-verification" content="TJ5NYEWtmO0ApBSKCZQfeKMDV6aiMuW_pEuoIry_O9c" />
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NJM2FH42');` }} />
        {/* End Google Tag Manager */}
      </head>
      <body style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif" }}>
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NJM2FH42" height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
        {/* End Google Tag Manager (noscript) */}
        <ClarityInit />
        {children}
      </body>
    </html>
  );
}
