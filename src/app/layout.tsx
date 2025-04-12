import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Kokiri API",
  description:
    "Create a mock REST API. Customize response data for success and error cases.",
  keywords: [
    "Next.js",
    "Kokiri API",
    "Kokiri",
    "API",
    "REST API",
    "Mock server",
    "Mock rest api server",
    "Customize REST API",
    "Customize response API data"
  ],
  openGraph: {
    title: "Kokiri API",
    description:
      "Create a mock REST API. Customize response data for success and error cases.",
    url: "https://www.kokiri-api.com",
    siteName: "kokiri-api.com",
    images: [
      {
        url: "/icons/kokiri.svg",
        width: 1200,
        height: 630
      }
    ],
    locale: "en_US",
    type: "website"
  },
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
      <Head>
        <link
          rel="canonical"
          href="https://www.kokiri-api.com/"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": ["WebAPI", "SoftwareApplication"],
              name: "Kokiri API",
              description:
                "Create a mock REST API. Customize response data for success and error cases.",
              applicationCategory: "DeveloperApplication",
              url: "https://www.kokiri-api.com",
              image: "/icons/kokiri.svg",
              sku: "mock-api"
            })
          }}
        />
      </Head>

      <body className="antialiased">
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
