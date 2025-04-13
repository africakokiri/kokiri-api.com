"use server";

import { createClient } from "@/libs/supabase/serverClient";
import { type Insert } from "@/types/endoints";

// DB에 엔드포인트 insert
export const insertEndpoint = async (uuid: string, fields: Insert) => {
  const supabase = await createClient();

  if (!uuid) throw new Error("UUID 없음");

  const { error } = await supabase.from("endpoints").insert({ ...fields, uuid });

  if (error) {
    throw new Error(`Supabase insert error: ${error.message}`);
  }
};

// DB에 endpointPath가 이미 존재하는지 여부 확인
export const checkEndpointExist = async (endpoint_path: string, http_method: string) => {
  const supabase = await createClient();

  if (!endpoint_path || !http_method) throw new Error("Endpoint path 또는 HTTP method 잘못됨");

  const { data: existing, error } = await supabase
    .from("endpoints")
    .select("id")
    .eq("endpoint_path", endpoint_path)
    .eq("http_method", http_method)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return !!existing;
};

// DB에 있는 endpointPath 삭제
export const deleteEndpoint = async (endpoint_path: string) => {
  const supabase = await createClient();

  if (!endpoint_path) {
    throw new Error("Endpoint path 잘못됨");
  }

  const { error } = await supabase
    .from("endpoints")
    .delete()
    .match({ endpoint_path: "/" + endpoint_path.split("/").slice(1).join("/") });

  if (error) throw new Error(error.message);
};

// DB에 있는 endpoints 불러오기
export const getEndpoints = async (uuid: string) => {
  const supabase = await createClient();

  if (!uuid) throw new Error("UUID 잘못됨");

  const { data, error } = await supabase.from("endpoints").select("*").eq("uuid", uuid);

  if (error) throw new Error(error.message);

  return data;
};

// DB에 해당 UUID가 존재하는지 확인
export const checkUuidExist = async (uuid: string) => {
  const supabase = await createClient();

  if (!uuid) throw new Error("uuid 잘못됨");

  const { data, error } = await supabase.from("endpoints").select("*").eq("uuid", uuid);

  if (error) throw new Error(error.message);

  return data.length > 0 ? true : false;
};
