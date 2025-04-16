import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kokiri API",
    short_name: "Kokiri API",
    description: "성공 및 오류 응답을 자유롭게 설정할 수 있는 모의 REST API 서버",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3367D6",
    icons: [
      {
        src: "/icons/elephant.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icons/elephant.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}
