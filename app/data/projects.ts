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
    id: "p1",
    title: "Portfolio of Dzamfbr",
    description:
      "Website portofolio pribadi yang menampilkan profil, keterampilan, dan berbagai proyek yang telah saya kerjakan dengan desain modern, responsif, dan interaktif.",
    image: "/screenshoot_portofolio_dzamfbr.png",
    demo: "https://example.com/brisurfcare",
    createdAt: "2025-12-05",
  },
];

// Commercial projects: GitHub link is intentionally omitted for client work.
export const commercialProjects: Project[] = [];

export default { personalProjects, commercialProjects };
