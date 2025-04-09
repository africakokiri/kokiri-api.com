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

interface SuccessOrErrorStore {
  successStatus: string;
  errorStatus: string;

  setSuccessStatus: (successStatus: string) => void;
  setErrorStatus: (errorStatus: string) => void;
}

export const useSuccessOrErrorStore = create<SuccessOrErrorStore>(
  (set) => ({
    successStatus: "200",
    errorStatus: "400",

    setSuccessStatus: (successStatus) =>
      set(() => ({
        successStatus
      })),
    setErrorStatus: (errorStatus) =>
      set(() => ({
        errorStatus
      }))
  })
);

interface ResponseStore {
  successResponse: string;
  errorResponse: string;

  setSuccessResponse: (successResponse: string) => void;
  setErrorResponse: (errorResponse: string) => void;
}

// Response 전체
export const useResponseStore = create<ResponseStore>((set) => ({
  successResponse: '{\n  "data": {}\n}',
  errorResponse: '{\n  "error": "An error occurred"\n}',

  setSuccessResponse: (successResponse) =>
    set(() => ({
      successResponse
    })),

  setErrorResponse: (errorResponse) =>
    set(() => ({
      errorResponse
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
