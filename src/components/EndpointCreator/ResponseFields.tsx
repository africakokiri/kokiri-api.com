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
import { Textarea } from "@/components/ui/textarea";

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
  const [fieldName, setFieldName] = useState(""); // 필드 이름
  const [fieldType, setFieldType] = useState("string"); // 필드 타입
  const [customResponse, setCustomResponse] = useState(false); // Custom response 활성화 여부
  const [successStatus, setSuccessStatus] = useState("200"); // 성공 Status code
  const [errorStatus, setErrorStatus] = useState("400"); // 에러 Status code
  const [successResponse, setSuccessResponse] = useState(
    '{\n  "success": true,\n  "data": {}\n}'
  ); // 성공 Response
  const [errorResponse, setErrorResponse] = useState(
    '{\n  "error": "An error occurred"\n}'
  ); // 에러 Response

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

      {customResponse ? (
        <div className="space-y-4">
          <div className="flex gap-4 *:w-full">
            {/* 성공 Status code */}
            <div>
              <Label htmlFor="success-status">Success Status</Label>
              <Input
                id="success-status"
                value={successStatus}
                onChange={(e) => setSuccessStatus(e.target.value)}
              />
            </div>

            {/* 에러 Status code */}
            <div>
              <Label htmlFor="error-status">Error Status</Label>
              <Input
                id="error-status"
                value={errorStatus}
                onChange={(e) => setErrorStatus(e.target.value)}
              />
            </div>
          </div>

          {/* 성공 Response */}
          <div>
            <Label htmlFor="success-resopnse">Success Response</Label>
            <Textarea
              defaultValue={successResponse}
              onChange={(e) => setSuccessResponse(e.target.value)}
              className="h-32"
            />
          </div>

          {/* 실패 Response */}
          <div>
            <Label htmlFor="error-resopnse">Error Response</Label>
            <Textarea
              defaultValue={errorResponse}
              onChange={(e) => setErrorResponse(e.target.value)}
              className="h-32"
            />
          </div>
        </div>
      ) : (
        <div className="flex space-x-4">
          <Input
            id="responsive-field"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
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
      )}
    </div>
  );
};
