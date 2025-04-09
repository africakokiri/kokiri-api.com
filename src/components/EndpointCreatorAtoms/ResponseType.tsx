import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export const ResponseType = () => {
  return (
    <div className="space-y-2">
      <Label htmlFor="response-type">Resopnse Type</Label>
      <Select>
        <SelectTrigger id="response-type">
          <SelectValue placeholder="Select response type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="object">Object</SelectItem>
          <SelectItem value="array">Array</SelectItem>
          <SelectItem value="primitive">Primitive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
