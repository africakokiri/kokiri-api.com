import AppInitializer from "@/components/AppInitializer";
import "@/styles/globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kokiri API",
  description:
    "Create a mock REST API. Customize response data for success and error cases.",
  icons: {
    icon: "/icons/elephant.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppInitializer />
        {children}
      </body>
    </html>
  );
}
