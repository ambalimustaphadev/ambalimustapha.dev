import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_ROLE } from "@/lib/constants";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function generateOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a0a0a",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 20,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#818cf8",
            marginBottom: 28,
          }}
        >
          {SITE_ROLE}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 600,
            color: "#f5f5f5",
            letterSpacing: -2,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#a3a3a3",
            marginTop: 28,
            maxWidth: 820,
          }}
        >
          Building mobile applications and backend systems.
        </div>
      </div>
    ),
    { ...ogImageSize },
  );
}
