"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDelayStore } from "@/libs/zustand/store";

import { X } from "lucide-react";
import { useRef } from "react";

export const Delay = () => {
  const inputRef = useRef(null);

  const { delay, setDelay } = useDelayStore();

  return (
    <div>
      <Label htmlFor="delay">{"Delay(ms)"}</Label>
      <div className="relative flex items-center">
        <Input
          id="delay"
          ref={inputRef}
          placeholder="0"
          value={delay}
          onChange={(e) => setDelay(e.target.value)}
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2
text-gray-500 hover:text-gray-900 dark:text-gray-400
dark:hover:text-gray-100"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear</span>
        </Button>
      </div>
    </div>
  );
};
