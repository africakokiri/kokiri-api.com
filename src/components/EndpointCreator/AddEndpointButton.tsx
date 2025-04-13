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
import { checkEndpointExist, insertEndpoint } from "@/libs/supabase/utils";
import {
  useDelayStore,
  useEndpointStore,
  useHttpStore,
  useResponseStore,
  useStatusStore,
  useUuidStore
} from "@/libs/zustand/store";

import { useEffect, useState } from "react";

export const AddEndpointButton = () => {
  const [isPathValid, setIsPathValid] = useState(false);
  const [ieEndpointPathExist, setIsEndpointPathExist] = useState(false);

  const { uuid } = useUuidStore();
  const { endpoint_path, setEndPointPath, http_method } = useHttpStore();
  const { success_status, error_status } = useStatusStore();
  const { success_response, error_response, isResponsesValid, setResponsesValidation } =
    useResponseStore();
  const { endpoints, addEndpoint } = useEndpointStore();
  const { success_delay, error_delay } = useDelayStore();
  const { setSuccessResponse, setErrorResponse } = useResponseStore();

  // Endpoint path가 /api/로 시작하지 않으면 에러를 표시하는 로직
  useEffect(() => {
    const isValid =
      endpoint_path !== "" &&
      endpoint_path.startsWith("/api/") &&
      endpoint_path.length > 5 &&
      isResponsesValid;

    setIsPathValid(isValid);
  }, [endpoint_path, isResponsesValid]);

  useEffect(() => {
    setResponsesValidation(success_response, error_response);

    // eslint-disable-next-line
  }, [success_response, error_response]);

  return (
    <>
      <Button
        disabled={!isPathValid}
        className="w-full"
        onClick={async () => {
          const isExist = endpoints.some(
            (endpoint) => endpoint.endpointPath === endpoint_path && endpoint.httpMethod === http_method
          );

          // DB에 endpointPath가 존재하지 않으면 insert
          if (!isExist && !(await checkEndpointExist(uuid, endpoint_path))) {
            setIsEndpointPathExist(false);

            // Defined Endpoints에 엔드포인트 렌더링
            addEndpoint({
              endpoint_path,
              http_method,
              success_status: success_status === "" ? "200" : success_status,
              error_status: error_status === "" ? "400" : error_status,
              success_response,
              error_response,
              success_delay: success_status === "" ? "0" : success_delay,
              error_delay: error_status === "" ? "0" : error_delay
            });

            // DB에 엔드포인트 insert
            await insertEndpoint(uuid, {
              endpoint_path,
              http_method,
              success_status: success_status === "" ? 200 : parseInt(success_status),
              error_status: error_status === "" ? 400 : parseInt(error_status),
              success_response,
              error_response,
              success_delay: success_status === "" ? 0 : parseInt(success_delay),
              error_delay: error_status === "" ? 0 : parseInt(error_delay)
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
            <AlertDialogTitle>The endpoint path already exists.</AlertDialogTitle>
            <AlertDialogDescription>
              To modify the JSON response, please delete the existing endpoint path first.
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
