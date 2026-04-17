"use client";

import { cn } from "@/libs/tailwind/utils";
import { addEndpoint } from "@/server/query";
import { Button } from "@/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/ui/field";
import { Input } from "@/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/ui/select";
import { Textarea } from "@/ui/textarea";

import { useEffect, useState } from "react";

export function Define() {
  const [path, setPath] = useState("");
  const [delay, setDelay] = useState("0");
  const [status, setStatus] = useState("200");
  const [method, setMethod] = useState("GET");
  const [response, setResponse] = useState(`{
  "ok": true,
  "status": 200,
  "message": "Users fetched successfully",
  "data": [
    {
      "id": "usr_1",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2026-04-15T12:00:00Z"
    },
    {
      "id": "usr_2",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "createdAt": "2026-04-14T09:30:00Z"
    }
  ]
}`);
  const [invalidResponse, setInvalidResponse] = useState(false);
  const [id, setId] = useState("");

  const invalidPath = path.includes(" ") || path.length > 50;
  const validPathRegex = /^[a-z0-9\-\/]*$/;
  const validPath = validPathRegex.test(path);

  useEffect(() => {
    const id = localStorage.getItem("id");

    if (!id) return;

    setId(id);
  }, []);

  return (
    <form
      action={addEndpoint}
      onSubmit={() => {
        setPath("");
        setDelay("0");
        setStatus("200");
        setMethod("GET");
      }}
    >
      <FieldSet>
        <FieldGroup>
          <input
            name="nanoid"
            type="hidden"
            value={id}
          />
          {/* Endpoint path */}
          <FieldContainer
            className="w-full"
            htmlFor="endpoint-path"
            label="Endpoint path"
          >
            <Input
              id="endpoint-path"
              name="endpoint-path"
              aria-invalid={invalidPath || !validPath}
              autoComplete="true"
              placeholder="e.g. test-api"
              value={path}
              autoFocus
              onChange={(e) => setPath(e.target.value)}
            />
            {invalidPath ||
              (!validPath && (
                <FieldError className="pl-1">
                  Use lowercase letters, numbers, "-" and "/" only.
                </FieldError>
              ))}
          </FieldContainer>

          <div className="flex gap-8">
            {/* Delay */}
            <FieldContainer
              label="Delay(ms)"
              htmlFor="delay"
            >
              <Input
                id="delay"
                name="delay"
                placeholder="0"
                value={delay}
                onChange={(e) => {
                  const numbersOnly = e.target.value.replace(/[^0-9]/g, "");
                  const sliced = numbersOnly.slice(0, 5);

                  setDelay(sliced);
                }}
              />
            </FieldContainer>

            {/* HTTP Status code */}
            <FieldContainer
              label="HTTP status code"
              htmlFor="http-status-code"
            >
              <Input
                id="http-status-code"
                name="http-status-code"
                placeholder="200"
                value={status}
                onChange={(e) => {
                  const numbersOnly = e.target.value.replace(/[^0-9]/g, "");
                  const sliced = numbersOnly.slice(0, 3);

                  setStatus(sliced);
                }}
              />
            </FieldContainer>

            {/* HTTP methods */}
            <FieldContainer
              label="HTTP methods"
              htmlFor="http-methods"
            >
              <input
                name="http-methods"
                type="hidden"
                value={method}
              />
              <Select
                value={method}
                onValueChange={setMethod}
              >
                <SelectTrigger
                  name="http-methods"
                  id="http-methods"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectGroup>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="PATCH">PATCH</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                    <SelectItem value="OPTIONS">OPTIONS</SelectItem>
                    <SelectItem value="HEAD">HEAD</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FieldContainer>
          </div>

          <FieldContainer
            label="Response"
            htmlFor="response"
          >
            <Textarea
              id="response"
              name="response"
              className="max-h-[398px]"
              aria-invalid={invalidResponse}
              value={response}
              onChange={(e) => {
                setResponse(e.target.value);

                try {
                  JSON.parse(e.target.value);

                  setInvalidResponse(false);
                } catch (_) {
                  setInvalidResponse(true);
                }
              }}
            />
            {invalidResponse && <FieldError>Invalid JSON.</FieldError>}
          </FieldContainer>
        </FieldGroup>

        <Button disabled={path.length === 0 || invalidResponse}>Add endpoint</Button>
      </FieldSet>
    </form>
  );
}

type FiledContainerProps = {
  children: React.ReactNode;
  className?: string;
  label: string;
  htmlFor: string;
};

function FieldContainer({ children, className, label, htmlFor }: FiledContainerProps) {
  return (
    <Field className={cn("gap-1", className)}>
      <FieldLabel
        className="pl-1"
        htmlFor={htmlFor}
      >
        {label}
      </FieldLabel>
      {children}
    </Field>
  );
}
