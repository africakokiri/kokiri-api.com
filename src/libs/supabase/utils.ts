"use server";

import { createClient } from "@/libs/supabase/serverClient";
import { type Fields } from "@/libs/zustand/store";

// Supabaes에 엔드포인트 insert
export const insertEndpoint = async (userId: string, fields: Fields) => {
  try {
    const supabase = await createClient();

    if (!userId) throw new Error("nanoId 없음");

    const payload = {
      nanoid: userId,
      path: fields.endpointPath,
      method: fields.httpMethod,
      status_success: fields.successStatus,
      status_error: fields.errorStatus,
      response_success: fields.successResponse,
      response_error: fields.errorResponse
    };

    const { error } = await supabase.from("endpoints").insert(payload);

    console.error("Supabase insert error:", error);
    if (error) throw new Error(error.message);
  } catch (error) {
    console.error(error);
  }
};
