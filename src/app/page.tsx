import { Container } from "@/components/Container";
import { Define } from "@/components/Define";
import { Header } from "@/components/Header";

export default function page() {
  return (
    <div className="space-y-4 px-8 py-4">
      <header>
        <Header />
      </header>

      <main className="flex gap-8 *:w-1/2">
        <Container title="Define API Endpoints">
          <Define />
        </Container>
        <Container title="API Endpoints"></Container>
      </main>
    </div>
  );
}
