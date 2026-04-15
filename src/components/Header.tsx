import { cn } from "@/libs/tailwind/utils";

import { IBM_Plex_Mono } from "next/font/google";
import Image from "next/image";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "300"
});

export function Header() {
  return (
    <div className={cn("flex items-center gap-2", ibmPlexMono.className)}>
      <h1 className="text-3xl">Kokiri API</h1>
      <Image
        src="/icons/main.png"
        alt="Kokiri image"
        width={48}
        height={48}
      />
    </div>
  );
}
