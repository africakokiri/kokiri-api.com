import { robotoMonoVar } from "@/styles/fonts";

export const Header = () => {
  return (
    <header className={`${robotoMonoVar.className} space-y-4 font-light`}>
      <div className="flex items-center gap-2 text-4xl">
        <h1>Kokiri API</h1>
        🐘
      </div>
      <p>
        Create a mock REST API. Customize response data for success and
        error cases.
      </p>
    </header>
  );
};
