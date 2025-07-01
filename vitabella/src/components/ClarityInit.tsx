"use client";
import { useEffect } from "react";

export default function ClarityInit() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // @ts-ignore: Clarity script injection uses dynamic properties and DOM
      (function(c,l,a,r,i,t,y){
        // @ts-ignore: Dynamic property assignment
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        // @ts-ignore: DOM manipulation
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        // @ts-ignore: DOM manipulation
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "s7s6am6m9w");
    }
  }, []);
  return null;
}