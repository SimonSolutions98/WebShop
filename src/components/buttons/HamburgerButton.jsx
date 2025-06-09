import { forwardRef, useEffect, useState } from "react";

const HamburgerIcon = forwardRef(
  (
    {
      isOpen,
      onClick,
      className = "",
    },
    ref
  ) => {
    const [windowWidth, setWindowWidth] = useState(0);

    const fadeThreshold = 1500;

    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      handleResize(); // Set initial width
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const shouldFade = windowWidth <= fadeThreshold && isOpen;

    // Icon visual tuning
    const barHeight = 0.09;
    const barGap = 0.22;
    const barRadius = 0.03;
    const center = 0.5 - barHeight / 2;
    const offset = barGap + barHeight;

    return (
        <button
          className={`relative transition-opacity duration-250 transition-transform duration-200 hover:-translate-y-[2px]${className}`}
          ref={ref}
          onClick={onClick}
          aria-label="Toggle menu"
          style={{
            width: "1em",
            height: "1em",
            fontSize: "inherit",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
            opacity: shouldFade ? 0 : 1,
          }}
        >
          {/* Top bar */}
          <div
            className="absolute w-full bg-[var(--color-accent)] transition-all duration-300"
            style={{
              height: `${barHeight}em`,
              borderRadius: `${barRadius}em`,
              top: isOpen ? `${center}em` : `${center - offset}em`,
              transform: isOpen ? "rotate(45deg)" : "none",
              transformOrigin: "center",
            }}
          />
          {/* Middle bar */}
          <div
            className="absolute w-full bg-[var(--color-accent)] transition-all duration-300"
            style={{
              height: `${barHeight}em`,
              borderRadius: `${barRadius}em`,
              top: `${center}em`,
              opacity: isOpen ? 0 : 1,
            }}
          />
          {/* Bottom bar */}
          <div
            className="absolute w-full bg-[var(--color-accent)] transition-all duration-300"
            style={{
              height: `${barHeight}em`,
              borderRadius: `${barRadius}em`,
              top: isOpen ? `${center}em` : `${center + offset}em`,
              transform: isOpen ? "rotate(-45deg)" : "none",
              transformOrigin: "center",
            }}
          />
        </button>
    );
  }
);

export default HamburgerIcon;
