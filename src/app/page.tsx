import { AddEndpointButton } from "@/components/EndpointCreator/AddEndpointButton";
import { EndpointPath } from "@/components/EndpointCreator/EndpointPath";
import { HttpMethod } from "@/components/EndpointCreator/HttpMethod";
import { ResponsiveFields } from "@/components/EndpointCreator/ResponseFields";
import { ResponseType } from "@/components/EndpointCreator/ResponseType";
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
    <div className="w-screen space-y-8 p-8">
      {/* Header */}
      <Header />

      {/* Contents */}
      <div className="flex gap-8 *:w-1/2">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Define API Endpoints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4 *:w-full *:space-y-2">
                <EndpointPath />
                <HttpMethod />
              </div>

              <ResponseType />
              <ResponsiveFields />

              <AddEndpointButton />
            </div>
          </CardContent>
        </Card>

        <EndpointList />
      </div>
    </div>
  );
}
