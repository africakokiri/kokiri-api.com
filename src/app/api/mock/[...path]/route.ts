import { type NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const userId = body.userId;

  // 이걸로 처리
  return Response.json({ message: `User ID: ${userId}` });
};
