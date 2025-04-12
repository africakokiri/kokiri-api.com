"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSuccessOrErrorStore } from "@/libs/zustand/store";

import { X } from "lucide-react";
import { useRef } from "react";

export const SuccessOrErrorStatus = ({
  status
}: {
  status: "Success" | "Error";
}) => {
  const inputRef = useRef(null);

  const { successStatus, setSuccessStatus, errorStatus, setErrorStatus } =
    useSuccessOrErrorStore();

  return (
    <div>
      <Label htmlFor={`${status} Status`}>{`${status} Status`}</Label>
      <div className="relative flex items-center">
        <Input
          ref={inputRef}
          placeholder={status === "Success" ? "200" : "400"}
          onChange={(e) =>
            status === "Success"
              ? setSuccessStatus(e.target.value.trim())
              : setErrorStatus(e.target.value.trim())
          }
          id={`${status} Status`}
          value={status === "Success" ? successStatus : errorStatus}
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
              setSuccessStatus("");
            } else {
              setErrorStatus("");
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
