import { Container } from "@/components/Container";
import { Header } from "@/components/Header";

export default function page() {
  return (
    <div className="p-8">
      <header>
        <Header />
      </header>

      <main className="flex gap-8 *:w-1/2">
        <Container />
        <Container />
      </main>
    </div>
  );
}
