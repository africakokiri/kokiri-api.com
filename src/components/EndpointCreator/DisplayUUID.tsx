"use client";

import { useUuidStore } from "@/libs/zustand/store";

import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const DisplayUUID = () => {
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

  useEffect(() => {
    console.log(isUuidExist);
  }, [isUuidExist]);

  return (
    <>
      {!isUuidExist && (
        <div>
          <div
            className="mt-2 flex items-center rounded-lg border
border-destructive/50 px-4 py-3 text-sm text-destructive
dark:border-destructive [&>svg]:text-destructive"
          >
            <div className="space-y-1">
              <p className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                Your UUID:{" "}
                <span className="font-bold underline underline-offset-2">
                  {userId}
                </span>
              </p>

              <p>
                This website stores your UUID in your browser&apos;s local
                storage and uses it to load the endpoints you have defined
                from the database.
                <br />
                Therefore, if the UUID is deleted from local storage, you
                will no longer be able to access your endpoints.
                <br />
                To prevent this, please make sure to save your UUID
                somewhere safe.
              </p>
              <p className="font-bold underline underline-offset-2">
                This message is only shown when you visit this page for the
                first time and will not appear again unless the UUID stored
                in Local Storage is deleted.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
