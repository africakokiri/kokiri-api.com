import { type HttpMethods } from "@/components/EndpointCreator/HttpMethod";

import { create } from "zustand";

interface HttpStore {
  endpointPath: string;
  httpMethod: HttpMethods;

  setEndPointPath: (endpointPath: string) => void;
  setHttpMethod: (httpMethod: HttpMethods) => void;
}

// Endpoint Path, HTTP Method
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

interface ResponseStore {
  successResponse?: string[];
  errorResponse?: string[];

  addSuccessResponse: (successResponse: string) => void;
  addErrorResponsve: (errorResponse: string) => void;
}

// Response 전체
export const useResponseStore = create<ResponseStore>((set) => ({
  successResponse: [],
  errorResponse: [],

  addSuccessResponse: (successResponse) =>
    set((state) => ({
      successResponse: [...state.successResponse!, successResponse]
    })),
  addErrorResponsve: (errorResponse) =>
    set((state) => ({
      errorResponse: [...state.errorResponse!, errorResponse]
    }))
}));

type Fields = {
  endpointPath: string;
  httpMethod: HttpMethods;
};

interface AddedEndpointsStore {
  addedFields?: Fields[];

  addField: (field: Fields) => void;
}

// Define API Endpoints 전체
export const useFieldStore = create<AddedEndpointsStore>((set) => ({
  addedFields: [],

  addField: (field) =>
    set((state) => ({
      addedFields: [...state.addedFields!, field]
    }))
}));

interface EndpointStore {
  endpoints?: Fields[];

  addEndpoint: (endpoints: Fields) => void;
}

// Endpoints 전체
export const useEndpointStore = create<EndpointStore>((set) => ({
  endpoints: [],

  addEndpoint: (endpoints) =>
    set((state) => ({
      endpoints: [...state.endpoints!, endpoints]
    }))
}));
