"use client";

import { useAppInitializerStore } from "@/libs/zustand/store";

import { nanoid } from "nanoid";
import { useEffect } from "react";

const AppInitializer = () => {
  const { setUserId } = useAppInitializerStore();

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (!storedId) {
      const newId = nanoid();
      setUserId(newId);
    } else {
      setUserId(storedId);
    }

    // eslint-disable-next-line
  }, []);

  return null;
};

export default AppInitializer;
