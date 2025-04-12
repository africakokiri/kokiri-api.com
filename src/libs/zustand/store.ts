import { type HttpMethods } from "@/components/EndpointCreator/HttpMethod";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UuidStore {
  userId: string;
  setUserId: (id: string) => void;
}

// UUID 발급
export const useUuidStore = create<UuidStore>((set) => ({
  userId: "",
  setUserId: (userId) => {
    localStorage.setItem("userId", userId);
    set({ userId });
  }
}));

interface HttpStore {
  endpointPath: string;
  httpMethod: HttpMethods;

  setEndPointPath: (endpointPath: string) => void;
  setHttpMethod: (httpMethod: HttpMethods) => void;
}

// Endpoint Path, HTTP Method
export const useHttpStore = create<HttpStore>((set) => ({
  endpointPath: "/api/",
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

// success, error status code
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

interface DelayStore {
  successDelay: string;
  errorDelay: string;

  setSuccessDelay: (successDelay: string) => void;
  setErrorDelay: (errorDelay: string) => void;
}

// Delay
export const useDelayStore = create<DelayStore>((set) => ({
  successDelay: "0",
  errorDelay: "0",

  setSuccessDelay: (successDelay) =>
    set(() => ({
      successDelay
    })),
  setErrorDelay: (errorDelay) =>
    set(() => ({
      errorDelay
    }))
}));

interface ResponseStore {
  successResponse: string;
  errorResponse: string;
  isResponsesValid: boolean;

  setSuccessResponse: (successResponse: string) => void;
  setErrorResponse: (errorResponse: string) => void;
  setResponsesValidation: (
    successResponse: string,
    errorResponse: string
  ) => void;
}

// Response 전체
export const useResponseStore = create<ResponseStore>((set) => ({
  successResponse: '{\n  "data": {}\n}',
  errorResponse: '{\n  "error": "An error occurred"\n}',
  isResponsesValid: true,

  setSuccessResponse: (successResponse) =>
    set(() => ({
      successResponse
    })),
  setErrorResponse: (errorResponse) =>
    set(() => ({
      errorResponse
    })),
  setResponsesValidation: (successResponse, errorResponse) =>
    set(() => {
      let isValid = true;
      try {
        JSON.parse(successResponse);
        JSON.parse(errorResponse);
      } catch {
        isValid = false;
      }
      return { isResponsesValid: isValid };
    })
}));

export type Fields = {
  endpointPath: string;
  httpMethod: HttpMethods;
  successStatus: string | number;
  errorStatus: string | number;
  successResponse: string;
  errorResponse: string;
  successDelay: string | number;
  errorDelay: string | number;
};

interface AddedEndpointsStore {
  endpoints: Fields[];

  addEndpoint: (field: Fields) => void;
  removeEndpoint: (endpointPath: string, httpMethod: string) => void;
}

// 엔드포인트 전체 관리
export const useEndpointStore = create<AddedEndpointsStore>()(
  persist(
    (set) => ({
      endpoints: [],
      addEndpoint: (field) =>
        set((state) => ({
          endpoints: [field, ...state.endpoints]
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
