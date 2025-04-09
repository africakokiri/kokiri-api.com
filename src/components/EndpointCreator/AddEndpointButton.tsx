"use client";

import { Button } from "@/components/ui/button";
import {
  useFieldStore,
  useHttpStore,
  useResponseStore,
  useSuccessOrErrorStore
} from "@/libs/zustand/store";

import { useEffect, useState } from "react";

export const AddEndpointButton = () => {
  const [pathStartWordAlert, setPathStartWordAlert] = useState(false);

  const { endpointPath, httpMethod } = useHttpStore();
  const { successStatus, errorStatus } = useSuccessOrErrorStore();
  const { successResponse, errorResponse } = useResponseStore();
  const { addField } = useFieldStore();

  useEffect(() => {
    if (!endpointPath || endpointPath[0] !== "/") {
      setPathStartWordAlert(true);
    } else {
      setPathStartWordAlert(false);
    }
  }, [endpointPath]);

  return (
    <Button
      disabled={pathStartWordAlert}
      className="w-full"
      onClick={() =>
        addField({
          endpointPath,
          httpMethod,
          successStatus,
          errorStatus,
          successResponse,
          errorResponse
        })
      }
    >
      Add Endpoint
    </Button>
  );
};
