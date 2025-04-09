import { AddEndpointButton } from "@/components/EndpointCreatorAtoms/AddEndpointButton";
import { EndpointPath } from "@/components/EndpointCreatorAtoms/EndpointPath";
import { HttpMethod } from "@/components/EndpointCreatorAtoms/HttpMethod";
import { ResponseType } from "@/components/EndpointCreatorAtoms/ResponseType";
import { ResponsiveFields } from "@/components/EndpointCreatorAtoms/ResponsiveFields";

export const EndpointCreator = () => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <EndpointPath />
        <HttpMethod />
      </div>

      <ResponseType />
      <ResponsiveFields />

      <AddEndpointButton />
    </div>
  );
};
