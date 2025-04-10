"use server";

import { createClient } from "@/libs/supabase/serverClient";
import { type Fields } from "@/libs/zustand/store";

// DB에 엔드포인트 insert
export const insertEndpoint = async (userId: string, fields: Fields) => {
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

  if (error) {
    throw new Error(`Supabase insert error: ${error.message}`);
  }
};

// DB에 endpointPath가 이미 존재하는지 여부 확인
export const checkIsEndpointExist = async (
  userId: string,
  endpointPath: string
) => {
  const supabase = await createClient();

  if (!endpointPath) throw new Error("endpointPath 잘못됨");

  const { data: existing, error } = await supabase
    .from("endpoints")
    .select("*")
    .eq("path", endpointPath)
    .eq("nanoid", userId)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return !!existing;
};
