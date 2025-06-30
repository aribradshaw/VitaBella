"use client";

import React from "react";
import VitaBellaArrow from "@/components/common/VitaBellaArrow";

interface VitaBellaButtonProps {
  bg?: string;
  bgHover?: string;
  text?: string;
  textHover?: string;
  arrowCircleColor?: string;
  arrowCircleColorHover?: string;
  arrowPathColor?: string;
  arrowPathColorHover?: string;
  label: string;
  href: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  type?: "button" | "submit";
  [key: string]: any;
}

const VitaBellaButton: React.FC<VitaBellaButtonProps> = ({
  bg = "var(--e-global-color-lightgreen)",
  bgHover = "var(--e-global-color-dark-green)",
  text = "var(--e-global-color-dark-green)",
  textHover = "var(--e-global-color-lightgreen)",
  arrowCircleColor = "var(--e-global-color-dark-green)",
  arrowCircleColorHover = "var(--e-global-color-lightgreen)",
  arrowPathColor = "var(--e-global-color-lightgreen)",
  arrowPathColorHover = "var(--e-global-color-dark-green)",
  label,
  href,
  className = "",
  style = {},
  onClick,
  type,
  ...props
}) => {
  const [hover, setHover] = React.useState(false);

  const mergedStyle: React.CSSProperties = {
    background: hover ? bgHover : bg,
    color: hover ? textHover : text,
    fontFamily: "Switzer, Arial, Helvetica, sans-serif",
    fontWeight: 700,
    fontSize: "16px",
    border: "none",
    borderRadius: "2rem",
    padding: "0.4rem 0.4rem 0.4rem 1.4rem",
    minWidth: 180,
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1.2rem",
    boxShadow: "0 2px 8px rgba(44, 60, 50, 0.07)",
    transition: "background 0.18s, color 0.18s, box-shadow 0.18s",
    position: "relative",
    cursor: "pointer",
    ...style,
  } as React.CSSProperties;

  const customVars = {
    "--arrow-circle-color": hover ? arrowCircleColorHover : arrowCircleColor,
    "--arrow-path-color": hover ? arrowPathColorHover : arrowPathColor,
  } as React.CSSProperties;

  // Render as <button> for form actions, <a> for links
  if (type === "submit" || type === "button") {
    return (
      <button
        type={type}
        className={`vitabella-button${className ? " " + className : ""}`}
        style={{ ...mergedStyle, ...customVars }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onClick}
        {...props}
      >
        <span style={{ flex: 1, textAlign: "left", textDecoration: "none" }}>{label}</span>
        <VitaBellaArrow style={{ marginLeft: "0.7em", marginRight: "0.2em", width: 30, height: 30 }} />
      </button>
    );
  }

  return (
    <a
      href={href}
      className={`vitabella-button${className ? " " + className : ""}`}
      style={{ ...mergedStyle, ...customVars }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      {...props}
    >
      <span style={{ flex: 1, textAlign: "left", textDecoration: "none" }}>{label}</span>
      <VitaBellaArrow style={{ marginLeft: "0.7em", marginRight: "0.2em", width: 30, height: 30 }} />
    </a>
  );
};

export default VitaBellaButton;
