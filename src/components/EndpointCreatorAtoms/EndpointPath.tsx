import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const EndpointPath = () => {
  return (
    <div className="space-y-2">
      <Label htmlFor="endpoint-path">Endpoint Path</Label>
      <Input
        placeholder="[Your UUID]/api/..."
        id="endpoint-path"
        className="w-[250px]"
      />
    </div>
  );
};
