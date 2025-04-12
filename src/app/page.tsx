import { AddEndpointButton } from "@/components/EndpointCreator/AddEndpointButton";
import { CardHeader } from "@/components/EndpointCreator/CardHeader";
import { Delay } from "@/components/EndpointCreator/Delay";
import { EndpointPath } from "@/components/EndpointCreator/EndpointPath";
import { HttpMethod } from "@/components/EndpointCreator/HttpMethod";
import { Responses } from "@/components/EndpointCreator/Responses";
import { SuccessOrErrorStatus } from "@/components/EndpointCreator/SuccessOrErrorStatus";
import { EndpointList } from "@/components/EndpointList";
import { Header } from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";

export default function page() {
  return (
    <div className="flex w-screen justify-center p-8">
      <div className="w-[1500px] space-y-8">
        {/* <Header /> */}
        <Header />

        {/* Contents */}
        <div
          className="flex items-start gap-8 *:w-1/2 mobile:flex-col
mobile:*:w-full"
        >
          <Card>
            <CardHeader />
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4 *:w-full *:space-y-2">
                  <EndpointPath />
                  <HttpMethod />
                </div>

                <div className="flex gap-4 *:w-full">
                  <div
                    className="flex items-center gap-4 *:w-full
*:space-y-2"
                  >
                    <SuccessOrErrorStatus status="Success" />
                    <Delay status="Success" />
                  </div>
                  <div
                    className="flex items-center gap-4 *:w-full
*:space-y-2"
                  >
                    <SuccessOrErrorStatus status="Error" />
                    <Delay status="Error" />
                  </div>
                </div>

                <div className="space-y-4">
                  <Responses status="Success" />
                  <Responses status="Error" />
                </div>

                <AddEndpointButton />
              </div>
            </CardContent>
          </Card>

          <EndpointList />
        </div>
      </div>
    </div>
  );
}
