import { Label } from "@/components/ui/label";

export const Responses = ({ status }: { status: "Success" | "Error" }) => {
  return (
    <div>
      <Label>{`${status} Response (JSON)`}</Label>
    </div>
  );
};
