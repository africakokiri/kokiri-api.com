"use client";

import { getEndpoints } from "@/server/query";

import { use } from "react";

export function Endpoints() {
  const test = use(getEndpoints(localStorage.getItem("id")));

  return <div></div>;
}
