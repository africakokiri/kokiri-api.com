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
import { robotoMonoVar } from "@/styles/fonts";

import { AlertCircle, Send } from "lucide-react";

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
        <CardTitle className="text-2xl font-semibold">
          Defined Endpoints
        </CardTitle>
        {endpoints && endpoints.length === 0 && (
          <CardDescription>
            No endpoints defined yet. Create one using the form.
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          {endpoints.map(
            (
              { endpointPath, httpMethod, successStatus, errorStatus },
              index
            ) => (
              <div
                key={`${httpMethod}-${endpointPath}-${index}`}
                className="space-y-4 rounded-md border p-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={getMethodVariant(httpMethod)}
                      className="rounded-full"
                    >
                      {httpMethod}
                    </Badge>
                    <span className={`${robotoMonoVar.className} text-sm`}>
                      {endpointPath}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="border text-sm"
                    >
                      <Send className="h-4 w-4" />
                      Success
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="border text-sm"
                    >
                      <AlertCircle className="h-4 w-4" />
                      Error
                    </Button>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="rounded-full"
                    >
                      Status: {successStatus}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Success Response
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex w-full justify-end gap-4">
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
