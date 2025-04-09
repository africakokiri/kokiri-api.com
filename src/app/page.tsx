import { EndpointCreator } from "@/components/EndpointCreator";
import { EndpointList } from "@/components/EndpointList";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";

export default function page() {
  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <Header />

      {/* Contents */}
      <div className="flex gap-8">
        <Card>
          <CardContent className="p-6">
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
