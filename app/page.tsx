"use client";

import { useEffect, useRef, useState } from "react";
import ContactForm from "../components/sections/ContactForm";
import LiquidNavigation from "../components/sections/LiquidNavigation";
import ProjectsShowcase from "../components/sections/ProjectsShowcase";

export default function Home() {
  const marqueeItems = [
    ["devicon-html5-plain", "HTML"],
    ["devicon-css3-plain", "CSS"],
    ["devicon-javascript-plain", "JavaScript"],
    ["devicon-typescript-plain", "TypeScript"],
    ["devicon-nextjs-plain", "Next.js"],
    ["devicon-tailwindcss-plain", "Tailwind CSS"],
    ["devicon-nodejs-plain", "Node.js"],
    ["devicon-python-plain", "Python"],
    ["devicon-csharp-plain", "C#"],
    ["devicon-mysql-plain", "MySQL"],
    ["devicon-git-plain", "Git"],
    ["devicon-github-original", "GitHub"],
    ["devicon-vercel-original", "Vercel"],
    ["devicon-figma-plain", "Figma"],
  ];
  const aboutRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const scrollYRef = useRef(0);
  const scrollDirectionRef = useRef<"down" | "up">("down");
  const [aboutInView, setAboutInView] = useState(false);
  const [experienceInView, setExperienceInView] = useState(false);
  const [emailTooltipOpen, setEmailTooltipOpen] = useState(false);
  const [projectsTab, setProjectsTab] = useState("personal");

  const handleViewProjects = (tab: string, e?: any) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    setProjectsTab(tab);
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    const updateDirection = () => {
      const currentY = window.scrollY;
      scrollDirectionRef.current =
        currentY > scrollYRef.current ? "down" : "up";
      scrollYRef.current = currentY;
    };

    updateDirection();
    window.addEventListener("scroll", updateDirection, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateDirection);
    };
  }, []);

  useEffect(() => {
    const node = aboutRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAboutInView(true);
          } else if (scrollDirectionRef.current === "up") {
            setAboutInView(false);
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const node = experienceRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setExperienceInView(true);
          } else if (scrollDirectionRef.current === "up") {
            setExperienceInView(false);
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className="portfolio-shell">
      <div className="bg-mesh" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <LiquidNavigation />

      <section id="home" className="hero-grid" aria-labelledby="hero-title">
        {/* Left Column: Brand Logo, Stacked Name, Social Links */}
        <div className="hero-col-left">
          <div className="hero-name-container">
            <h1 id="hero-title" className="hero-stacked-name">
              Portofolio
              <br />
              Dzamfbr.
            </h1>
            <div className="hero-name-underline" aria-hidden="true" />
          </div>

          <div className="hero-socials">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/dzamfbr/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* Email */}
            <a
              href="mailto:dimasazzam05@gmail.com"
              className={`hero-social-link hero-social-link--email ${emailTooltipOpen ? "is-active" : ""}`}
              aria-label="Email"
              onClick={() => setEmailTooltipOpen(true)}
              onBlur={() => setEmailTooltipOpen(false)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="m22 6-10 7L2 6" />
              </svg>
              <span className="social-email-tooltip">
                dimasazzam05@gmail.com
              </span>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@rayoonn_5"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="YouTube"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/dzamfbr"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-social-link"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column: Introduction Info */}
        <div className="hero-col-right">
          <p className="hero-intro-kicker">— Introduction</p>
          <h2 className="hero-headline">
            IT Programmer and Developer, based in Indonesia.
          </h2>
          <p className="hero-description">
            Portofolio ini menampilkan berbagai proyek, karya, dan pengalaman
            saya dalam belajar serta mengembangkan teknologi.
          </p>
          <a href="#about" className="hero-cta-link">
            Lihat Aku ➔
          </a>
        </div>
      </section>

      <section className="marquee-wrap" aria-label="Technology highlights">
        <div className="marquee-track" aria-hidden="true">
          {/** Render sequence twice for seamless looping. Add a gap between sequences. */}
          {marqueeItems.map(([icon, label], i) => (
            <span className="marquee-item" key={`a-${i}`}>
              <i className={`${icon} marquee-icon`} aria-hidden="true" />
              {label}
            </span>
          ))}
          <span className="marquee-gap" aria-hidden="true" />
          {marqueeItems.map(([icon, label], i) => (
            <span className="marquee-item" key={`b-${i}`}>
              <i className={`${icon} marquee-icon`} aria-hidden="true" />
              {label}
            </span>
          ))}
          <span className="marquee-gap" aria-hidden="true" />
        </div>
      </section>

      {/* About Me Section */}
      <section
        id="about"
        ref={aboutRef}
        className={`about-grid ${aboutInView ? "animate-in" : "animate-out"}`}
        aria-labelledby="about-heading"
      >
        {/* Left Column: Title & Description */}
        <div className="about-col-left">
          <p className="about-subtitle">Get to Know Me</p>
          <h2 id="about-heading" className="about-title">
            About Me
          </h2>
          <div className="about-description">
            <p>
              Perkenalkan saya <strong>Dimas Azzam</strong>, siswa di{" "}
              <strong>SMK Negeri 1 Jakarta</strong> yang berfokus pada{" "}
              <strong>Software Development</strong> dan{" "}
              <strong>Web Development</strong>. Saya memiliki ketertarikan dalam
              membangun aplikasi dan website modern yang mengutamakan performa,
              fungsionalitas, serta pengalaman pengguna yang optimal.
            </p>
            <p>
              Saya terus mengeksplorasi teknologi baru melalui berbagai proyek
              pribadi, mulai dari pengembangan website hingga desain antarmuka.
              Setiap proyek menjadi kesempatan untuk meningkatkan kemampuan,
              memperluas wawasan, dan menciptakan solusi digital yang lebih
              baik.
            </p>
          </div>
        </div>

        {/* Center Column: Glassmorphism Stat Card */}
        <div className="about-col-center">
          <div className="about-card">
            <div className="about-card-icon-wrapper" aria-hidden="true">
              <span className="code-icon">
                &lt;/&gt;<span className="cursor"></span>
              </span>
            </div>

            <div className="about-card-stat">
              <span className="about-card-number">1</span>
              <span className="about-card-stat-title">Personal Projects</span>
              <p className="about-card-stat-desc">
                Website, aplikasi, dan berbagai proyek pembelajaran yang saya
                kerjakan untuk mengembangkan kemampuan di bidang Software
                Development dan Web Development.
              </p>
              <a
                href="#projects"
                className="about-card-link"
                onClick={(e) => handleViewProjects("personal", e)}
              >
                View Projects
              </a>
            </div>

            <div className="about-card-stat about-card-stat--secondary">
              <span className="about-card-number">0</span>
              <span className="about-card-stat-title">Commercial Projects</span>
              <p className="about-card-stat-desc">
                Proyek yang dikembangkan untuk kebutuhan nyata, baik untuk klien
                maupun penggunaan langsung, dengan fokus pada kualitas,
                performa, dan kepuasan pengguna.
              </p>
              <a
                href="#projects"
                className="about-card-link"
                onClick={(e) => handleViewProjects("commercial", e)}
              >
                View Projects
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Avatar & Highlights */}
        <div className="about-col-right">
          <div className="about-avatar-container" />

          <div className="about-highlights">
            {/* Highlight 1 */}
            <div className="highlight-item">
              <div className="sparkle-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 7.2 7.2 2.4-7.2 2.4-2.4 7.2-2.4-7.2-7.2-2.4 7.2-2.4z" />
                </svg>
              </div>
              <div className="highlight-content">
                <h3 className="highlight-title">Software Development</h3>
                <p className="highlight-desc">
                  Mengembangkan website dan aplikasi dengan fokus pada performa,
                  fungsionalitas, serta pengalaman pengguna yang nyaman.
                </p>
              </div>
            </div>

            {/* Highlight 2 */}
            <div className="highlight-item">
              <div className="sparkle-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 7.2 7.2 2.4-7.2 2.4-2.4 7.2-2.4-7.2-7.2-2.4 7.2-2.4z" />
                </svg>
              </div>
              <div className="highlight-content">
                <h3 className="highlight-title">Clean Code</h3>
                <p className="highlight-desc">
                  Mengutamakan kode yang rapi, mudah dipahami, dan mudah
                  dikembangkan agar setiap proyek lebih terstruktur dan
                  berkualitas.
                </p>
              </div>
            </div>

            {/* Highlight 3 */}
            <div className="highlight-item">
              <div className="sparkle-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 7.2 7.2 2.4-7.2 2.4-2.4 7.2-2.4-7.2-7.2-2.4 7.2-2.4z" />
                </svg>
              </div>
              <div className="highlight-content">
                <h3 className="highlight-title">Always Learning</h3>
                <p className="highlight-desc">
                  Terus mempelajari teknologi baru melalui proyek pribadi,
                  pembelajaran di sekolah, dan eksplorasi mandiri untuk
                  meningkatkan kemampuan setiap hari.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section (replaced with new showcase) */}
      <ProjectsShowcase
        selectedTab={projectsTab}
        onTabChange={setProjectsTab}
      />

      <section
        id="experience"
        ref={experienceRef}
        className={`experience-section ${experienceInView ? "animate-in" : "animate-out"}`}
        aria-labelledby="experience-heading"
      >
        <h2 id="experience-heading" className="section-label">
          — Experience
        </h2>

        <div className="exp-grid">
          <div className="exp-timeline">
            <article className="exp-item">
              <div className="exp-year">2025 — Present</div>
              <div className="exp-role">
                Student of Software Engineering (SIJA)
              </div>
              <div className="exp-company">SMKN 1 Jakarta</div>
              <p className="exp-desc">
                Mempelajari sistem informasi, jaringan komputer, serta
                pengembangan aplikasi. Aktif mengembangkan proyek web
                menggunakan HTML, CSS, JavaScript, dan Next.js sambil
                memperdalam dasar-dasar jaringan dan administrasi sistem.
              </p>
            </article>
          </div>

          <div className="exp-right">
            <div className="exp-big-text">
              Turning ideas
              <br />
              into <em>reality.</em>
            </div>
            <ul className="awards-list">
              <li className="award-item">
                <div>
                  <div className="award-name">
                    UI/UX Competition Participant
                  </div>
                  <div className="award-org">
                    FIND IT! Competition — Universitas Gadjah Mada
                  </div>
                </div>
                <div className="award-year">2026</div>
              </li>
              <li className="award-item">
                <div>
                  <div className="award-name">
                    Game Development Learning Program
                  </div>
                  <div className="award-org">
                    Certificate of Participation — Politeknik Negeri Media
                    Kreatif
                  </div>
                </div>
                <div className="award-year">2026</div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-inner">
          <div className="contact-left">
            <div className="section-label small reveal">GET IN TOUCH</div>

            <h2 className="contact-headline reveal">
              <span className="headline-grotesk">Let&apos;s</span>
              <br />
              <span className="headline-serif headline-serif--build">
                build
              </span>
              <br />
              <span className="headline-grotesk headline-grotesk--together">
                together
              </span>
            </h2>

            {/* description removed per request to match dark theme */}
          </div>

          <div className="contact-right reveal">
            <div className="section-label small">SEND A MESSAGE</div>
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="footer-side footer-side--left">
            <p className="footer-copy">
              © 2026 Dimas Azzam. All rights reserved.
            </p>
          </div>

          <a
            href="https://dzamfbr.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-center"
          >
            dzamfbr.my.id
          </a>

          <div className="footer-side footer-side--right">
            <p className="footer-note">Built with ♥ from Space</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
