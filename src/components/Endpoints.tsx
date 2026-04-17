"use client";

import { type Endpoints } from "@/generated/prisma/client";
import { cn } from "@/libs/tailwind/utils";
import { getEndpoints } from "@/server/query";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/ui/collapsible";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function Endpoints() {
  const [data, setData] = useState<Endpoints[]>();

  useEffect(() => {
    const id = localStorage.getItem("id");

    if (!id) return;

    (async () => {
      setData(await getEndpoints(id));
    })();
  }, []);

  return (
    <ul className="space-y-2">
      {data?.map((e) => {
        return (
          <li key={e.id}>
            <Collapsible className="space-y-2 rounded-lg border border-neutral-200 bg-neutral-100 p-2">
              <div className="m-0 flex justify-between">
                <div className="flex items-center gap-2">
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
                    className={cn(
                      e.http_method !== "GET" && e.http_method !== "DELETE" && "bg-neutral-300"
                    )}
                  >
                    {e.http_method}
                  </Badge>
                  <Button
                    variant="outline"
                    asChild
                    size="xs"
                    onClick={() => {
                      navigator.clipboard.writeText(`kokiri-api.com/api/${e.path}`);

                      toast.success("API copied to clipboard", {
                        position: "top-right"
                      });
                    }}
                  >
                    <p
                      className="rounded-full border border-neutral-200 bg-white px-2 py-0.5 text-sm!
text-black!"
                    >
                      kokiri-api.com/api/{e.path}
                    </p>
                  </Button>
                </div>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="p-0!"
                    size="icon-xs"
                  >
                    <ChevronDown className="size-4" />
                  </Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent
                className="relative mt-2 rounded-lg border border-neutral-200 bg-white p-2"
              >
                <pre>
                  <code className="text-sm">
                    {e.response ? JSON.stringify(JSON.parse(e.response as string), null, 2) : ""}
                  </code>
                </pre>

                <Button
                  className="absolute top-2 right-2"
                  size="xs"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      JSON.stringify(JSON.parse(e.response as string), null, 2)
                    );

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
      })}
    </ul>
  );
}
