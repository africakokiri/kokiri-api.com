"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  checkIsEndpointExist,
  insertEndpoint
} from "@/libs/supabase/utils";
import {
  useDelayStore,
  useEndpointStore,
  useHttpStore,
  useResponseStore,
  useSuccessOrErrorStore,
  useUuidStore
} from "@/libs/zustand/store";

import { useEffect, useState } from "react";

export const AddEndpointButton = () => {
  const [isPathValid, setIsPathValid] = useState(false);
  const [ieEndpointPathExist, setIsEndpointPathExist] = useState(false);

  const { userId } = useUuidStore();
  const { endpointPath, setEndPointPath, httpMethod } = useHttpStore();
  const { successStatus, errorStatus } = useSuccessOrErrorStore();
  const {
    successResponse,
    errorResponse,
    isResponsesValid,
    setResponsesValidation
  } = useResponseStore();
  const { endpoints, addEndpoint } = useEndpointStore();
  const { successDelay, errorDelay } = useDelayStore();
  const { setSuccessResponse, setErrorResponse } = useResponseStore();

  // Endpoint path가 /api/로 시작하지 않으면 에러를 표시하는 로직
  useEffect(() => {
    const isValid =
      endpointPath !== "" &&
      endpointPath.startsWith("/api/") &&
      isResponsesValid;

    setIsPathValid(isValid);
  }, [endpointPath, isResponsesValid]);

  useEffect(() => {
    setResponsesValidation(successResponse, errorResponse);

    // eslint-disable-next-line
  }, [successResponse, errorResponse]);

  return (
    <>
      <Button
        disabled={!isPathValid}
        className="w-full"
        onClick={async () => {
          const isExist = endpoints.some(
            (endpoint) =>
              endpoint.endpointPath === endpointPath &&
              endpoint.httpMethod === httpMethod
          );

          // DB에 endpointPath가 존재하지 않으면 insert
          if (
            !isExist &&
            !(await checkIsEndpointExist(userId, endpointPath))
          ) {
            setIsEndpointPathExist(false);

            // Defined Endpoints에 엔드포인트 렌더링
            addEndpoint({
              endpointPath,
              httpMethod,
              successStatus: successStatus === "" ? "200" : successStatus,
              errorStatus: errorStatus === "" ? "400" : errorStatus,
              successResponse,
              errorResponse,
              successDelay: successStatus === "" ? "0" : successDelay,
              errorDelay: errorStatus === "" ? "0" : errorDelay
            });

            // DB에 엔드포인트 insert
            await insertEndpoint(userId, {
              endpointPath,
              httpMethod,
              successStatus: successStatus === "" ? "200" : successStatus,
              errorStatus: errorStatus === "" ? "400" : errorStatus,
              successResponse,
              errorResponse,
              successDelay: successStatus === "" ? "0" : successDelay,
              errorDelay: errorStatus === "" ? "0" : errorDelay
            });

            setEndPointPath("");
            setSuccessResponse('{\n  "data": {}\n}');
            setErrorResponse('{\n  "error": "An error occurred"\n}');
          } else {
            setIsEndpointPathExist(true);
          }
        }}
      >
        Add Endpoint
      </Button>

      <AlertDialog
        open={ieEndpointPathExist}
        onOpenChange={setIsEndpointPathExist}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              The endpoint path already exists.
            </AlertDialogTitle>
            <AlertDialogDescription>
              To modify the JSON response, please delete the existing
              endpoint path first.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
