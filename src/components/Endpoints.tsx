"use client";

import { type Endpoints as EndpointsType } from "@/generated/prisma/client";
import { cn } from "@/libs/tailwind/utils";
import { useDeleteEndpointMutation } from "@/tanstack-query/mutations/useDeleteEndpointMutation";
import { useUpdateEndpointMutation } from "@/tanstack-query/mutations/useUpdateEndpointMutation";
import { fetchEndpointsOptions } from "@/tanstack-query/options/fetchEndpointsOptions";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/ui/dropdown-menu";
import { Input } from "@/ui/input";

import { useQuery } from "@tanstack/react-query";
import { ChevronsUpDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export function Endpoints() {
  const [id, setId] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("id");

    if (!id) return;

    setId(id);
  }, []);

  const { data: endpoints } = useQuery(fetchEndpointsOptions(id));

  return (
    <ul className="space-y-2">
      {endpoints
        ?.sort((a, b) => Number(a.id) - Number(b.id))
        .map((e) => {
          return (
            <EndpointItem
              key={e.id}
              e={e}
            />
          );
        })}
    </ul>
  );
}

function EndpointItem({ e }: { e: EndpointsType }) {
  const [isEditing, setIsEditing] = useState(false);
  const [endpointValue, setEndpointValue] = useState(`kokiri-api.com/api/${e.path}`);

  const inputRef = useRef<HTMLInputElement>(null);

  const updateEndpointMutation = useUpdateEndpointMutation();
  const deleteEndpointMutation = useDeleteEndpointMutation();

  const invalidPath = endpointValue.includes(" ") || endpointValue.length > 50;
  const validPathRegex = /^[A-Za-z0-9\-._~!$&'()*+,;=:@\/]*$/;
  const validPath = validPathRegex.test(endpointValue);

  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  return (
    <li key={e.id}>
      <Collapsible className="space-y-2 rounded-lg border border-neutral-200 bg-neutral-100 p-2">
        <div className="m-0 flex items-center justify-between">
          <div className="flex flex-1 items-center gap-2">
            <Badge
              variant={(() => {
                switch (e.http_method) {
                  case "GET":
                    return "default";
                  case "DELETE":
                    return "destructive";
                  default:
                    return "secondary";
                }
              })()}
              className={cn(e.http_method !== "GET" && e.http_method !== "DELETE" && "bg-neutral-300")}
            >
              {e.http_method} | {e.delay}ms | {e.status_code}
            </Badge>
            {isEditing ? (
              <div className="relative flex flex-1 items-center">
                <Input
                  className="flex-1 bg-white px-2 pr-16 text-sm!"
                  aria-invalid={invalidPath || !validPath}
                  ref={inputRef}
                  value={
                    isEditing
                      ? endpointValue.startsWith("kokiri-api.com/api/")
                        ? endpointValue.replace("kokiri-api.com/api/", "")
                        : endpointValue
                      : endpointValue
                  }
                  onChange={(ev) => setEndpointValue(ev.target.value)}
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter" && !invalidPath && validPath) {
                      updateEndpointMutation.mutate({
                        id: e.nanoid,
                        oldPath: e.path,
                        newPath: endpointValue
                      });
                      setIsEditing(false);
                    }

                    if (ev.key === "Escape") {
                      setIsEditing(false);
                      setEndpointValue(e.path);
                    }
                  }}
                  autoFocus
                />
                <Button
                  className="absolute right-2"
                  size="xs"
                  onClick={() => {
                    setIsEditing(false);
                    setEndpointValue(e.path);
                  }}
                >
                  Close
                </Button>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full">
                  <Button
                    variant="outline"
                    asChild
                    size="xs"
                  >
                    <p
                      className="rounded-full border border-neutral-200 bg-white px-2 py-0.5 text-sm!
text-black!"
                    >
                      kokiri-api.com/api/{e.path}
                    </p>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right">
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => {
                        navigator.clipboard.writeText(`kokiri-api.com/api/${e.path}`);

                        toast.success("API copied to clipboard", {
                          position: "top-right"
                        });
                      }}
                    >
                      Copy
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsEditing(true)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem
                      className="bg-red-500 text-white"
                      onClick={() => deleteEndpointMutation.mutate({ nanoid: e.nanoid, path: e.path })}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="p-0!"
              size="icon-xs"
            >
              <ChevronsUpDown className="size-4" />
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="relative mt-2 rounded-lg border border-neutral-200 bg-white p-2">
          <pre>
            <code className="text-sm">
              {e.response ? JSON.stringify(JSON.parse(e.response as string), null, 2) : ""}
            </code>
          </pre>

          <Button
            className="absolute top-2 right-2"
            size="xs"
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(JSON.parse(e.response as string), null, 2));

              toast.success("JSON copied to clipboard", {
                position: "top-right"
              });
            }}
          >
            Copy
          </Button>
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
}
