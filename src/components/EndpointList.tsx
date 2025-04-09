"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { cn } from "@/libs/shadcn/utils";
import { useEndpointStore } from "@/libs/zustand/store";

import copy from "copy-to-clipboard";
import { Play } from "lucide-react";
import { useState } from "react";

const getMethodVariant = (method: string) => {
  switch (method.toUpperCase()) {
    case "GET":
      return "default";
    case "POST":
      return "secondary";
    case "PUT":
      return "outline";
    case "DELETE":
      return "destructive";
    default:
      return "secondary";
  }
};

const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copy(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <Badge
      onClick={handleCopy}
      className={cn(
        `cursor-pointer bg-secondary text-foreground hover:bg-foreground
hover:text-secondary`,
        copied && "bg-green-500 text-secondary hover:bg-green-500"
      )}
    >
      {copied ? "Copied!" : "Copy"}
    </Badge>
  );
};

export const EndpointList = () => {
  const { endpoints, removeEndpoint } = useEndpointStore();

  const handleRemoveButton = (
    endpointPath: string,
    httpMethod: string
  ) => {
    removeEndpoint(endpointPath, httpMethod);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle
          className="flex items-center justify-between text-2xl
font-semibold"
        >
          <p>Defined Endpoints</p>
          <Button>
            <Play className="h-4 w-4" />
            Active Server
          </Button>
        </CardTitle>
        {endpoints && endpoints.length === 0 && (
          <CardDescription>
            No endpoints defined yet. Create one using the form.
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {endpoints.map(
            (
              { endpointPath, httpMethod, successStatus, errorStatus },
              index
            ) => (
              <div
                key={`${httpMethod}-${endpointPath}-${index}`}
                className="space-y-1 rounded-md border p-2"
              >
                <div className="flex items-center gap-2">
                  <Badge variant={getMethodVariant(httpMethod)}>
                    {httpMethod}
                  </Badge>
                  <span className="font-mono text-sm">{endpointPath}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">
                    Status: {successStatus}(Success) / {errorStatus}(Error)
                  </span>
                  <div className="flex gap-4">
                    <CopyButton
                      key={index}
                      textToCopy={endpointPath}
                    />
                    <Badge
                      className="cursor-pointer bg-destructive
hover:bg-red-400"
                      onClick={() =>
                        handleRemoveButton(endpointPath, httpMethod)
                      }
                    >
                      Remove
                    </Badge>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};
