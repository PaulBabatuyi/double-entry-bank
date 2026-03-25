import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Toast } from "@/components/Toast";

export const metadata: Metadata = {
  title: "Double-Entry Bank Ledger",
  description: "Production-grade double-entry bookkeeping system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
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
