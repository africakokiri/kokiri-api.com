import { AlertCircle } from "lucide-react";

export const DisplayUUID = ({
  isUuidExist,
  userId
}: {
  isUuidExist: boolean;
  userId: string;
}) => {
  return (
    <>
      {!isUuidExist && (
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
              To prevent this, please make sure to save your UUID somewhere
              safe.
            </p>
            <p className="font-bold underline underline-offset-2">
              You’ll only see this message the first time you visit. It
              won’t appear again unless the UUID saved in your browser’s
              Local Storage has been deleted.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
