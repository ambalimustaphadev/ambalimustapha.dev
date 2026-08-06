import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  children,
  as = "h2",
  className,
}: SectionHeadingProps) {
  const Heading = as;

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <span className="h-3.5 w-1 rounded-full bg-accent" aria-hidden="true" />
      <Heading className="text-sm font-medium uppercase tracking-wider text-foreground-secondary">
        {children}
      </Heading>
    </div>
  );
}
