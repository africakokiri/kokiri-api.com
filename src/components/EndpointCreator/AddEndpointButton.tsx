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
  useAppInitializerStore,
  useEndpointStore,
  useHttpStore,
  useResponseStore,
  useSuccessOrErrorStore
} from "@/libs/zustand/store";

import { useEffect, useState } from "react";

export const AddEndpointButton = () => {
  const [isPathValid, setIsPathValid] = useState(false);
  const [ieEndpointPathExist, setIsEndpointPathExist] = useState(false);

  const { userId } = useAppInitializerStore();
  const { endpointPath, httpMethod } = useHttpStore();
  const { successStatus, errorStatus } = useSuccessOrErrorStore();
  const {
    successResponse,
    errorResponse,
    isResponsesValid,
    setResponsesValidation
  } = useResponseStore();
  const { endpoints, addEndpoint } = useEndpointStore();

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
            (endpoint) => endpoint.endpointPath === endpointPath
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
              successStatus,
              errorStatus,
              successResponse,
              errorResponse
            });

            // DB에 엔드포인트 insert
            await insertEndpoint(userId, {
              endpointPath,
              httpMethod,
              successStatus,
              errorStatus,
              successResponse,
              errorResponse
            });
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
