import { createClient } from "@/libs/supabase/serverClient";
import { monitorMemoryUsage } from "@/utils/monitorMemoryUsage";

import { type NextRequest, NextResponse } from "next/server";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Standard HTTP status messages
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

async function handleRequest(
  req: NextRequest,
  method: string,
  props: { params: Promise<{ uuid: string; path: string[] }> }
) {
  const params = await props.params;
  const supabase = await createClient();

  const uuid = params?.uuid;
  const pathArray = params?.path || [];
  const fullPath = "/api/" + pathArray.join("/");

  const { data, error } = await supabase
    .from("endpoints")
    .select("*")
    .eq("uuid", uuid)
    .eq("path", fullPath)
    .eq("method", method)
    .maybeSingle();

  // 🔴 Not Found
  if (error || !data) {
    return NextResponse.json(
      {
        status: 404,
        message: HTTP_STATUS_MESSAGES[404],
        error: error ?? "No matching endpoint"
      },
      { status: 404 }
    );
  }

  const forceError = req.nextUrl.searchParams.get("force") === "error";

  // 🔴 Error Response
  if (forceError) {
    const errorDelay = Number(data.delay_error || 0);
    if (errorDelay > 0) await delay(errorDelay);

    const errorStatus = Number(data.status_error) || 400;
    const errorMessage =
      HTTP_STATUS_MESSAGES[
        errorStatus as keyof typeof HTTP_STATUS_MESSAGES
      ] || "Error";
    const errorBody = data.response_error
      ? JSON.parse(data.response_error)
      : {};

    return NextResponse.json(
      {
        ...errorBody,
        status: errorStatus,
        message: errorMessage
      },
      { status: errorStatus }
    );
  }

  // ✅ Success Response
  const successDelay = Number(data.delay_success || 0);
  if (successDelay > 0) await delay(successDelay);

  const successStatus = Number(data.status_success) || 200;
  const successMessage =
    HTTP_STATUS_MESSAGES[
      successStatus as keyof typeof HTTP_STATUS_MESSAGES
    ] || "Success";
  const successBody = data.response_success
    ? JSON.parse(data.response_success)
    : {};

  return NextResponse.json(
    {
      ...successBody,
      status: successStatus,
      message: successMessage
    },
    { status: successStatus }
  );
}

// Export handlers
export async function GET(
  req: NextRequest,
  props: { params: Promise<{ uuid: string; path: string[] }> }
) {
  return await monitorMemoryUsage(
    "GET",
    req.nextUrl.pathname,
    async () => {
      return handleRequest(req, "GET", props);
    }
  );
}
export async function POST(
  req: NextRequest,
  props: { params: Promise<{ uuid: string; path: string[] }> }
) {
  return await monitorMemoryUsage(
    "POST",
    req.nextUrl.pathname,
    async () => {
      return handleRequest(req, "POST", props);
    }
  );
}
export async function PUT(
  req: NextRequest,
  props: { params: Promise<{ uuid: string; path: string[] }> }
) {
  return await monitorMemoryUsage(
    "PUT",
    req.nextUrl.pathname,
    async () => {
      return handleRequest(req, "PUT", props);
    }
  );
}
export async function PATCH(
  req: NextRequest,
  props: { params: Promise<{ uuid: string; path: string[] }> }
) {
  return await monitorMemoryUsage(
    "PATCH",
    req.nextUrl.pathname,
    async () => {
      return handleRequest(req, "PATCH", props);
    }
  );
}
export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ uuid: string; path: string[] }> }
) {
  return await monitorMemoryUsage(
    "DELETE",
    req.nextUrl.pathname,
    async () => {
      return handleRequest(req, "DELETE", props);
    }
  );
}
