import Image from "next/image";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

type LogoProps = {
  size?: number;
  showWordmark?: boolean;
  className?: string;
};

export function Logo({ size = 36, showWordmark = true, className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group flex items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <Image
        src="/branding/ma-logo.png"
        alt={showWordmark ? "" : SITE_NAME}
        width={size}
        height={size}
        priority
        className="rounded-[0.55rem] shadow-sm ring-1 ring-black/5 transition-transform duration-200 group-hover:scale-105"
      />
      {showWordmark && (
        <span className="text-sm font-semibold tracking-tight text-foreground">
          {SITE_NAME}
        </span>
      )}
    </Link>
  );
}
