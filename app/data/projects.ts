export type Project = {
  id: string;
  title: string;
  description: string;
  image?: string; // path under /public or external URL
  demo?: string;
  github?: string;
  client?: string; // for commercial projects
  createdAt: string; // ISO date string
};

// Personal projects: easiest way to add is push a new object here.
export const personalProjects: Project[] = [
  {
    id: "personal-portfolio-01",
    title: "Portfolio of Dzamfbrb",
    description:
      "Website portofolio pribadi yang menampilkan profil, keterampilan, dan berbagai proyek yang telah saya kerjakan dengan desain modern, responsif, dan interaktif.",
    image: "/screenshoot_portofolio_web_dzamfbr.png",
    demo: "https://dzamfbr-portfolio.vercel.app",
    createdAt: "2026-07-19",
  },
];

// Commercial projects: GitHub link is intentionally omitted for client work.
export const commercialProjects: Project[] = [];

export default { personalProjects, commercialProjects };
