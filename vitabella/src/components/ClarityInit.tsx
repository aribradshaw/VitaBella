"use client";
import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

export default function ClarityInit() {
  useEffect(() => {
    Clarity.init("YOUR_CLARITY_PROJECT_ID");
  }, []);
  return null;
}