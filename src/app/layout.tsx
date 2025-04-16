import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kokiri API - Mock REST API",
  description:
    "Create a customizable mock REST API server with support for success and error responses.",
  keywords: [
    "Next.js",
    "Kokiri API",
    "Kokiri",
    "API",
    "REST API",
    "Mock server",
    "Mock rest api server",
    "Customize REST API",
    "Customize response API data",
    "모의 API",
    "모의 서버",
    "Mock 서버",
    "REST API 서버",
    "응답 데이터 커스터마이징",
    "API 테스트용 서버"
  ],
  metadataBase: new URL("https://www.kokiri-api.com"),
  alternates: {
    canonical: "https://www.kokiri-api.com/"
  },
  openGraph: {
    title: "Kokiri API",
    description: "Create a mock REST API. Customize response data for success and error cases.",
    url: "https://www.kokiri-api.com",
    siteName: "Kokiri API",
    images: [
      {
        url: "https://www.kokiri-api.com/icons/elephant.png",
        width: 1200,
        height: 630
      }
    ],
    locale: "ko_KR",
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
    <html lang="ko">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "SoftwareApplication",
              name: "Kokiri API",
              description:
                "Create a mock REST API. Customize response data for success and error cases.",
              applicationCategory: "DeveloperApplication",
              url: "https://www.kokiri-api.com",
              image: "https://www.kokiri-api.com/icons/elephant.png",
              sku: "mock-api"
            })
          }}
        />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
