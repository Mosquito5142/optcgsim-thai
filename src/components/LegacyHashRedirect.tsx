"use client";

import { useEffect } from "react";
import { asset } from "@/lib/site";

/** The site used to be one long page. Old links like /#download-section now land on the matching new page. */
const MOVED: Record<string, string> = {
  "#download-section": "/optcgsim/#download-section",
  "#faq-section": "/optcgsim/#faq-section",
  "#oplay-section": "/oplaytcg/#install",
};

export default function LegacyHashRedirect() {
  useEffect(() => {
    const to = MOVED[window.location.hash];
    if (to) window.location.replace(asset(to));
  }, []);
  return null;
}
