"use client";

import { type HTTP_METHODS } from "@/components/EndpointCreator/HttpMethod";
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
import { cn } from "@/libs/shadcn/utils";
import {
  deleteEndpoint,
  getEndpoints,
  getUuid
} from "@/libs/supabase/utils";
import { useEndpointStore, useUuidStore } from "@/libs/zustand/store";
import { robotoMonoVar } from "@/styles/fonts";

import { AlertCircle, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

type Endpoint = {
  id: number;
  created_at: string;
  path: string;
  method: string;
  status_success: string;
  status_error: string;
  response_success: string;
  response_error: string;
  uuid: string;
};

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
  const inputRef = useRef(null);

  const [uuid, setUuid] = useState("");
  const [uuidValidation, setUuidValidation] = useState(false);
  const [existEndpoint, setExistEndpoint] = useState([false, ""]);

  const { endpoints, addEndpoint, removeEndpoint } = useEndpointStore();
  const { userId } = useUuidStore();

  // Remove 버튼 제어
  const handleRemoveButton = async (
    endpointPath: string,
    httpMethod: string
  ) => {
    // UI에서 삭제
    removeEndpoint(endpointPath, httpMethod);

    // DB에서 삭제
    await deleteEndpoint(endpointPath);
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
    <Card className="h-[840px]">
      <CardHeader className="space-y-4">
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
                    <div className="relative flex items-center">
                      <Input
                        ref={inputRef}
                        id="input-uuid"
                        value={uuid}
                        onChange={(e) => setUuid(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 h-7 w-7
-translate-y-1/2 text-gray-500 hover:text-gray-900 dark:text-gray-400
dark:hover:text-gray-100"
                        onClick={() => {
                          setUuid("");

                          if (inputRef.current) {
                            (inputRef.current as HTMLInputElement).focus();
                          }
                        }}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Clear</span>
                      </Button>
                    </div>
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
                <AlertDialogAction
                  onClick={async () => {
                    if (!uuid) return;

                    setExistEndpoint([false]);

                    const dbEndpoints: Endpoint[] =
                      await getEndpoints(uuid);

                    // 모든 DB 엔드포인트가 기존에 존재하는지 확인
                    const allExist = dbEndpoints.every((incoming) =>
                      endpoints.some(
                        (existing) =>
                          (existing.endpointPath.slice(36) ===
                            incoming.path ||
                            existing.endpointPath === incoming.path) &&
                          existing.httpMethod === incoming.method
                      )
                    );

                    const uuidInDB = await getUuid(uuid);

                    if (!uuidInDB) {
                      console.log(uuidInDB + "!");

                      setExistEndpoint([true, "Endpoint not found."]);

                      return;
                    }

                    if (!allExist) {
                      dbEndpoints.forEach((endpoint) => {
                        addEndpoint({
                          endpointPath: endpoint.uuid + endpoint.path,
                          httpMethod:
                            endpoint.method as (typeof HTTP_METHODS)[number],
                          successStatus: endpoint.status_success,
                          errorStatus: endpoint.status_error,
                          successResponse: endpoint.response_success,
                          errorResponse: endpoint.response_error
                        });
                      });
                    } else {
                      setExistEndpoint([
                        true,
                        "The endpoint you are trying to add already exists in this field."
                      ]);
                    }
                  }}
                >
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

        {existEndpoint[0] && (
          <div
            className="mt-2 flex items-center justify-between gap-2
rounded-lg border border-destructive/50 px-4 py-3 text-sm text-destructive
dark:border-destructive [&>svg]:text-destructive"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <p>{existEndpoint[1]}</p>
            </div>

            <X
              onClick={() => setExistEndpoint([false])}
              className="h-4 w-4 cursor-pointer"
            />
          </div>
        )}
      </CardHeader>
      <CardContent
        className={cn(
          "h-[724px] space-y-4 overflow-y-scroll",
          existEndpoint[0] && "h-[670px]"
        )}
      >
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
            const slicedUuid = endpointPath.slice(0, 36);
            const isSlicedUuidValid = isValidUUID(slicedUuid);

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
border bg-muted/50 px-2 py-1 text-xs`}
                    >
                      <span>kokiri-api.com/</span>
                      <span
                        className="font-semibold text-green-600 underline
underline-offset-4"
                      >
                        {isSlicedUuidValid ? slicedUuid : userId}
                      </span>
                      <span>
                        {isValidUUID(endpointPath.slice(0, 36))
                          ? endpointPath.slice(36, 72)
                          : endpointPath}
                      </span>

                      <span className="sr-only">
                        {`kokiri-api.com/${isSlicedUuidValid ? slicedUuid : userId}${
                          isValidUUID(endpointPath.slice(0, 36))
                            ? endpointPath.slice(36, 72)
                            : endpointPath
                        }`}
                      </span>
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
                          <ReactJson
                            src={JSON.parse(successResponse)}
                            displayDataTypes={false}
                            iconStyle="square"
                            collapsed={2}
                          />
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
                          <ReactJson
                            src={JSON.parse(errorResponse)}
                            displayDataTypes={false}
                            iconStyle="square"
                            collapsed={2}
                          />
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
