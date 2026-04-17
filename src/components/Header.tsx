"use client";

import { Button } from "@/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/ui/dialog";

import { SignIn } from "@clerk/nextjs";
import { IBM_Plex_Mono } from "next/font/google";
import Image from "next/image";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "300"
});

export function Header() {
  return (
    <div className="flex items-center justify-between">
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
        <p>Sign in to save APIs and use team features.</p>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Sign in</Button>
        </DialogTrigger>
        <DialogContent className="h-fit w-fit p-0">
          <DialogHeader>
            <DialogTitle className="sr-only">Sign in</DialogTitle>
            <SignIn />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
