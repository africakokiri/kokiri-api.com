import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const EndpointPath = () => {
  return (
    <div>
      <Label htmlFor="endpoint-path">Endpoint Path</Label>
      <Input
        placeholder="/api/data"
        id="endpoint-path"
        className="w-full"
      />
    </div>
  );
};
