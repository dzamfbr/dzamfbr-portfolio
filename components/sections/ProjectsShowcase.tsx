"use client";

import Image from "next/image";
import { useMemo, useState, useEffect, useRef } from "react";
import {
  personalProjects,
  commercialProjects,
  Project,
} from "../../app/data/projects";

const TABS = [
  { id: "personal", label: "Personal Projects" },
  { id: "commercial", label: "Commercial Projects" },
];

function useSorted(items: Project[]) {
  return useMemo(
    () =>
      [...items].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
    [items],
  );
}

export default function ProjectsShowcase({
  selectedTab,
  onTabChange,
}: {
  selectedTab?: string;
  onTabChange?: (tab: string) => void;
}) {
  const [active, setActive] = useState(selectedTab ?? "personal");

  const personal = useSorted(personalProjects);
  const commercial = useSorted(commercialProjects);

  const activeList = active === "personal" ? personal : commercial;

  // animate-in logic: intersection observer + scroll direction tracking
  // Tab switch animation state
  const [contentAnim, setContentAnim] = useState<
    "idle" | "closing" | "opening"
  >("idle");
  const switchTimeout = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollYRef = useRef(0);
  const scrollDirectionRef = useRef<"down" | "up">("down");
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const updateDirection = () => {
      const currentY = window.scrollY;
      scrollDirectionRef.current =
        currentY > scrollYRef.current ? "down" : "up";
      scrollYRef.current = currentY;
    };

    updateDirection();
    window.addEventListener("scroll", updateDirection, { passive: true });
    return () => window.removeEventListener("scroll", updateDirection);
  }, []);

  useEffect(() => {
    if (selectedTab && selectedTab !== active) {
      setActive(selectedTab);
    }
  }, [selectedTab, active]);

  const handleTabClick = (id: string) => {
    if (id === active) return;
    setContentAnim("closing");
    if (switchTimeout.current) window.clearTimeout(switchTimeout.current);
    // slower timings: 360ms to close, 560ms to open
    switchTimeout.current = window.setTimeout(() => {
      setActive(id);
      onTabChange?.(id);
      setContentAnim("opening");
      if (switchTimeout.current) window.clearTimeout(switchTimeout.current);
      switchTimeout.current = window.setTimeout(
        () => setContentAnim("idle"),
        560,
      );
    }, 360);
  };

  useEffect(() => {
    return () => {
      if (switchTimeout.current) window.clearTimeout(switchTimeout.current);
    };
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          } else if (scrollDirectionRef.current === "up") {
            setInView(false);
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`projects-section ${inView ? "animate-in" : "animate-out"}`}
    >
      <div className="projects-container">
        <div className="projects-header">
          <h2>Projects</h2>
          <div
            className="projects-tabs"
            role="tablist"
            aria-label="Project categories"
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={active === t.id}
                className={`projects-tab ${active === t.id ? "is-active" : ""}`}
                onClick={() => handleTabClick(t.id)}
              >
                {t.label}
              </button>
            ))}
            <div
              className={`tab-underline ${active === "personal" ? "pos-personal" : "pos-commercial"}`}
              aria-hidden="true"
            />
          </div>
        </div>

        <div className={`projects-grid ${contentAnim}`}>
          {activeList.map((p) => (
            <article className="project-card" key={p.id}>
              <div className="project-media">
                {p.image ? (
                  // prefer using Image but fallback to img if needed
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={900}
                    height={500}
                    loading="eager"
                    className="project-image"
                  />
                ) : (
                  <div className="project-image project-image--placeholder">
                    No image
                  </div>
                )}
              </div>

              <div className="project-body">
                <div className="project-top">
                  <h3 className="project-title">{p.title}</h3>
                  {p.client ? (
                    <div className="project-badges">
                      <span className="client-badge">Client Work</span>
                    </div>
                  ) : null}
                </div>

                <p className="project-desc">{p.description}</p>

                <div className="project-actions">
                  {p.demo ? (
                    <a
                      className="project-live-link"
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                  ) : null}

                  {p.client ? (
                    <span className="client-pill">{p.client}</span>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
