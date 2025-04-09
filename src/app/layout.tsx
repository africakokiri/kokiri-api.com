import "@/styles/globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "REST API Mock Server",
  description: "Mock REST API server for frontend developers",
  icons: {
    icon: "/icons/kokiri.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
