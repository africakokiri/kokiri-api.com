"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/libs/shadcn/utils";
import { useHttpStore } from "@/libs/zustand/store";

import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const EndpointPath = () => {
  const [isPathValid, setIsPathValid] = useState(false);
  const inputRef = useRef(null);

  const { endpoint_path, setEndPointPath } = useHttpStore();

  // Endpoint path가 /api/로 시작하지 않으면 에러를 표시하는 로직
  useEffect(() => {
    const isEmpty = endpoint_path === "";
    const isInvalid = !endpoint_path.startsWith("/api/") || endpoint_path.length < 6;

    setIsPathValid(!isEmpty && isInvalid);
  }, [endpoint_path]);

  return (
    <div>
      <Label htmlFor="endpoint-path">Endpoint Path</Label>
      <div className="relative flex items-center">
        <Input
          ref={inputRef}
          placeholder="/api/data"
          id="endpoint-path"
          className={cn(
            "w-full text-sm max672:text-base",
            isPathValid && "border-[1px] border-red-500 !ring-red-500"
          )}
          value={endpoint_path}
          onKeyDown={(e) => e.key === " " && e.preventDefault()}
          onChange={(e) => setEndPointPath(e.target.value.trim())}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-gray-500 hover:text-gray-900
dark:text-gray-400 dark:hover:text-gray-100"
          onClick={() => {
            setEndPointPath("");

            if (inputRef.current) {
              (inputRef.current as HTMLInputElement).focus();
            }
          }}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear</span>
        </Button>
      </div>

      {isPathValid && <p className="text-xs text-red-500">Path must start with /api/...</p>}
    </div>
  );
};
