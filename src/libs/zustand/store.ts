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
  status_success: string;
  status_error: string;

  setSuccessStatus: (status_success: string) => void;
  setErrorStatus: (status_error: string) => void;
}

// Success, error Status code
export const useStatusStore = create<StatusStore>((set) => ({
  status_success: "200",
  status_error: "400",

  setSuccessStatus: (status_success) =>
    set(() => ({
      status_success
    })),
  setErrorStatus: (status_error) =>
    set(() => ({
      status_error
    }))
}));

interface DelayStore {
  delay_success: string;
  delay_error: string;

  setSuccessDelay: (delay_success: string) => void;
  setErrorDelay: (delay_error: string) => void;
}

// Delay
export const useDelayStore = create<DelayStore>((set) => ({
  delay_success: "0",
  delay_error: "0",

  setSuccessDelay: (delay_success) =>
    set(() => ({
      delay_success
    })),
  setErrorDelay: (delay_error) =>
    set(() => ({
      delay_error
    }))
}));

interface ResponseStore {
  response_success: string;
  response_error: string;
  isResponsesValid: boolean;

  setSuccessResponse: (response_success: string) => void;
  setErrorResponse: (response_error: string) => void;
  setResponsesValidation: (response_success: string, response_error: string) => void;
}

// Response 전체
export const useResponseStore = create<ResponseStore>((set) => ({
  response_success: '{\n  "data": {}\n}',
  response_error: '{\n  "error": "An error occurred"\n}',
  isResponsesValid: true,

  setSuccessResponse: (response_success) =>
    set(() => ({
      response_success
    })),
  setErrorResponse: (response_error) =>
    set(() => ({
      response_error
    })),
  setResponsesValidation: (response_success, response_error) =>
    set(() => {
      let isValid = true;
      try {
        JSON.parse(response_success);
        JSON.parse(response_error);
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
