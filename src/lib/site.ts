import raw from "@/data/site-data.json";

export type Platform = "windows" | "android" | "ios";
export const PLATFORM_LABELS: Record<Platform, string> = { windows: "Windows", android: "Android", ios: "iOS" };

export type FileInfo = { name: string; bytes: number; size: string; sha256: string; date: string };
export type SiteData = {
  version: string;
  cards: number;
  uiLines: number;
  compare: { w: number; h: number }[];
  files: Partial<Record<"windows" | "androidReady" | "ios", FileInfo>>;
};

export const siteData = raw as SiteData;

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
/** Prefix a /public path with the GitHub Pages base path when there is one. */
export const asset = (path: string) => (path.startsWith("/") ? BASE + path : path);

export function detectPlatform(): Platform {
  const q = new URLSearchParams(window.location.search).get("p");
  if (q === "windows" || q === "android" || q === "ios") return q;
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("android")) return "android";
  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  return "windows";
}
