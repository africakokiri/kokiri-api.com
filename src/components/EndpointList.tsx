"use client";

import { type HTTP_METHODS } from "@/components/EndpointCreator/HttpMethod";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/libs/shadcn/utils";
import { checkUuidExist, deleteEndpoint, getEndpoints } from "@/libs/supabase/utils";
import { useEndpointStore, useUuidStore } from "@/libs/zustand/store";
import { robotoMonoVar } from "@/styles/fonts";
import { type Endpoints } from "@/types/endoints";

import { AlertCircle, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

// HTTP Method에 따라 element의 ba-color를 변경하는 함수
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

// UUID의 유효성을 확인하는 함수
const checkUUIDValidation = (uuid: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

export const EndpointList = () => {
  const inputRef = useRef(null);

  const [fetchUuid, setFetchUuid] = useState("");
  const [fetchUuidValidation, setFetchUuidValidation] = useState(false);
  const [existEndpoint, setExistEndpoint] = useState([false, ""]);

  const { endpoints, addEndpoint, removeEndpoint } = useEndpointStore();
  const { uuid } = useUuidStore();

  // UUID가 존재하고 UUID의 유효성 여부에 따라 UUIDValidation state를 제어하는 로직
  useEffect(() => {
    if (fetchUuid && !checkUUIDValidation(fetchUuid)) {
      setFetchUuidValidation(false);
    } else {
      setFetchUuidValidation(true);
    }
  }, [fetchUuid]);

  // UUID로 endpoints를 불러오는 로직
  const handleFetchEndpointsByUuid = async () => {
    // Fetch할 UUID를 입력하지 않으면 함수 종료
    if (!fetchUuid) return;

    // 1. Fetch할 UUID가 유효하게 입력되었으므로 fetch UUID 빈 문자열로 변경
    setFetchUuid("");

    // 2. Fetch UUID가 빈 문자열로 변경되었으므로 중복될 경우가 없어 이미 존재하는 fetch endpoint 여부를 false로 변경
    setExistEndpoint([false]);

    // 3. DB에 존재하는 endpoints를 불러옴
    const dbEndpoints: Endpoints[] = await getEndpoints(fetchUuid);

    // 4. localStorage에 추가된 endpoints와 DB의 endpoints가 중복되는지 확인
    const allExist = dbEndpoints.every((incoming) =>
      endpoints.some(
        (existing) =>
          (existing.endpoint_path.slice(36) === incoming.endpoint_path ||
            existing.endpoint_path === incoming.endpoint_path) &&
          existing.http_method === incoming.http_method
      )
    );

    // 5. Fetch할 UUID가 DB에 존재하는지 확인
    const uuidInDB = await checkUuidExist(fetchUuid);

    // 6. 존재하지 않으면 경고를 렌더링하고 함수 종료
    if (!uuidInDB) {
      setExistEndpoint([true, "Endpoint not found."]);

      return;
    }

    // 7-1. 추가하려는 endpoints가 localStorage의 endpoints와 중복되지 않으면 endpoints를 localStorage에 추가
    if (!allExist) {
      dbEndpoints.forEach((endpoint) => {
        addEndpoint({
          endpoint_path: endpoint.uuid + endpoint.endpoint_path,
          http_method: endpoint.http_method as (typeof HTTP_METHODS)[number],
          status_success: endpoint.status_success.toString(),
          status_error: endpoint.status_error.toString(),
          response_success: endpoint.response_success!.toString(),
          response_error: endpoint.response_error!.toString(),
          delay_success: endpoint.delay_success.toString(),
          delay_error: endpoint.delay_error.toString(),
          uuid
        });
      });
      // 7-2. 추가하려는 endpoints가 localStoarge의 endpoints와 중복되면 함수를 종료하고 경고를 렌더링하고 함수 종료
    } else {
      setExistEndpoint([true, "The endpoint you are trying to add already exists in this field."]);
    }
  };

  // Remove 버튼을 제어하는 함수
  const handleRemoveButton = async (endpoint_path: string, http_method: string) => {
    removeEndpoint(endpoint_path, http_method); // UI에서 삭제
    await deleteEndpoint(endpoint_path); // DB에서 삭제
  };

  return (
    <Card className="h-[786px]">
      <CardHeader className="space-y-4">
        <CardTitle className="flex items-center justify-between gap-4 text-2xl font-semibold">
          <h2>Defined Endpoints</h2>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button>Fetch endpoints by UUID</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Fetch endpoints by UUID</AlertDialogTitle>
                <AlertDialogDescription asChild>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="input-uuid">Please enter your UUID</Label>
                      <div className="flex h-5 items-center gap-2 text-sm text-destructive">
                        {!fetchUuidValidation ? (
                          <>
                            <AlertCircle className="h-4 w-4" />
                            <span>Invalid JSON format</span>
                          </>
                        ) : (
                          <span className="invisible">Invalid JSON format</span>
                        )}
                      </div>
                    </div>
                    <div className="relative flex items-center">
                      <Input
                        ref={inputRef}
                        id="input-uuid"
                        value={fetchUuid}
                        maxLength={36}
                        onChange={(e) => setFetchUuid(e.target.value)}
                        className={cn(!fetchUuidValidation && "border-red-500 !ring-red-500")}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-gray-500
hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                        onClick={() => {
                          setFetchUuid("");

                          if (inputRef.current) {
                            (inputRef.current as HTMLInputElement).focus();
                          }
                        }}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Clear</span>
                      </Button>
                    </div>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setFetchUuid("")}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  disabled={!fetchUuidValidation}
                  onClick={handleFetchEndpointsByUuid}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardTitle>

        {endpoints && endpoints.length === 0 && (
          <CardDescription>
            No endpoints defined yet. Create a new one or load using a UUID.
          </CardDescription>
        )}

        {existEndpoint[0] && (
          <div
            className="mt-2 flex items-center justify-between gap-2 rounded-lg border
border-destructive/50 px-4 py-3 text-sm text-destructive dark:border-destructive
[&>svg]:text-destructive"
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
        className={cn("h-[678px] space-y-4 overflow-y-auto", existEndpoint[0] && "h-[614px]")}
      >
        {endpoints.map(
          (
            {
              endpoint_path,
              http_method,
              status_success,
              status_error,
              response_success,
              response_error
            },
            index
          ) => {
            const slicedUuid = endpoint_path.slice(0, 36);
            const isSlicedUuidValid = checkUUIDValidation(slicedUuid);

            return (
              <div
                key={`${http_method}-${endpoint_path}-${index}`}
                className="space-y-2 rounded-md border p-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex w-full items-center justify-between gap-4">
                    <Badge
                      variant={getMethodVariant(http_method)}
                      className="rounded-full"
                    >
                      {http_method}
                    </Badge>
                    <div
                      className={`${robotoMonoVar.className} rounded-md border bg-muted/50 px-2 py-1
text-xs`}
                    >
                      <span>kokiri-api.com/</span>
                      <span className="font-semibold text-green-600 underline underline-offset-4">
                        {isSlicedUuidValid ? slicedUuid : uuid}
                      </span>
                      <span>
                        {checkUUIDValidation(endpoint_path.slice(0, 36))
                          ? endpoint_path.slice(36, 72)
                          : endpoint_path}
                      </span>

                      <span className="sr-only"></span>
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
                          Status: {status_success}
                        </Badge>
                        <span className="text-sm text-muted-foreground">Success Response</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="rounded-md border bg-muted/50 p-4">
                        <pre className="max-h-60 overflow-auto whitespace-pre-wrap text-xs">
                          <ReactJson
                            src={JSON.parse(response_success)}
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
                          Status: {status_error}
                        </Badge>
                        <span className="text-sm text-muted-foreground">Error Response</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="rounded-md border bg-muted/50 p-4">
                        <pre className="max-h-60 overflow-auto whitespace-pre-wrap text-xs">
                          <ReactJson
                            src={JSON.parse(response_error)}
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
                      className="cursor-pointer bg-destructive hover:bg-red-400"
                      onClick={() => handleRemoveButton(endpoint_path, http_method)}
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
