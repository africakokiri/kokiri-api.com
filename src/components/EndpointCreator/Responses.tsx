"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/libs/shadcn/utils";
import { useResponseStore } from "@/libs/zustand/store";
import { robotoMonoVar } from "@/styles/fonts";

import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

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

  return (
    <div>
      <Label>{`${status} Response (JSON)`}</Label>
      <Textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        className={cn(
          `${robotoMonoVar.className} h-40 !text-xs`,
          !validationStates[status] && "border-red-500"
        )}
      />
      {!validationStates[status] && (
        <Alert
          variant="destructive"
          className="mt-2 flex items-center"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Invalid JSON format</AlertDescription>
        </Alert>
      )}
    </div>
  );
};
