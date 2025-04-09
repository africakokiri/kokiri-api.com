"use client";

import { EndpointPath } from "@/components/EndpointCreatorAtoms/EndpointPath";
import { HttpMethod } from "@/components/EndpointCreatorAtoms/HttpMethod";
import { ResponseType } from "@/components/EndpointCreatorAtoms/ResponseType";

export const EndpointCreator = () => {
  return (
    <div className="space-y-4">
      <div className="flex gap-8">
        <EndpointPath />
        <HttpMethod />
      </div>

      <div>
        <ResponseType />
      </div>
    </div>
  );
};
