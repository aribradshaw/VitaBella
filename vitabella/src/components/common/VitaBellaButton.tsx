import React from "react";
import VitaBellaArrow from "@/components/common/VitaBellaArrow";

interface VitaBellaButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  // Only allow valid DOM props
  [key: string]: any;
}

const VitaBellaButton: React.FC<VitaBellaButtonProps> = ({
  href,
  onClick,
  children,
  style = {},
  className = "",
  ...props
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const commonStyles = {
    background: "var(--e-global-color-lightgreen)",
    color: "var(--e-global-color-dark-green)",
    fontFamily: "Switzer, Arial, Helvetica, sans-serif",
    fontWeight: 700,
    fontSize: "1.1rem",
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
    position: "relative" as const,
    cursor: "pointer",
    // CSS custom properties for arrow colors - can be overridden
    "--arrow-circle-color": "var(--e-global-color-dark-green)",
    "--arrow-path-color": "var(--e-global-color-green)",
    "--arrow-circle-hover-color": "var(--e-global-color-lightgreen)",
    "--arrow-path-hover-color": "var(--e-global-color-dark-green)",
    ...style,
  };

  if (onClick) {
    return (
      <button
        className={`vitabella-button ${className}`.trim()}
        style={commonStyles}
        onClick={handleClick}
        {...Object.fromEntries(Object.entries(props).filter(([k]) => k !== "borderRadius"))}
      >
        <span style={{ flex: 1, textAlign: "left", textDecoration: "none" }}>{children}</span>
        <VitaBellaArrow style={{ marginLeft: "0.7em", marginRight: "0.2em", width: 30, height: 30 }} />
      </button>
    );
  }

  return (
    <a
      href={href}
      className={`vitabella-button ${className}`.trim()}
      style={commonStyles}
      {...Object.fromEntries(Object.entries(props).filter(([k]) => k !== "borderRadius"))}
    >
      <span style={{ flex: 1, textAlign: "left", textDecoration: "none" }}>{children}</span>
      <VitaBellaArrow style={{ marginLeft: "0.7em", marginRight: "0.2em", width: 30, height: 30 }} />
    </a>
  );
};

export default VitaBellaButton;
