"use client";

import { useAppInitializerStore } from "@/libs/zustand/store";

import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const AppInitializer = () => {
  const { setUserId } = useAppInitializerStore();

  useEffect(() => {
    const storedId = localStorage.getItem("userId");

    if (!storedId) {
      const newId = uuidv4();
      setUserId(newId);
      localStorage.setItem("userId", newId);
    } else {
      setUserId(storedId);
    }

    // eslint-disable-next-line
  }, []);

  return null;
};

export default AppInitializer;
