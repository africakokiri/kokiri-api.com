"use client";

import { DisplayUUID } from "@/components/EndpointCreator/DisplayUUID";
import {
  CardDescription,
  CardTitle,
  CardHeader as Header
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card";
import { useUuidStore } from "@/libs/zustand/store";

import { AlertCircle, HelpCircle } from "lucide-react";
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
        <CardTitle
          className="flex items-center gap-2 text-2xl font-semibold"
        >
          <p>Define API Endpoints</p>
          {isUuidExist && (
            <HoverCard>
              <HoverCardTrigger asChild>
                <HelpCircle className="text-red-500" />
              </HoverCardTrigger>
              <HoverCardContent
                className="absolute -left-32 w-[700px] text-red-500"
                asChild
              >
                <div
                  className="mt-2 flex items-center rounded-lg border
border-destructive/50 px-4 py-3 text-sm text-destructive
dark:border-destructive [&>svg]:text-destructive"
                >
                  <div className="space-y-1">
                    <p className="flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      Your UUID:{" "}
                      <span
                        className="font-bold underline underline-offset-2"
                      >
                        {userId}
                      </span>
                    </p>

                    <p>
                      This website stores your UUID in your browser&apos;s
                      local storage and uses it to load the endpoints you
                      have defined from the database.
                      <br />
                      Therefore, if the UUID is deleted from local storage,
                      you will no longer be able to access your endpoints.
                      <br />
                      To prevent this, please make sure to save your UUID
                      somewhere safe.
                    </p>
                    <p className="font-bold underline underline-offset-2">
                      You’ll only see this message the first time you
                      visit. It won’t appear again unless the UUID saved in
                      your browser’s Local Storage has been deleted.
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
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
