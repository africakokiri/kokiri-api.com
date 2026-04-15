type ContainerProps = {
  children: React.ReactNode;
  title: string;
};

export function Container({ children, title }: ContainerProps) {
  return (
    <section className="h-full space-y-4 rounded-2xl border border-neutral-300 p-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}
