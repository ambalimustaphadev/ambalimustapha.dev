import Image from "next/image";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

/** MA mark + wordmark, in place of the template's Reeni logo image. */
export function SiteLogo({ preload = false }: { preload?: boolean }) {
  return (
    <Link href="/" className="ambali-logo" aria-label={`${SITE_NAME} — home`}>
      <Image
        className="ambali-logo__mark"
        src="/branding/ma-logo.png"
        alt=""
        width={40}
        height={40}
        preload={preload}
      />
      <span className="ambali-logo__name">{SITE_NAME}</span>
    </Link>
  );
}
