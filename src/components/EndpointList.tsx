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
import { useEndpointStore } from "@/libs/zustand/store";

import { Play } from "lucide-react";

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

export const EndpointList = () => {
  const { endpoints } = useEndpointStore();

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
                  <Badge
                    className="cursor-pointer bg-secondary text-foreground
hover:bg-foreground hover:text-secondary"
                  >
                    Copy
                  </Badge>
                </div>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};
