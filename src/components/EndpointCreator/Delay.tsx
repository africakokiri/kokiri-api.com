"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDelayStore } from "@/libs/zustand/store";

import { X } from "lucide-react";
import { useRef } from "react";

export const Delay = ({ status }: { status: "Success" | "Error" }) => {
  const inputRef = useRef(null);

  const { successDelay, setSuccessDelay, errorDelay, setErrorDelay } =
    useDelayStore();

  return (
    <div>
      <Label
        htmlFor={status === "Success" ? "success-delay" : "error-delay"}
      >
        {status === "Success" ? "Success Delay(ms)" : "Error Delay(ms)"}
      </Label>
      <div className="relative flex items-center">
        <Input
          id={status === "Success" ? "success-delay" : "error-delay"}
          ref={inputRef}
          placeholder="0"
          value={status === "Success" ? successDelay : errorDelay}
          onChange={(e) =>
            status === "Success"
              ? setSuccessDelay(e.target.value.trim())
              : setErrorDelay(e.target.value.trim())
          }
          className="max672:text-base text-sm"
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2
text-gray-500 hover:text-gray-900 dark:text-gray-400
dark:hover:text-gray-100"
          onClick={() => {
            if (status === "Success") {
              setSuccessDelay("");
            } else {
              setErrorDelay("");
            }

            if (inputRef.current) {
              (inputRef.current as HTMLInputElement).focus();
            }
          }}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear</span>
        </Button>
      </div>
    </div>
  );
};
