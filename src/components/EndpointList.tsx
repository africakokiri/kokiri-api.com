"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  useAppInitializerStore,
  useEndpointStore
} from "@/libs/zustand/store";
import { robotoMonoVar } from "@/styles/fonts";

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
  const { userId } = useAppInitializerStore();

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
              {
                endpointPath,
                httpMethod,
                successStatus,
                errorStatus,
                successResponse,
                errorResponse
              },
              index
            ) => {
              const parsedSuccessResponse = JSON.parse(successResponse);
              const prettySuccessResponse = JSON.stringify(
                parsedSuccessResponse,
                null,
                2
              );

              const parsedErrorResponse = JSON.parse(errorResponse);
              const prettyErrorResponse = JSON.stringify(
                parsedErrorResponse,
                null,
                2
              );

              return (
                <div
                  key={`${httpMethod}-${endpointPath}-${index}`}
                  className="space-y-4 rounded-md border p-2"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="flex w-full items-center justify-between
gap-4"
                    >
                      <Badge
                        variant={getMethodVariant(httpMethod)}
                        className="rounded-full"
                      >
                        {httpMethod}
                      </Badge>
                      <div
                        className={`${robotoMonoVar.className} rounded-md
border bg-muted/50 px-2 py-1 text-sm`}
                      >
                        <span
                          className="text-blue-500 underline
underline-offset-4"
                        >
                          {userId}
                        </span>
                        {endpointPath}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
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
                    <div className="rounded-md border bg-muted/50 p-4">
                      <pre
                        className="max-h-60 overflow-auto
whitespace-pre-wrap text-xs"
                      >
                        {prettySuccessResponse}
                      </pre>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="destructive"
                        className="rounded-full"
                      >
                        Status: {errorStatus}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Error Response
                      </span>
                    </div>
                    <div className="rounded-md border bg-muted/50 p-4">
                      <pre
                        className="max-h-60 overflow-auto
whitespace-pre-wrap text-xs"
                      >
                        {prettyErrorResponse}
                      </pre>
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
              );
            }
          )}
        </div>
      </CardContent>
    </Card>
  );
};
