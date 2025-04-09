"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import { useState } from "react";

const FIELD_TYPES = [
  "string",
  "number",
  "boolean",
  "object",
  "any",
  "string[]",
  "number[]",
  "boolean[]",
  "object[]",
  "any[]"
];

export const ResponsiveFields = () => {
  const [fieldType, setFieldType] = useState("string");
  const [customResponse, setCustomResponse] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="responsive-field">Responsive Fields</Label>
        <div className="flex items-center space-x-2">
          <Label htmlFor="custom-response">Custom Resopnse</Label>
          <Switch
            id="custom-response"
            checked={customResponse}
            onCheckedChange={setCustomResponse}
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <Input
          id="responsive-field"
          placeholder="Field name"
          className="w-3/4"
        />
        <Select
          value={fieldType}
          onValueChange={setFieldType}
        >
          <SelectTrigger className="w-1/4">
            <SelectValue placeholder="Select field type" />
          </SelectTrigger>
          <SelectContent>
            {FIELD_TYPES.map((type) => {
              return (
                <SelectItem
                  key={type}
                  value={type}
                >
                  {type}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
