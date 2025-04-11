"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteEndpoint, getEndpoints } from "@/libs/supabase/utils";
import {
  useEndpointStore,
  useHttpStore,
  useUuidStore
} from "@/libs/zustand/store";
import { robotoMonoVar } from "@/styles/fonts";

import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [uuid, setUuid] = useState("");
  const [uuidValidation, setUuidValidation] = useState(false);

  const { endpoints, removeEndpoint } = useEndpointStore();
  const { userId } = useUuidStore();
  const { endpointPath, setEndPointPath } = useHttpStore();

  // Remove 버튼 제어
  const handleRemoveButton = async (
    endpointPath: string,
    httpMethod: string
  ) => {
    // UI에서 삭제
    removeEndpoint(endpointPath, httpMethod);

    console.log(endpointPath, userId);
    // DB에서 삭제
    await deleteEndpoint(userId, endpointPath);
  };

  // Prettify JSON
  const prettifyResopnse = (response: string) => {
    const parsedResponse = JSON.parse(response);
    const prettyResponse = JSON.stringify(parsedResponse, null, 2);

    return prettyResponse;
  };

  // UUID 유효성 확인
  const isValidUUID = (uuid: string) => {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  };

  useEffect(() => {
    if (uuid && !isValidUUID(uuid)) {
      setUuidValidation(false);
    } else {
      setUuidValidation(true);
    }
  }, [uuid]);

  return (
    <Card>
      <CardHeader>
        <CardTitle
          className="flex items-center justify-between text-2xl
font-semibold"
        >
          Defined Endpoints
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Fetch endpoints by UUID</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Fetch endpoints by UUID
                </AlertDialogTitle>
                <AlertDialogDescription asChild>
                  <div className="space-y-2">
                    <Label htmlFor="input-uuid">
                      Please enter your UUID
                    </Label>
                    <Input
                      id="input-uuid"
                      onChange={(e) => setUuid(e.target.value)}
                    />
                    {!uuidValidation && (
                      <div
                        className="mt-2 flex items-center gap-2 rounded-lg
border border-destructive/50 px-4 py-3 text-sm text-destructive
dark:border-destructive [&>svg]:text-destructive"
                      >
                        <AlertCircle className="h-4 w-4" />
                        <p>Invalid UUID format</p>
                      </div>
                    )}
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => getEndpoints(userId)}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardTitle>
        {endpoints && endpoints.length === 0 && (
          <CardDescription>
            No endpoints defined yet. Create one using the form.
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="mb-6 h-[808px] space-y-4 overflow-y-scroll">
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
                          className="rounded-full hover:bg-destructive"
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
