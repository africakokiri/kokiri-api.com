"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useHttpStore } from "@/libs/zustand/store";

export const EndpointPath = () => {
  const { setEndPointPath } = useHttpStore();

  return (
    <div>
      <Label htmlFor="endpoint-path">Endpoint Path</Label>
      <Input
        placeholder="/api/data"
        id="endpoint-path"
        className="w-full"
        onChange={(e) => setEndPointPath(e.target.value)}
      />
    </div>
  );
};
