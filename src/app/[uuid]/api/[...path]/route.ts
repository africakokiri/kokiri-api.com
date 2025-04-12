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

  // ✅ 해당 endpoint가 없는 경우 (404 응답)
  if (error || !data) {
    return NextResponse.json(
      {
        code: 404,
        message: "해당 API endpoint를 찾을 수 없습니다.",
        error: error ?? "No matching endpoint"
      },
      { status: 404 }
    );
  }

  const forceError = req.nextUrl.searchParams.get("force") === "error";

  // ✅ 실패 응답
  if (forceError) {
    const errorDelay = parseInt(data.error_delay || "0");
    if (!isNaN(errorDelay) && errorDelay > 0) {
      await delay(errorDelay);
    }

    const errorStatus = parseInt(data.status_error) || 400;
    const errorMessage = data.message_error || "요청이 실패했습니다.";
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

  // ✅ 성공 응답
  const successDelay = parseInt(data.success_delay || "0");
  if (!isNaN(successDelay) && successDelay > 0) {
    await delay(successDelay);
  }

  const successStatus = parseInt(data.status_success) || 200;
  const successMessage =
    data.message_success || "요청이 성공적으로 수행되었습니다.";
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

// ✅ 각 HTTP 메서드에 연결
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
