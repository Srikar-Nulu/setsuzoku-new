import { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — We Connect Ideas to Technology`,
    short_name: "Setsuzoku",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a4b78",
    icons: [
      {
        src: "/brand/setsuzoku-icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/setsuzoku-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
