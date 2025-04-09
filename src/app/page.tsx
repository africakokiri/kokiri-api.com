import { EndpointCreator } from "@/components/EndpointCreator";
import { EndpointList } from "@/components/EndpointList";
import { Header } from "@/components/Header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export default function page() {
  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <Header />

      {/* Contents */}
      <div className="flex gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Define API Endpoints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <EndpointCreator />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <EndpointList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
