"use server";

import { prisma } from "@/libs/supabase/prisma";

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

export const getEndpoints = async (nanoid: string) => {
  return await prisma.endpoints.findFirst({
    where: { nanoid }
  });
};

// export const updateEndpoint = async (id: string, path: string) => {
//   return await prisma.endpoints.update({
//     where: { id },
//     data: { path }
//   });
// };

// export const deleteEndpoint = async (id: string) => {
//   return await prisma.endpoints.delete({
//     where: { id }
//   });
// };
