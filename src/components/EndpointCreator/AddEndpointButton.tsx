"use client";

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

  const { userId } = useAppInitializerStore();
  const { endpointPath, httpMethod } = useHttpStore();
  const { successStatus, errorStatus } = useSuccessOrErrorStore();
  const { successResponse, errorResponse } = useResponseStore();
  const { addEndpoint } = useEndpointStore();

  useEffect(() => {
    if (!endpointPath || endpointPath[0] !== "/") {
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
    <Button
      disabled={pathStartWordAlert}
      className="w-full"
      onClick={async () => {
        addEndpoint({
          endpointPath,
          httpMethod,
          successStatus,
          errorStatus,
          successResponse,
          errorResponse
        });
        await insertData();
      }}
    >
      Add Endpoint
    </Button>
  );
};
