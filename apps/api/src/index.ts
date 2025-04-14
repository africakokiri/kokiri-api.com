import { Elysia } from "elysia";
import { createClient } from "@supabase/supabase-js";

// Status messages
const HTTP_STATUS_MESSAGES = {
  200: "OK",
  201: "Created",
  202: "Accepted",
  204: "No Content",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  408: "Request Timeout",
  409: "Conflict",
  422: "Unprocessable Entity",
  429: "Too Many Requests",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout"
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const createSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_ANON_KEY!;
  return createClient(supabaseUrl, supabaseKey);
};

const monitorMemoryUsage = async (
  method: string,
  path: string,
  handler: () => Promise<any>
) => {
  const startMemory = process.memoryUsage().heapUsed / 1024 / 1024;
  const startTime = performance.now();

  try {
    return await handler();
  } finally {
    const endMemory = process.memoryUsage().heapUsed / 1024 / 1024;
    const endTime = performance.now();

    console.log(
      `[${method}] ${path} - Memory: ${(endMemory - startMemory).toFixed(2)}MB, Time: ${(endTime - startTime).toFixed(2)}ms`
    );
  }
};

const handleRequest = async (
  method: string,
  uuid: string,
  pathArray: string[],
  forceError: boolean
) => {
  const supabase = createSupabaseClient();
  // 중요: 여기서 fullPath를 올바르게 구성합니다
  const fullPath = "/api/" + pathArray.join("/");

  console.log(
    `Querying DB with: uuid=${uuid}, path=${fullPath}, method=${method}`
  );

  const { data, error } = await supabase
    .from("endpoints")
    .select("*")
    .eq("uuid", uuid)
    .eq("endpoint_path", fullPath)
    .eq("http_method", method)
    .maybeSingle();

  if (error || !data) {
    console.log(`No matching endpoint found or error: ${error?.message}`);
    return {
      status: 404,
      body: {
        status: 404,
        message: HTTP_STATUS_MESSAGES[404],
        error: error?.message ?? "No matching endpoint"
      }
    };
  }

  console.log(`Found matching endpoint: ${JSON.stringify(data)}`);

  if (forceError) {
    if (Number(data.delay_error) > 0) await delay(Number(data.delay_error));
    const status = Number(data.status_error) || 400;
    const message = HTTP_STATUS_MESSAGES.hasOwnProperty(status)
      ? HTTP_STATUS_MESSAGES[status as keyof typeof HTTP_STATUS_MESSAGES]
      : "Error";

    const errorBody =
      typeof data.response_error === "string"
        ? JSON.parse(data.response_error)
        : (data.response_error ?? {});
    return {
      status,
      body: {
        ...errorBody,
        status,
        message
      }
    };
  }

  if (Number(data.delay_success) > 0) await delay(Number(data.delay_success));
  const status = Number(data.status_success) || 200;
  const message = HTTP_STATUS_MESSAGES.hasOwnProperty(status)
    ? HTTP_STATUS_MESSAGES[status as keyof typeof HTTP_STATUS_MESSAGES]
    : "Success";

  const successBody =
    typeof data.response_success === "string"
      ? JSON.parse(data.response_success)
      : (data.response_success ?? {});
  return {
    status,
    body: {
      ...successBody,
      status,
      message
    }
  };
};

const app = new Elysia().onError(({ code, error, set }) => {
  console.error(`Error: ${code}`, error);
  set.status = 500;
  return {
    status: 500,
    message: HTTP_STATUS_MESSAGES[500],
    error: error instanceof Error ? error.message : String(error)
  };
});

// 중요: 라우트 패턴을 /:uuid/api/* 로 변경합니다
const methods = ["get", "post", "put", "patch", "delete"] as const;

for (const method of methods) {
  app[method]("/:uuid/api/*", async ({ params, query, set }) => {
    const { uuid } = params;
    const path = params["*"]?.split("/") || [];
    const forceError = query.force === "error";

    console.log(
      `Received ${method.toUpperCase()} request: UUID=${uuid}, Path=${path.join("/")}`
    );

    return await monitorMemoryUsage(
      method.toUpperCase(),
      `/${uuid}/api/${path.join("/")}`,
      async () => {
        const result = await handleRequest(
          method.toUpperCase(),
          uuid,
          path,
          forceError
        );
        set.status = result.status;
        return result.body;
      }
    );
  });
}

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000; // 포트를 3001로 변경
app.listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
