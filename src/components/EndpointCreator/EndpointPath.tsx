"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useHttpStore } from "@/libs/zustand/store";

import { useEffect, useState } from "react";

export const EndpointPath = () => {
  const [pathStartWordAlert, setPathStartWordAlert] = useState(false);

  const { endpointPath, setEndPointPath } = useHttpStore();

  useEffect(() => {
    if (endpointPath && endpointPath[0] !== "/") {
      setPathStartWordAlert(true);
    } else {
      setPathStartWordAlert(false);
    }
  }, [endpointPath]);

  return (
    <div>
      <Label htmlFor="endpoint-path">Endpoint Path</Label>
      <Input
        placeholder="/api/data"
        id="endpoint-path"
        className="w-full"
        value={endpointPath}
        onChange={(e) => setEndPointPath(e.target.value)}
      />

      {pathStartWordAlert && (
        <p className="text-xs text-red-500">
          Path must start with / and not contain spaces
        </p>
      )}
    </div>
  );
};
