"use client";

import { useEffect, useState } from "react";

export const DisplayUUID = () => {
  const [isUuidExist, setIsUuidExist] = useState(true);

  useEffect(() => {
    const storedUuid = localStorage.getItem("userId");

    if (storedUuid) {
      setIsUuidExist(true);
    } else {
      setIsUuidExist(false);
    }
  }, []);

  useEffect(() => {
    console.log(isUuidExist);
  }, [isUuidExist]);

  return <div></div>;
};
