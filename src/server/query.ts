"use server";

import { prisma } from "@/libs/supabase/prisma";

export const getEndpoints = async (id: string) => {
  return await prisma.endpoints.findMany({
    where: { nanoid: id }
  });
};

export const addEndpoint = async (formData: FormData) => {
  await prisma.endpoints.create({
    data: {
      path: formData.get("endpoint-path")!.toString(),
      delay: Number(formData.get("delay")),
      status_code: Number(formData.get("http-status-code")),
      http_method: formData.get("http-methods")!.toString(),
      response: formData.get("response")!.toString(),
      nanoid: formData.get("nanoid")!.toString()
    }
  });
};

export const updateEndpoint = async (nanoid: string, oldPath: string, newPath: string) => {
  await prisma.endpoints.update({
    where: { nanoid, path: oldPath },
    data: { path: newPath.replace("/kokiri-api.com/api", "") }
  });
};

export const deleteEndpoint = async (nanoid: string, path: string) => {
  return await prisma.endpoints.delete({
    where: { nanoid, path }
  });
};
