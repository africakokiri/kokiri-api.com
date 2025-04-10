import { robotoMonoVar } from "@/styles/fonts";

export const Header = () => {
  return (
    <header
      className={`${robotoMonoVar.className} fixed w-1/2 space-y-4
font-light`}
    >
      <h1 className="text-4xl">REST API Mock Server</h1>
      <p>
        Create a mock REST API. Customize response data for success and
        error cases.
      </p>
    </header>
  );
};
