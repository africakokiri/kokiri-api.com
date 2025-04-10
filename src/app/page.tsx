import { AddEndpointButton } from "@/components/EndpointCreator/AddEndpointButton";
import { EndpointPath } from "@/components/EndpointCreator/EndpointPath";
import { HttpMethod } from "@/components/EndpointCreator/HttpMethod";
import { Responses } from "@/components/EndpointCreator/Responses";
import { SuccessOrErrorStatus } from "@/components/EndpointCreator/SuccessOrErrorStatus";
import { EndpointList } from "@/components/EndpointList";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export default function page() {
  return (
    <div className="w-screen space-y-8 p-8">
      {/* <Header /> */}

      {/* Contents */}
      <div className="relative *:w-[calc(50%-32px)]">
        <Card className="fixed">
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

              <div className="flex gap-4 *:w-full *:space-y-2">
                <SuccessOrErrorStatus status="Success" />
                <SuccessOrErrorStatus status="Error" />
              </div>

              <div className="space-y-4">
                <Responses status="Success" />
                <Responses status="Error" />
              </div>

              <AddEndpointButton />
            </div>
          </CardContent>
        </Card>

        <div className="absolute right-0 pb-8">
          <EndpointList />
        </div>
      </div>
    </div>
  );
}
