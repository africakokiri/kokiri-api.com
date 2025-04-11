"use client";

import { DisplayUUID } from "@/components/EndpointCreator/DisplayUUID";
import {
  CardDescription,
  CardTitle,
  CardHeader as Header
} from "@/components/ui/card";
import { useUuidStore } from "@/libs/zustand/store";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const CardHeader = () => {
  const [isUuidExist, setIsUuidExist] = useState(true);
  const { userId, setUserId } = useUuidStore();

  useEffect(() => {
    let storedUuid = localStorage.getItem("userId");

    if (!storedUuid) {
      storedUuid = uuidv4();
      localStorage.setItem("userId", storedUuid);
      setIsUuidExist(false);
    } else {
      setIsUuidExist(true);
    }

    setUserId(storedUuid);

    // eslint-disable-next-line
  }, []);

  if (userId) {
    return (
      <Header>
        <CardTitle className="text-2xl font-semibold">
          Define API Endpoints
        </CardTitle>
        <CardDescription>
          <DisplayUUID
            isUuidExist={isUuidExist}
            userId={userId}
          />
        </CardDescription>
      </Header>
    );
  }
};
