"use client";

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
import { Button } from "@/components/ui/button";
import { createClient } from "@/libs/supabase/clientClient";
import {
  useAppInitializerStore,
  useEndpointStore,
  useHttpStore,
  useResponseStore,
  useSuccessOrErrorStore
} from "@/libs/zustand/store";

import { useEffect, useState } from "react";

export const AddEndpointButton = () => {
  const [pathStartWordAlert, setPathStartWordAlert] = useState(false);
  const [ieEndpointPathExist, setIsEndpointPathExist] = useState(false);

  const { userId } = useAppInitializerStore();
  const { endpointPath, httpMethod } = useHttpStore();
  const { successStatus, errorStatus } = useSuccessOrErrorStore();
  const { successResponse, errorResponse } = useResponseStore();
  const { endpoints, addEndpoint } = useEndpointStore();

  useEffect(() => {
    if (!endpointPath || !endpointPath.startsWith("/api/")) {
      setPathStartWordAlert(true);
    } else {
      setPathStartWordAlert(false);
    }
  }, [endpointPath]);

  const insertData = async () => {
    try {
      const supabase = createClient();

      if (!userId) throw new Error("nanoId 없음");

      const payload = {
        nanoid: userId,
        path: endpointPath,
        method: httpMethod,
        status_success: successStatus,
        status_error: errorStatus,
        response_success: successResponse,
        response_error: errorResponse
      };

      const { error } = await supabase.from("endpoints").insert(payload);

      if (error) throw new Error(error.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        disabled={pathStartWordAlert}
        className="w-full"
        onClick={() => {
          endpoints.forEach(async (endpoint) => {
            if (endpoint.endpointPath === endpointPath) {
              setIsEndpointPathExist(true);
            } else {
              setIsEndpointPathExist(false);

              addEndpoint({
                endpointPath,
                httpMethod,
                successStatus,
                errorStatus,
                successResponse,
                errorResponse
              });

              await insertData();
            }
          });
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
