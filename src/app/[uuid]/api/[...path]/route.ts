import { createClient } from "@/libs/supabase/serverClient";

import { type NextRequest, NextResponse } from "next/server";

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

  if (error || !data) {
    return NextResponse.json(
      { message: "API not found or error", error },
      { status: 404 }
    );
  }

  return NextResponse.json(JSON.parse(data.response_success), {
    status: parseInt(data.status_success) || 200
  });
}

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
