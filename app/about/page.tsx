import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Tentang Dimas Azzam atau Dzamfbr, web developer dan programmer dari Indonesia.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Dzamfbr",
    description:
      "Tentang Dimas Azzam atau Dzamfbr, web developer dan programmer dari Indonesia.",
    url: "https://dzamfbr-portfolio.vercel.app/about",
    type: "article",
  },
};

export default function AboutPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Tentang Dzamfbr</h1>
      <p>
        Saya adalah Dimas Azza, seorang web developer dan programmer dari
        Indonesia yang fokus membangun website dan aplikasi modern dengan
        performa dan pengalaman pengguna terbaik.
      </p>
      <p>
        Portofolio ini menampilkan karya, pengalaman, dan perjalanan saya dalam
        dunia teknologi.
      </p>
    </main>
  );
}
