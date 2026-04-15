import { IBM_Plex_Mono } from "next/font/google";
import Image from "next/image";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "300"
});

export function Header() {
  return (
    <div className={ibmPlexMono.className}>
      <div className="flex items-center gap-2">
        <h1 className="text-3xl">Kokiri API</h1>
        <Image
          src="/icons/main.png"
          alt="Kokiri image"
          width={48}
          height={48}
        />
      </div>
      <p>Create a mock REST API. Customize response data for success and error cases.</p>
    </div>
  );
}
