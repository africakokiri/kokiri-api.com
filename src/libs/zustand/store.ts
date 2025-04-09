import { type HTTP_METHODS } from "@/components/EndpointCreator/HttpMethod";
import { type FIELD_TYPES } from "@/components/EndpointCreator/ResponseFields";

import { create } from "zustand";

type HttpMethod = (typeof HTTP_METHODS)[number];
type FieldType = (typeof FIELD_TYPES)[number];

interface HttpStore {
  endpointPath: string;
  httpMethod: HttpMethod;

  addEndPointPath: (endpointPath: string) => void;
  addHttpMethod: (httpMethod: HttpMethod) => void;
}

export const useHttpStore = create<HttpStore>((set) => ({
  endpointPath: "",
  httpMethod: "GET",
  addEndPointPath: (endpointPath) =>
    set(() => ({
      endpointPath
    })),
  addHttpMethod: (httpMethod) =>
    set(() => ({
      httpMethod
    }))
}));
