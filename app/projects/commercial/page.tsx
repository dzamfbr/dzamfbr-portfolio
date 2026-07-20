import Link from "next/link";
import type { Metadata } from "next";
import ProjectsShowcase from "../../../components/sections/ProjectsShowcase";
import ThemeToggle from "../../../components/sections/ThemeToggle";

export const metadata: Metadata = {
  title: "Commercial Projects",
  description: "Lihat seluruh proyek komersial Dzamfbr dalam satu halaman.",
  alternates: {
    canonical: "/projects/commercial",
  },
};

export default function CommercialProjectsPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "2rem 1rem 4rem" }}>
      <ThemeToggle />
      <div style={{ maxWidth: "1200px", margin: "0 auto 1.2rem" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "var(--foreground)",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          <span aria-hidden="true">←</span>
          <span>Back to Previous Page</span>
        </Link>
      </div>
      <ProjectsShowcase showAll category="commercial" />
    </main>
  );
}
