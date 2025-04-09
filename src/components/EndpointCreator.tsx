"use client";

import { EndpointPath } from "@/components/EndpointCreatorAtoms/EndpointPath";
import { HttpMethod } from "@/components/EndpointCreatorAtoms/HttpMethod";

export const EndpointCreator = () => {
  return (
    <div>
      <div className="flex gap-8">
        <EndpointPath />
        <HttpMethod />
      </div>
    </div>
  );
};
