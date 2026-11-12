import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Reeni template's SCSS (styles/scss) predates some Dart Sass
  // deprecations. Same settings the template ships with, minus "mixed-decls",
  // which current Dart Sass reports as obsolete.
  sassOptions: {
    quietDeps: true,
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default nextConfig;
