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
  const { status_success, status_error } = useStatusStore();
  const { response_success, response_error, isResponsesValid, setResponsesValidation } =
    useResponseStore();
  const { endpoints, addEndpoint } = useEndpointStore();
  const { delay_success, delay_error } = useDelayStore();
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
    setResponsesValidation(response_success, response_error);

    // eslint-disable-next-line
  }, [response_success, response_error]);

  // Add Endpoint 버튼 제어하는 함수
  const handleAddEndpointButtonOnclick = async () => {
    // 1. 추가하려는 endpoint path && http method가 이미 존재하는지 확인
    const isExist = endpoints.some(
      (endpoint) => endpoint.endpoint_path === endpoint_path && endpoint.http_method === http_method
    );

    // 2. localStorage의 endpoints와 DB에 endpoint path가 존재하지 않으면 insert
    if (!isExist && !(await checkEndpointExist(uuid, endpoint_path))) {
      setIsEndpointPathExist(false);

      // Endpoints
      const fields = {
        endpoint_path,
        http_method,
        status_success: status_success === "" ? "200" : status_success,
        status_error: status_error === "" ? "400" : status_error,
        response_success,
        response_error,
        delay_success: status_success === "" ? "0" : delay_success,
        delay_error: status_error === "" ? "0" : delay_error,
        uuid
      };

      // 3. localStorage에 endpoint 추가
      addEndpoint(fields);

      // 4. DB에 endpoint insert
      await insertEndpoint(uuid, {
        ...fields,
        status_success: parseInt(fields.status_success),
        status_error: parseInt(fields.status_error),
        delay_success: parseInt(fields.delay_success),
        delay_error: parseInt(fields.delay_error)
      });

      // 5. 모든 로직이 수행되면 endpoint path, success / error response 초기화
      setEndPointPath("");
      setSuccessResponse('{\n  "data": {}\n}');
      setErrorResponse('{\n  "error": "An error occurred"\n}');
    } else {
      setIsEndpointPathExist(true);
    }
  };

  return (
    <>
      <Button
        disabled={!isPathValid}
        className="w-full"
        onClick={handleAddEndpointButtonOnclick}
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
