import { cn } from "@/libs/tailwind/utils";
import { InsertNanoidProvider } from "@/providers/InsertNanoidProvider";
import { TanstackQueryProvider } from "@/providers/TanstackQueryProvider";
import "@/styles/globals.css";
import { Toaster } from "@/ui/sonner";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Kokiri API",
  icons: {
    icon: "/icons/main.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TanstackQueryProvider>
      <html lang="en">
        <InsertNanoidProvider />
        <body className={cn("antialiased", inter.className)}>
          {children}
          <Toaster />
        </body>
      </html>
    </TanstackQueryProvider>
  );
}
