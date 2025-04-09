"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useResponseTypeStore } from "@/libs/zustand/store";

export const ResponseType = () => {
  const { responseType, setResponseType } = useResponseTypeStore();

  return (
    <div className="space-y-2">
      <Label htmlFor="response-type">Resopnse Type</Label>
      <Select
        value={responseType}
        onValueChange={setResponseType}
      >
        <SelectTrigger id="response-type">
          <SelectValue placeholder="Select response type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Object">Object</SelectItem>
          <SelectItem value="Array">Array</SelectItem>
          <SelectItem value="Primitive">Primitive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
