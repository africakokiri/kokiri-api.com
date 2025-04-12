import { createClient } from "@/libs/supabase/serverClient";

import { type NextRequest, NextResponse } from "next/server";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

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
        code: 404,
        message: "API endpoint not found.",
        error: error ?? "No matching endpoint"
      },
      { status: 404 }
    );
  }

  const forceError = req.nextUrl.searchParams.get("force") === "error";

  // 🔴 Error Response
  if (forceError) {
    const errorDelay = Number(data.error_delay || 0);
    if (errorDelay > 0) await delay(errorDelay);

    const errorStatus = Number(data.status_error) || 400;
    const errorMessage = data.message_error || "The request failed.";
    const errorBody = data.response_error
      ? JSON.parse(data.response_error)
      : {};

    return NextResponse.json(
      {
        ...errorBody,
        code: errorStatus,
        message: errorMessage
      },
      { status: errorStatus }
    );
  }

  // ✅ Success Response
  const successDelay = Number(data.success_delay || 0);
  if (successDelay > 0) await delay(successDelay);

  const successStatus = Number(data.status_success) || 200;
  const successMessage =
    data.message_success || "The request was successful.";
  const successBody = data.response_success
    ? JSON.parse(data.response_success)
    : {};

  return NextResponse.json(
    {
      ...successBody,
      code: successStatus,
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
  return handleRequest(req, "GET", props);
}
export async function POST(
  req: NextRequest,
  props: { params: Promise<{ uuid: string; path: string[] }> }
) {
  return handleRequest(req, "POST", props);
}
export async function PUT(
  req: NextRequest,
  props: { params: Promise<{ uuid: string; path: string[] }> }
) {
  return handleRequest(req, "PUT", props);
}
export async function PATCH(
  req: NextRequest,
  props: { params: Promise<{ uuid: string; path: string[] }> }
) {
  return handleRequest(req, "PATCH", props);
}
export async function DELETE(
  req: NextRequest,
  props: { params: Promise<{ uuid: string; path: string[] }> }
) {
  return handleRequest(req, "DELETE", props);
}
