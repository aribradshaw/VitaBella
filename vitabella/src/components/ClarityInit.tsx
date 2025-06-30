"use client";
import { useEffect } from "react";

export default function ClarityInit() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Microsoft Clarity tracking code with type-safe DOM manipulation
      const clarityKey = "clarity";
      if (!(clarityKey in window)) {
        (window as any)[clarityKey] = function() {
          ((window as any)[clarityKey].q = (window as any)[clarityKey].q || []).push(arguments);
        };
        const t = document.createElement("script");
        t.async = true;
        t.src = "https://www.clarity.ms/tag/s7s6am6m9w";
        const y = document.getElementsByTagName("script")[0];
        if (y && y.parentNode) {
          y.parentNode.insertBefore(t, y);
        }
      }
    }
  }, []);
  return null;
}