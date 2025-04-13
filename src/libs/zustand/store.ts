import { type HttpMethods } from "@/components/EndpointCreator/HttpMethod";
import { type Endpoints } from "@/types/endoints";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UuidStore {
  uuid: string;
  setUuid: (uuid: string) => void;
}

// UUID
export const useUuidStore = create<UuidStore>((set) => ({
  uuid: "",
  setUuid: (uuid) => {
    localStorage.setItem("uuid", uuid);

    set({ uuid });
  }
}));

interface HttpStore {
  endpoint_path: string;
  http_method: HttpMethods;

  setEndPointPath: (endpoint_path: string) => void;
  setHttpMethod: (http_method: HttpMethods) => void;
}

// Endpoint Path, HTTP Method
export const useHttpStore = create<HttpStore>((set) => ({
  endpoint_path: "",
  http_method: "GET",

  setEndPointPath: (endpoint_path) =>
    set(() => ({
      endpoint_path
    })),
  setHttpMethod: (http_method) =>
    set(() => ({
      http_method
    }))
}));

interface StatusStore {
  success_status: string;
  error_status: string;

  setSuccessStatus: (success_status: string) => void;
  setErrorStatus: (error_status: string) => void;
}

// Success, error Status code
export const useStatusStore = create<StatusStore>((set) => ({
  success_status: "200",
  error_status: "400",

  setSuccessStatus: (success_status) =>
    set(() => ({
      success_status
    })),
  setErrorStatus: (error_status) =>
    set(() => ({
      error_status
    }))
}));

interface DelayStore {
  success_delay: string;
  error_delay: string;

  setSuccessDelay: (success_delay: string) => void;
  setErrorDelay: (error_delay: string) => void;
}

// Delay
export const useDelayStore = create<DelayStore>((set) => ({
  success_delay: "0",
  error_delay: "0",

  setSuccessDelay: (success_delay) =>
    set(() => ({
      success_delay
    })),
  setErrorDelay: (error_delay) =>
    set(() => ({
      error_delay
    }))
}));

interface ResponseStore {
  success_response: string;
  error_response: string;
  isResponsesValid: boolean;

  setSuccessResponse: (success_response: string) => void;
  setErrorResponse: (error_response: string) => void;
  setResponsesValidation: (success_response: string, error_response: string) => void;
}

// Response 전체
export const useResponseStore = create<ResponseStore>((set) => ({
  success_response: '{\n  "data": {}\n}',
  error_response: '{\n  "error": "An error occurred"\n}',
  isResponsesValid: true,

  setSuccessResponse: (success_response) =>
    set(() => ({
      success_response
    })),
  setErrorResponse: (error_response) =>
    set(() => ({
      error_response
    })),
  setResponsesValidation: (success_response, error_response) =>
    set(() => {
      let isValid = true;
      try {
        JSON.parse(success_response);
        JSON.parse(error_response);
      } catch {
        isValid = false;
      }
      return { isResponsesValid: isValid };
    })
}));

interface EndpointStore {
  endpoints: Endpoints[];

  addEndpoint: (field: Endpoints) => void;
  removeEndpoint: (endpont_path: string, http_method: string) => void;
}

// localStorage에 추가된 엔드포인트
export const useEndpointStore = create<EndpointStore>()(
  persist(
    (set) => ({
      endpoints: [],
      addEndpoint: (field) =>
        set((state) => ({
          endpoints: [field, ...state.endpoints]
        })),
      removeEndpoint: (endpoint_path, http_method) =>
        set((state) => ({
          endpoints: state.endpoints.filter(
            (endpoint) =>
              endpoint.endpoint_path !== endpoint_path || endpoint.http_method !== http_method
          )
        }))
    }),
    {
      name: "endpoints"
    }
  )
);
