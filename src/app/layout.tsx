import type { Metadata } from "next";
import "./globals.css";
import { WishlistProvider } from "@/context/WishlistContext";

export const metadata: Metadata = {
  title: "OptiMarket Canada | Premium Optometry Equipment Marketplace",
  description: "Canada's trusted marketplace for buying and selling premium optometry and eye care equipment. Verified sellers, quality equipment, competitive prices.",
  keywords: "optometry equipment, eye care equipment, phoropter, autorefractor, tonometer, Canada, medical equipment marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ "--font-sans": "Inter, system-ui, -apple-system, sans-serif", "--font-heading": "Playfair Display, Georgia, serif" } as React.CSSProperties}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </body>
    </html>
  );
}
