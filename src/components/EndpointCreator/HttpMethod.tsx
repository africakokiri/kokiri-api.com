"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";
import { useHttpStore } from "@/libs/zustand/store";

import { useEffect, useState } from "react";

export const HTTP_METHODS = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH"
] as const;

export type HttpMethods = (typeof HTTP_METHODS)[number];

export const HttpMethod = () => {
  const [method, setMethod] = useState("GET");

  const { setHttpMethod } = useHttpStore();

  useEffect(() => {
    setHttpMethod(method as HttpMethods);

    // eslint-disable-next-line
  }, [method]);

  return (
    <div>
      <Label htmlFor="http-method">HTTP Method</Label>
      <Select
        value={method}
        onValueChange={setMethod}
      >
        <SelectTrigger id="http-method">
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
