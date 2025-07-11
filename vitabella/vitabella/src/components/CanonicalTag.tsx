"use client";
import { usePathname } from "next/navigation";

export default function CanonicalTag() {
  const pathname = usePathname();
  const canonicalUrl = `https://vitabellahealth.com${pathname === "/" ? "" : pathname}`;
  return <link rel="canonical" href={canonicalUrl} />;
}
