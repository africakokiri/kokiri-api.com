"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";

import { useState } from "react";

const HTTP_METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"];

export const HttpMethod = () => {
  const [method, setMethod] = useState("GET");

  return (
    <div className="space-y-2">
      <Label htmlFor="http-method">HTTP Method</Label>
      <Select
        value={method}
        onValueChange={setMethod}
      >
        <SelectTrigger
          id="http-method"
          className="w-[250px]"
        >
          <SelectValue placeholder="Select Method" />
        </SelectTrigger>
        <SelectContent>
          {HTTP_METHODS.map((m) => {
            return (
              <SelectItem
                key={m}
                value={m}
              >
                {m}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
