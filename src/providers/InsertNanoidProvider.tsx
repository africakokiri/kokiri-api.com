"use client";

import { nanoid } from "nanoid";
import { useEffect } from "react";

export function InsertNanoidProvider() {
  useEffect(() => {
    const currentId = localStorage.getItem("id");

    if (!currentId) localStorage.setItem("id", nanoid());
  }, []);

  return null;
}
