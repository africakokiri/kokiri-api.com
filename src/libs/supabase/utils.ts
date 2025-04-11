"use server";

import { createClient } from "@/libs/supabase/serverClient";
import { type Fields } from "@/libs/zustand/store";

// DB에 엔드포인트 insert
export const insertEndpoint = async (userId: string, fields: Fields) => {
  const supabase = await createClient();

  if (!userId) throw new Error("UUID 없음");

  const payload = {
    uuid: userId,
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
    .select("id")
    .eq("path", endpointPath)
    .eq("uuid", userId)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return !!existing;
};

// DB에 있는 endpointPath 삭제
export const deleteEndpoint = async (
  userId: string,
  endpointPath: string
) => {
  const supabase = await createClient();

  if (!userId || !endpointPath) {
    throw new Error("userID 또는 endpointPath 잘못됨");
  }

  const { error } = await supabase
    .from("endpoints")
    .delete()
    .match({ uuid: userId, path: endpointPath });

  if (error) throw new Error(error.message);
};

// DB에 있는 endpoints 불러오기
export const getEndpoints = async (userId: string) => {
  const supabase = await createClient();

  if (!userId) {
    throw new Error("userId 잘못됨");
  }

  const { data, error } = await supabase
    .from("endpoints")
    .select("id")
    .eq("uuid", userId);

  if (error) throw new Error(error.message);

  console.log(data);

  return data;
};
