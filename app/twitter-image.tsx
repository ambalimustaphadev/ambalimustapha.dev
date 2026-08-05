import { generateOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function TwitterImage() {
  return generateOgImage();
}
