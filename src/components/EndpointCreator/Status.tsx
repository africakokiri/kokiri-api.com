"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStatusStore } from "@/libs/zustand/store";

import { X } from "lucide-react";
import { useRef } from "react";

export const Status = ({ status }: { status: "Success" | "Error" }) => {
  const inputRef = useRef(null);

  const { status_success, setSuccessStatus, status_error, setErrorStatus } = useStatusStore();

  return (
    <div>
      <Label htmlFor={`${status} Status`}>{`${status} Status`}</Label>
      <div className="relative flex items-center">
        <Input
          ref={inputRef}
          placeholder={status === "Success" ? "200" : "400"}
          onChange={(e) => {
            // 숫자만 허용하는 정규식 패턴 적용
            const numericValue = e.target.value.replace(/[^0-9]/g, "");

            // eslint-disable-next-line
            status === "Success" ? setSuccessStatus(numericValue) : setErrorStatus(numericValue);
          }}
          id={`${status} Status`}
          value={status === "Success" ? status_success : status_error}
          // 키 입력 시 숫자만 허용 (선택적 추가 보안)
          onKeyDown={(e) => {
            // 숫자 키, 백스페이스, 탭, 방향키 등 기능키 허용
            const allowedKeys = ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete", "Home", "End"];
            if (!allowedKeys.includes(e.key) && !/^[0-9]$/.test(e.key)) {
              e.preventDefault();
            }
          }}
          className="text-sm max672:text-base"
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-gray-500 hover:text-gray-900
dark:text-gray-400 dark:hover:text-gray-100"
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
