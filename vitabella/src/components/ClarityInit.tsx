"use client";
import { useEffect } from "react";

export default function ClarityInit() {
  useEffect(() => {
    // Use the official Clarity NPM package for initialization
    // Only run on client
    if (typeof window !== "undefined") {
      // Dynamically import to avoid SSR issues
      import("@microsoft/clarity").then((Clarity) => {
        const clarityAny = Clarity as any;
        if (clarityAny && typeof clarityAny.init === "function") {
          clarityAny.init("s7s6am6m9w");
        }
      });
    }
  }, []);
  return null;
}