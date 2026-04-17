import { prisma } from "@/libs/supabase/prisma";

import { NextRequest, NextResponse } from "next/server";

type Params = { params: Promise<{ nanoid: string; id: string }> };

async function handleRequest(req: NextRequest, { params }: Params) {
  const { nanoid, id } = await params;

  const endpoint = await prisma.endpoints.findFirst({
    where: { nanoid, path: id }
  });

  if (!endpoint) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (req.method !== endpoint.http_method) {
    return NextResponse.json(
      { error: `Method ${req.method} not allowed. Expected ${endpoint.http_method}` },
      { status: 405 }
    );
  }

  // delay 적용
  if (endpoint.delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, Number(endpoint.delay)));
  }

  return NextResponse.json(JSON.parse(endpoint.response as string), {
    status: Number(endpoint.status_code)
  });
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
