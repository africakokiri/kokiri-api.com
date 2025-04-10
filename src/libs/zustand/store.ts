import { type HttpMethods } from "@/components/EndpointCreator/HttpMethod";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppInitializerStore {
  userId: string;
  setUserId: (id: string) => void;
}

export const useAppInitializerStore = create<AppInitializerStore>(
  (set) => ({
    userId: "",
    setUserId: (id: string) => {
      set(() => ({ userId: id }));
      localStorage.setItem("userId", id);
    }
  })
);

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

export type Fields = {
  endpointPath: string;
  httpMethod: HttpMethods;
  successStatus: string;
  errorStatus: string;
  successResponse: string;
  errorResponse: string;
};

interface AddedEndpointsStore {
  endpoints: Fields[];

  addEndpoint: (field: Fields) => void;
  removeEndpoint: (endpointPath: string, httpMethod: string) => void;
}

export const useEndpointStore = create<AddedEndpointsStore>()(
  persist(
    (set) => ({
      endpoints: [],

      addEndpoint: (field) =>
        set((state) => ({
          endpoints: [...state.endpoints, field]
        })),

      removeEndpoint: (endpointPath, httpMethod) =>
        set((state) => ({
          endpoints: state.endpoints.filter(
            (endpoint) =>
              endpoint.endpointPath !== endpointPath ||
              endpoint.httpMethod !== httpMethod
          )
        }))
    }),
    {
      name: "endpoints"
    }
  )
);
