import { createClient } from "@/libs/supabase/serverClient";

import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ uuid: string; path: string[] }> }
) {
  const params = await props.params;
  try {
    const supabase = await createClient();

    const uuid = params?.uuid;
    const pathArray = params?.path || [];
    const fullPath = "/api/" + pathArray.join("/");
    const method = "GET";

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
  } catch (err) {
    console.error("Error processing request:", err);
    return NextResponse.json(
      { message: "Internal server error", error: err },
      { status: 500 }
    );
  }
}
