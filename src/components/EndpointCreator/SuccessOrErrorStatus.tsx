"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSuccessOrErrorStore } from "@/libs/zustand/store";

export const SuccessOrErrorStatus = ({
  status
}: {
  status: "Success" | "Error";
}) => {
  const { successStatus, setSuccessStatus, errorStatus, setErrorStatus } =
    useSuccessOrErrorStore();

  return (
    <div>
      <Label htmlFor={`${status} Status`}>{`${status} Status`}</Label>
      <Input
        defaultValue={status === "Success" ? successStatus : errorStatus}
        onChange={(e) =>
          status === "Success"
            ? setSuccessStatus(e.target.value)
            : setErrorStatus(e.target.value)
        }
        id={`${status} Status`}
      />
    </div>
  );
};
