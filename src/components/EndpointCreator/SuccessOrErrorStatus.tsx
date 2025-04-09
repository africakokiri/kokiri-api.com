"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const SuccessOrErrorStatus = ({
  status
}: {
  status: "Success" | "Error";
}) => {
  return (
    <div>
      <Label htmlFor={`${status} Status`}>{`${status} Status`}</Label>
      <Input
        defaultValue={status === "Success" ? "200" : "400"}
        id={`${status} Status`}
      />
    </div>
  );
};
