import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Responses = ({ status }: { status: "Success" | "Error" }) => {
  return (
    <div>
      <Label>{`${status} Response (JSON)`}</Label>
      <Textarea />
    </div>
  );
};
