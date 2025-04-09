import { robotoMonoVar } from "@/styles/fonts";

export const Header = () => {
  return (
    <header>
      <h1 className={`${robotoMonoVar.className} text-4xl font-light`}>
        REST API Mock Server
      </h1>
    </header>
  );
};
