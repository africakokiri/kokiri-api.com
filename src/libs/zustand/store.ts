import { type HTTP_METHODS } from "@/components/EndpointCreator/HttpMethod";
import { type FIELD_TYPES } from "@/components/EndpointCreator/ResponsiveFields";

import { create } from "zustand";

type HttpMethod = (typeof HTTP_METHODS)[number];
type FieldType = (typeof FIELD_TYPES)[number];
type ResponseType = "Object" | "Array" | "Primitive";

interface HttpStore {
  endpointPath: string;
  httpMethod: HttpMethod;

  setEndPointPath: (endpointPath: string) => void;
  setHttpMethod: (httpMethod: HttpMethod) => void;
}

export const useHttpStore = create<HttpStore>((set) => ({
  endpointPath: "",
  httpMethod: "GET",

  setEndPointPath: (endpointPath) =>
    set(() => ({
      endpointPath
    })),
  setHttpMethod: (httpMethod) =>
    set(() => ({
      httpMethod
    }))
}));

interface ResponseTypeStore {
  responseType: ResponseType;

  setResponseType: (responseType: ResponseType) => void;
}

export const useResponseTypeStore = create<ResponseTypeStore>((set) => ({
  responseType: "Object",

  setResponseType: (responseType) =>
    set(() => ({
      responseType
    }))
}));

interface ResponsiveFieldStore {
  fieldName: string;
  fieldType: FieldType;

  setFieldName: (fieldName: string) => void;
  setFieldType: (fieldType: FieldType) => void;
}

export const useResponsiveFieldStore = create<ResponsiveFieldStore>(
  (set) => ({
    fieldName: "",
    fieldType: "string",

    setFieldName: (fieldName) =>
      set(() => ({
        fieldName
      })),
    setFieldType: (fieldType) =>
      set(() => ({
        fieldType
      }))
  })
);
