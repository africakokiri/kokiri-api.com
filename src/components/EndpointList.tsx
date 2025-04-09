import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export const EndpointList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Defined Endpoints
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6"></CardContent>
    </Card>
  );
};
