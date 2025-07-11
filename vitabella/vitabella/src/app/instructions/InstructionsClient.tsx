// InstructionsClient.tsx
"use client";

import React, { useState, useEffect } from "react";
import treatments from "@/constants/treatments.json";
import VitaBellaButton from "@/components/common/VitaBellaButton";
import "./instructions-images.css";

const INTRAMUSCULAR_VIDEO = "https://vimeo.com/1052403580/eadeb7630c";
const SUBCUTANEOUS_VIDEO = "https://vimeo.com/1052403321/94f3bfd7c1";
const INTRAMUSCULAR_PDF = "/products/PDF/Intramuscular-injection-instructions.pdf";
const SUBCUTANEOUS_PDF = "/products/PDF/Subcutaneous.pdf";

export default function InstructionsClient() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const query = params.keys().next().value;
      if (query) {
        const idx = treatments.findIndex(t => t.name.toLowerCase().includes(query.toLowerCase()));
        if (idx !== -1) {
          setSelected(idx);
          setSearch("");
        }
      }
    }
  }, []);

  const filtered = treatments.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );
  const treatment = filtered[selected] || filtered[0] || treatments[0];

  return (
    <div className="container" style={{ maxWidth: 1340, margin: "0 auto", padding: "2rem 0" }}>
      <h1 className="h1" style={{ textAlign: "center", marginBottom: 8 }}>INJECTION INSTRUCTIONS</h1>
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ maxWidth: 1340/2, margin: "0 auto" }}>
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
            <iframe
              src="https://player.vimeo.com/video/1052403606?h=e29c5b5f6c"
              title="Injection Instructions Overview"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0, borderRadius: 12 }}
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <label htmlFor="med-search" style={{ fontWeight: 600, fontSize: 18 }}>Choose Your Medication:</label>
        <input
          id="med-search"
          type="text"
          placeholder="Search medications..."
          value={search}
          onChange={e => { setSearch(e.target.value); setSelected(0); }}
          style={{ marginLeft: 12, padding: "0.4em 1em", borderRadius: 8, border: "1px solid #ccc", fontSize: 16, minWidth: 220 }}
        />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
        {filtered.map((t, i) => (
          <button
            key={t.name}
            className="vitabella-btn-learnmore"
            style={{
              minWidth: 180,
              border: i === selected ? "2px solid var(--e-global-color-dark-green)" : undefined,
              color: i === selected ? "#E6FFB2" : undefined,
              background: i === selected ? "var(--e-global-color-dark-green)" : undefined,
              fontWeight: 600,
              borderRadius: 16
            }}
            onClick={() => setSelected(i)}
          >
            {t.name}
          </button>
        ))}
        {filtered.length === 0 && <span style={{ color: "#888", fontSize: 16 }}>No medications found.</span>}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 32, marginBottom: 48 }}>
        {/* Left: Title + Video */}
        <div style={{ flex: 1, minWidth: 260, maxWidth: 1340/2 }}>
          <h2 className="h4" style={{ marginBottom: 12 }}>{treatment.name}</h2>
          {treatment.vimeo ? (
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: 10, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
              <iframe
                src={treatment.vimeo.replace("vimeo.com/", "player.vimeo.com/video/").replace(/\/(\w+)$/, "?h=$1")}
                title={treatment.name + " Video"}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0, borderRadius: 10 }}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
          ) : (
            <div style={{ minHeight: 220, display: "flex", alignItems: "center", justifyContent: "center", background: "#f7f7f7", borderRadius: 10, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", color: "#888", fontSize: 20, fontWeight: 500 }}>
              No video available
            </div>
          )}
        </div>
        {/* Right: Instructions + Links */}
        <div style={{ flex: 1, minWidth: 260, maxWidth: 1340/2, display: "flex", flexDirection: "column", gap: 18 }}>
          <h3 className="h6" style={{ marginBottom: 8 }}>Instructions</h3>
          <div className="body-text" style={{ marginBottom: 8 }}
            dangerouslySetInnerHTML={{ __html: treatment.instructions.replace(/\n\n/g, '<br/><br/>').replace(/\n/g, '<br/>') }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {treatment.links && treatment.links.map(link => {
              const isPdf = link.link.toLowerCase().endsWith('.pdf');
              const isExternal = /^https?:\/\//.test(link.link);
              const openInNewTab = isPdf || isExternal;
              return (
                <VitaBellaButton
                  key={link.name}
                  href={link.link}
                  label={link.name}
                  style={{ width: "100%", maxWidth: 540 }}
                  target={openInNewTab ? "_blank" : undefined}
                  rel={openInNewTab ? "noopener noreferrer" : undefined}
                />
              );
            })}
          </div>
        </div>
      </div>
      {/* Bottom: Injection Videos */}
      <div style={{ marginTop: 48, marginBottom: 32 }}>
        <h2 className="h4" style={{ textAlign: "center", marginBottom: 24 }}>Injection Technique Videos</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center" }}>
          <div id="intramuscular" style={{ flex: 1, minWidth: 260, maxWidth: 1340/2 }}>
            <h3 className="h6">Intramuscular Injection</h3>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: 10, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
              <iframe
                src="https://player.vimeo.com/video/1052403580?h=eadeb7630c"
                title="Intramuscular Injection Video"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0, borderRadius: 10 }}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
            <div style={{ marginTop: 10 }}>
              <VitaBellaButton 
                href={INTRAMUSCULAR_PDF} 
                label="Intramuscular Injection PDF Instructions"
                style={{ minWidth: 220, maxWidth: 600, width: "auto", display: "inline-block" }} 
                target="_blank" 
                rel="noopener noreferrer" 
              />
            </div>
          </div>
          <div id="subcutaneous" style={{ flex: 1, minWidth: 260, maxWidth: 1340/2 }}>
            <h3 className="h6">Subcutaneous Injection</h3>
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: 10, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
              <iframe
                src="https://player.vimeo.com/video/1052403321?h=94f3bfd7c1"
                title="Subcutaneous Injection Video"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0, borderRadius: 10 }}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
            <div style={{ marginTop: 10 }}>
              <VitaBellaButton 
                href={SUBCUTANEOUS_PDF} 
                label="Subcutaneous Injection PDF Instructions"
                style={{ minWidth: 220, maxWidth: 600, width: "auto", display: "inline-block" }} 
                target="_blank" 
                rel="noopener noreferrer" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
