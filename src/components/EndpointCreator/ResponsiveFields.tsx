"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  useFieldStore,
  useHttpStore,
  useResponseTypeStore,
  useResponsiveFieldStore
} from "@/libs/zustand/store";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

export const FIELD_TYPES = [
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
] as const;

export type FieldType = (typeof FIELD_TYPES)[number];

export const ResponsiveFields = () => {
  // Custom response 활성화 여부
  const [customResponse, setCustomResponse] = useState(false);
  // 성공 Status code
  const [successStatus, setSuccessStatus] = useState("200");
  // 에러 Status code
  const [errorStatus, setErrorStatus] = useState("400");
  // 성공 Response
  const [successResponse, setSuccessResponse] = useState(
    '{\n  "success": true,\n  "data": {}\n}'
  );
  // 에러 Response
  const [errorResponse, setErrorResponse] = useState(
    '{\n  "error": "An error occurred"\n}'
  );

  // 필드 추가
  const { addedFields, addField } = useFieldStore();
  // 필드 이름, 필드 타입
  const { fieldName, fieldType, setFieldName, setFieldType } =
    useResponsiveFieldStore();
  // Endpoint path, HTTP Method
  const { endpointPath, httpMethod } = useHttpStore();
  // Response type
  const { responseType } = useResponseTypeStore();

  useEffect(() => {
    console.log(addedFields);
  }, [addedFields]);

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
          <Button
            type="button"
            size="icon"
            onClick={() =>
              addField({
                endpointPath,
                httpMethod,
                responseType,
                fieldName,
                fieldType
              })
            }
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}

      {addedFields && addedFields.length > 0 && (
        <Card>
          <CardContent className="p-6">
            {addedFields.map(
              (
                {
                  endpointPath,
                  httpMethod,
                  responseType,
                  fieldName,
                  fieldType
                },
                index
              ) => {
                return (
                  <div
                    key={endpointPath + fieldName}
                    className="flex items-center justify-between rounded-md
bg-muted/50 p-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{fieldName}</span>
                      <span className="text-xs text-muted-foreground">
                        {fieldType}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </div>
                );
              }
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
