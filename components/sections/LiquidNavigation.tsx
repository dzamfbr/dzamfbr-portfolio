"use client";

import { useEffect, useRef, useState } from "react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "#home",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "About",
    href: "#about",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 21a8 8 0 0 0-16 0" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    label: "Projects",
    href: "#projects",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
      </svg>
    ),
  },
  {
    label: "Experience",
    href: "#experience",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l2.9 6.1 6.7 1-4.8 4.7 1.1 6.7L12 17.6 6.1 21.5l1.1-6.7L2.4 10.1l6.7-1L12 3z" />
      </svg>
    ),
  },
  {
    label: "Contact",
    href: "#contact",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
];

export default function LiquidNavigation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [pillStyle, setPillStyle] = useState({ width: 0, x: 0 });
  const navRef = useRef<HTMLElement>(null);
  const buttonRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  useEffect(() => {
    const activeButton = buttonRefs.current[activeIndex];

    if (!activeButton) {
      return;
    }

    setPillStyle({
      width: activeButton.offsetWidth,
      x: activeButton.offsetLeft,
    });
  }, [activeIndex]);

  useEffect(() => {
    const updatePill = () => {
      const activeButton = buttonRefs.current[activeIndex];

      if (!activeButton) {
        return;
      }

      setPillStyle({
        width: activeButton.offsetWidth,
        x: activeButton.offsetLeft,
      });
    };

    updatePill();
    window.addEventListener("resize", updatePill);

    return () => window.removeEventListener("resize", updatePill);
  }, [activeIndex]);

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
  }, [isDark]);

  return (
    <nav
      ref={navRef}
      className="liquid-nav"
      aria-label="Portfolio navigation"
      onMouseMove={(event) => {
        const rect = navRef.current?.getBoundingClientRect();

        if (!rect) {
          return;
        }

        navRef.current?.style.setProperty(
          "--x",
          `${event.clientX - rect.left}px`,
        );
        navRef.current?.style.setProperty(
          "--y",
          `${event.clientY - rect.top}px`,
        );
      }}
    >
      <div className="liquid-glare-container" aria-hidden="true">
        <div className="liquid-glare" />
      </div>

      <div className="nav-items">
        <span
          className="active-pill"
          style={{
            width: pillStyle.width,
            transform: `translateX(${pillStyle.x}px)`,
          }}
          aria-hidden="true"
        />

        {navItems.map((item, index) => (
          <a
            key={item.href}
            ref={(node) => {
              buttonRefs.current[index] = node;
            }}
            className={`nav-btn ${activeIndex === index ? "active" : ""}`}
            href={item.href}
            onClick={() => setActiveIndex(index)}
          >
            <span className="btn-content">
              {item.icon}
              <span>{item.label}</span>
            </span>
          </a>
        ))}
      </div>

      <span className="divider" aria-hidden="true" />

      <button
        className="theme-btn"
        type="button"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={isDark}
        onClick={() => setIsDark((current) => !current)}
      >
        <span className="theme-icon-wrapper">
          <svg className="sun" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          <svg className="moon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </span>
      </button>
    </nav>
  );
}
