"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
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

// HTTP Method에 따라 element bg-color 변경
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

  // Remove 버튼 제어
  const handleRemoveButton = (
    endpointPath: string,
    httpMethod: string
  ) => {
    removeEndpoint(endpointPath, httpMethod);
  };

  // Prettify JSON
  const prettifyResopnse = (response: string) => {
    const parsedResponse = JSON.parse(response);
    const prettyResponse = JSON.stringify(parsedResponse, null, 2);

    return prettyResponse;
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
            return (
              <div
                key={`${httpMethod}-${endpointPath}-${index}`}
                className="space-y-2 rounded-md border p-2"
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
                        className="text-green-600 underline
underline-offset-4"
                      >
                        {userId}
                      </span>
                      {endpointPath}
                    </div>
                  </div>
                </div>

                <Accordion
                  type="single"
                  collapsible
                >
                  <AccordionItem value="success-response">
                    <AccordionTrigger className="hover:no-underline">
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
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="rounded-md border bg-muted/50 p-4">
                        <pre
                          className="max-h-60 overflow-auto
whitespace-pre-wrap text-xs"
                        >
                          {prettifyResopnse(successResponse)}
                        </pre>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Accordion
                  type="single"
                  collapsible
                >
                  <AccordionItem value="success-response">
                    <AccordionTrigger className="hover:no-underline">
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
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="rounded-md border bg-muted/50 p-4">
                        <pre
                          className="max-h-60 overflow-auto
whitespace-pre-wrap text-xs"
                        >
                          {prettifyResopnse(errorResponse)}
                        </pre>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

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
      </CardContent>
    </Card>
  );
};
