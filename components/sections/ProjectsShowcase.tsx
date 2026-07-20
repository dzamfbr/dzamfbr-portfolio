"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useEffect, useRef, useState } from "react";
import {
  personalProjects,
  commercialProjects,
  Project,
} from "../../app/data/projects";

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

type ProjectCategory = "all" | "personal" | "commercial";

export default function ProjectsShowcase({
  showAll = false,
  category = "all",
}: {
  showAll?: boolean;
  category?: ProjectCategory;
}) {
  const personal = useSorted(personalProjects);
  const commercial = useSorted(commercialProjects);
  const [activeTab, setActiveTab] = useState<"personal" | "commercial">(
    "personal",
  );
  const [contentAnim, setContentAnim] = useState<
    "idle" | "closing" | "opening"
  >("idle");

  const personalList = showAll ? personal : personal.slice(0, 4);
  const commercialList = showAll ? commercial : commercial.slice(0, 4);
  const showReviewButton = !showAll && personal.length + commercial.length > 4;
  const isHomepageView = category === "all";
  const reviewHref = isHomepageView
    ? activeTab === "commercial"
      ? "/projects/commercial"
      : "/projects/personal"
    : "/projects";
  const shouldShowPersonal = category === "all" || category === "personal";
  const shouldShowCommercial = category === "all" || category === "commercial";
  const shouldShowPersonalGroup = isHomepageView
    ? activeTab === "personal"
    : shouldShowPersonal;
  const shouldShowCommercialGroup = isHomepageView
    ? activeTab === "commercial"
    : shouldShowCommercial;
  const headerTitle =
    category === "personal"
      ? "Personal Projects"
      : category === "commercial"
        ? "Commercial Projects"
        : "Projects";

  // animate-in logic: intersection observer + scroll direction tracking
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

  const handleTabChange = (tab: "personal" | "commercial") => {
    if (tab === activeTab) return;
    setContentAnim("closing");
    window.setTimeout(() => {
      setActiveTab(tab);
      setContentAnim("opening");
      window.setTimeout(() => setContentAnim("idle"), 420);
    }, 180);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`projects-section ${inView ? "animate-in" : "animate-out"}`}
    >
      <div className="projects-container">
        <div className="projects-header">
          <h2>{headerTitle}</h2>

          {isHomepageView ? (
            <div
              className="project-tabs"
              role="tablist"
              aria-label="Project categories"
            >
              <button
                type="button"
                className={`project-tab ${activeTab === "personal" ? "active" : ""}`}
                onClick={() => handleTabChange("personal")}
              >
                Personal
              </button>
              <button
                type="button"
                className={`project-tab ${activeTab === "commercial" ? "active" : ""}`}
                onClick={() => handleTabChange("commercial")}
              >
                Commercial
              </button>
            </div>
          ) : null}
        </div>

        {shouldShowPersonalGroup ? (
          <div className="project-group">
            <div className={`projects-grid ${contentAnim}`}>
              {personalList.map((p) => (
                <article className="project-card" key={p.id}>
                  <div className="project-media">
                    {p.image ? (
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

                    <div className="project-date">
                      {new Date(p.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        {shouldShowCommercialGroup ? (
          <div className="project-group">
            <div className={`projects-grid ${contentAnim}`}>
              {commercialList.map((p) => (
                <article className="project-card" key={p.id}>
                  <div className="project-media">
                    {p.image ? (
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

                    <div className="project-date">
                      {new Date(p.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        {showReviewButton ? (
          <div className="projects-footer">
            <Link href={reviewHref} className="project-review-link">
              Review the entire project
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
