"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { detectPlatform, type Platform } from "@/lib/site";

type Ctx = { platform: Platform; detected: Platform; setPlatform: (p: Platform) => void };
const PlatformCtx = createContext<Ctx>({ platform: "windows", detected: "windows", setPlatform: () => {} });

/** Detects the visitor's device once; the hero button and the download tabs share the chosen platform. */
export function PlatformProvider({ children }: { children: React.ReactNode }) {
  const [platform, setPlatform] = useState<Platform>("windows");
  const [detected, setDetected] = useState<Platform>("windows");

  useEffect(() => {
    const p = detectPlatform();
    setDetected(p);
    setPlatform(p);
  }, []);

  const value = useMemo(() => ({ platform, detected, setPlatform }), [platform, detected]);
  return <PlatformCtx.Provider value={value}>{children}</PlatformCtx.Provider>;
}

export const usePlatform = () => useContext(PlatformCtx);
