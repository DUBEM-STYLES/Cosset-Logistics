import React from "react";

interface CossetLogoProps {
  className?: string;
  height?: string | number;
  textColor?: string; // override colors if needed
  showSub?: boolean;
}

export default function CossetLogo({
  className = "",
  height = "42px",
  textColor,
  showSub = true,
}: CossetLogoProps) {
  // Robustly parse height to set a corresponding explicit width, matching SVG 450:160 aspect ratio
  let style: React.CSSProperties = { height, width: "auto" };
  const strHeight = String(height);
  if (strHeight.endsWith("px") || !isNaN(Number(height))) {
    const numHeight = parseFloat(strHeight);
    if (!isNaN(numHeight)) {
      const numWidth = (numHeight * 450) / 160;
      style = { height: `${numHeight}px`, width: `${numWidth}px` };
    }
  } else if (strHeight.endsWith("rem")) {
    const numHeight = parseFloat(strHeight);
    if (!isNaN(numHeight)) {
      const numWidth = (numHeight * 450) / 160;
      style = { height: `${numHeight}rem`, width: `${numWidth}rem` };
    }
  } else if (strHeight.endsWith("em")) {
    const numHeight = parseFloat(strHeight);
    if (!isNaN(numHeight)) {
      const numWidth = (numHeight * 450) / 160;
      style = { height: `${numHeight}em`, width: `${numWidth}em` };
    }
  }

  return (
    <svg
      id="cosset-brand-logo"
      viewBox="0 0 450 160"
      className={`${className} transition-colors duration-300 shrink-0 select-none`}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Blue Rounded Background Box for "COSSET" */}
      <rect
        x="35"
        y="12"
        width="380"
        height="96"
        rx="16"
        className="fill-[#0D6EFD]"
      />

      {/* "COSSET" Slanted White Text */}
      <g transform="translate(225, 82) skewX(-14)">
        <text
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="76"
          fontWeight="900"
          fontFamily="'Sora', 'Arial Black', sans-serif"
          className="tracking-[-0.01em] select-none text-white font-extrabold"
        >
          COSSET
        </text>
      </g>

      {/* Subtitles (LOGISTICS with lateral bars) representing the official logo signature */}
      {showSub && (
        <>
          {/* Left underline bar */}
          <line
            x1="35"
            y1="138"
            x2="145"
            y2="138"
            strokeWidth="5"
            strokeLinecap="round"
            className={textColor || "stroke-[#0D6EFD] dark:stroke-white"}
          />

          {/* "LOGISTICS" spaced-out subtitle text */}
          <text
            x="225"
            y="144"
            textAnchor="middle"
            fontSize="18"
            fontWeight="900"
            fontFamily="'Sora', 'Arial Black', sans-serif"
            className={`${textColor || "fill-[#0D6EFD] dark:fill-white"} select-none font-bold uppercase`}
            style={{ letterSpacing: "11px" }}
          >
            LOGISTICS
          </text>

          {/* Right underline bar */}
          <line
            x1="305"
            y1="138"
            x2="415"
            y2="138"
            strokeWidth="5"
            strokeLinecap="round"
            className={textColor || "stroke-[#0D6EFD] dark:stroke-white"}
          />
        </>
      )}
    </svg>
  );
}
