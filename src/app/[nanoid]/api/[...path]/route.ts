import { createClient } from "@/libs/supabase/serverClient";

import { type NextRequest, NextResponse } from "next/server";

// GET /nanoid/api/...
export async function GET(
  req: NextRequest,
  { params }: { params: { nanoid: string; path: string[] } }
) {
  const supabase = await createClient();

  const nanoid = params.nanoid;
  const path = "/api/" + params.path.join("/");
  const method = "GET";

  const { data, error } = await supabase
    .from("endpoints")
    .select("*")
    .eq("nanoid", nanoid)
    .eq("path", path)
    .eq("method", method)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json(
      {
        message: "API not found or error",
        error
      },
      { status: 404 }
    );
  }

  return NextResponse.json(JSON.parse(data.response_success), {
    status: data.status_success || 200
  });
}
