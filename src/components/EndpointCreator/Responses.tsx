"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/libs/shadcn/utils";
import { useResponseStore } from "@/libs/zustand/store";
import { robotoMonoVar } from "@/styles/fonts";

import { AlertCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Responses = ({ status }: { status: "Success" | "Error" }) => {
  const {
    successResponse,
    setSuccessResponse,
    errorResponse,
    setErrorResponse
  } = useResponseStore();

  const response = status === "Success" ? successResponse : errorResponse;
  const setResponse =
    status === "Success" ? setSuccessResponse : setErrorResponse;

  const [validationStates, setValidationStates] = useState({
    Success: true,
    Error: true
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const validateJsonInput = (value: string) => {
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const isValid = validateJsonInput(response);
    setValidationStates((prev) => ({
      ...prev,
      [status]: isValid
    }));
  }, [response, status]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();

      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const tab = "  "; // 2칸 공백 (필요시 "\t"로 교체 가능)

      const newValue =
        response.substring(0, start) + tab + response.substring(end);
      setResponse(newValue);

      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd =
          start + tab.length;
      });
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={status}>{`${status} Response (JSON)`}</Label>
        <div
          className="flex h-5 items-center gap-2 text-sm text-destructive"
        >
          {!validationStates[status] ? (
            <>
              <AlertCircle className="h-4 w-4" />
              <span>Invalid JSON format</span>
            </>
          ) : (
            <span className="invisible">Invalid JSON format</span>
          )}
        </div>
      </div>

      <Textarea
        ref={textareaRef}
        id={status}
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        onKeyDown={handleKeyDown}
        className={cn(
          `${robotoMonoVar.className} h-40 !text-xs`,
          !validationStates[status] && "border-red-500 !ring-red-500"
        )}
      />
    </div>
  );
};
