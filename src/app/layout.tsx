import "@/styles/globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Kokiri API",
  description:
    "성공 및 오류 응답을 자유롭게 설정할 수 있는 모의 REST API 서버를 생성합니다. Create a customizable mock REST API server with support for success and error responses.",
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
  openGraph: {
    title: "Kokiri API",
    description: "Create a mock REST API. Customize response data for success and error cases.",
    url: "https://www.kokiri-api.com",
    siteName: "kokiri-api.com",
    images: [
      {
        url: "/icons/kokiri.svg",
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
