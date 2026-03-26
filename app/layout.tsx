import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Toast } from "@/components/Toast";

export const metadata: Metadata = {
  title: "Double-Entry Bank Ledger | Professional Banking System",
  description:
    "Production-grade double-entry bookkeeping system with real-time account management, transfers, deposits, and comprehensive transaction tracking. Secure, responsive, and mobile-friendly financial management.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90' font-family='serif'>💲</text></svg>",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <Providers>
          {children}
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
