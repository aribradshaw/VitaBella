import React from "react";
import VitaBellaArrow from "@/components/common/VitaBellaArrow";
import VitaBellaButton from "@/components/common/VitaBellaButton";

const StopWaitingModule: React.FC = () => (
  <section
    style={{
      background: "var(--e-global-color-dark-green)",
      borderRadius: "var(--border-radius)",
      padding: "var(--space-4x) 0",
      margin: "var(--space-2x) 0",
      width: "100%",
      maxWidth: 1340, // changed from 1200 to 1340
      marginLeft: "auto",
      marginRight: "auto",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {/* Background pattern overlay */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        backgroundImage: "url(/modules/logotile.webp)",
        backgroundRepeat: "repeat",
        backgroundSize: "auto", // tile at actual size
        opacity: 1, // full opacity
      }}
      aria-hidden="true"
    />
    <div style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        style={{
          textAlign: "center",
          marginBottom: "var(--space-1x)", // reduced from var(--space-2x)
        }}
      >
        <div
          style={{
            fontFamily: "Tusker Grotesk, Arial, Helvetica, sans-serif",
            fontWeight: 700,
            fontSize: 44,
            color: "var(--e-global-color-off-white)",
            textTransform: "uppercase",
            letterSpacing: 0,
            lineHeight: 1.1,
            marginBottom: 2, // add a little space between lines
          }}
        >
          STOP WAITING
        </div>
        <div
          style={{
            fontFamily: "Tusker Grotesk, Arial, Helvetica, sans-serif",
            fontWeight: 700,
            fontSize: 44,
            color: "var(--e-global-color-lightgreen)",
            textTransform: "uppercase",
            letterSpacing: 0,
            lineHeight: 1.1,
            marginBottom: 8, // add a little space before subtext
          }}
        >
          START OPTIMIZING
        </div>
        <div
          style={{
            fontFamily: "Switzer, Arial, Helvetica, sans-serif",
            fontWeight: 400,
            fontSize: 15,
            color: "var(--e-global-color-off-white)",
            marginTop: 6, // reduced from 12
            marginBottom: 0,
          }}
        >
          More treatments, better care, no hidden costs.
        </div>
      </div>
      <VitaBellaButton
        label="Start Your Journey"
        href="/membership"
        bg="var(--e-global-color-green)"
        bgHover="var(--e-global-color-white)"
        text="var(--e-global-color-dark-green)"
        textHover="var(--e-global-color-dark-green)"
        arrowCircleColor="var(--e-global-color-dark-green)"
        arrowCircleColorHover="var(--e-global-color-dark-green)"
        arrowPathColor="var(--e-global-color-green)"
        arrowPathColorHover="var(--e-global-color-white)"
        style={{ marginTop: "var(--space-1x)", fontSize: 16, borderRadius: 24 }}
      />
    </div>
  </section>
);

export default StopWaitingModule;
