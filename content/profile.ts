export const profile = {
  name: "Matheus Oliveira",
  shortName: "Matheus",
  handle: "@Matheus-Mont",
  whatsapp: "5522988247725",
  whatsappDisplay: "(22) 98824-7725",
  email: "dev.matheusmonteiro@gmail.com",
  github: "https://github.com/Matheus-Mont",
  linkedin: "https://www.linkedin.com/in/matheusoliveiramonteiro",
  city: "São Pedro da Aldeia, RJ",
  siteUrl: "https://matheusoliveira.dev",
} as const;

export const projects = [
  {
    id: "o-que-me-mordeu",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    shot: "/projects/o-que-me-mordeu.jpg",
    repo: "https://github.com/Matheus-Mont/o-que-me-mordeu-v2",
    deploy: "https://o-que-me-mordeu-v2.vercel.app",
  },
  {
    id: "saude-integrada",
    stack: ["Next.js", "TypeScript", "Chakra UI", "Framer Motion"],
    shot: "/projects/saude-integrada.jpg",
    repo: "https://github.com/Matheus-Mont/saude-integrada-carol",
    deploy: "https://saude-integrada-carol.vercel.app",
  },
  {
    id: "delivery-app",
    stack: ["React", "Node.js", "Sequelize", "MySQL"],
    shot: "/projects/delivery-app.jpg",
    repo: "https://github.com/Matheus-Mont/delivery-fullstack",
    deploy: "https://delivery-fullstack.vercel.app",
  },
] as const;

/** Números reais, tirados do currículo. Nenhum deles é estimativa. */
export const vitals = [
  { value: 3, suffix: "", key: "years" },
  { value: 92, suffix: "%", key: "faster" },
  { value: 5, suffix: "", key: "monorepo" },
  { value: 100, suffix: "%", key: "tests" },
] as const;

/** Formação, do mais recente para o mais antigo. */
export const education = [
  { id: "ads", period: "2025", org: "Estácio" },
  { id: "python", period: "2023", org: "IGTI" },
  { id: "trybe", period: "2022", org: "Trybe" },
  { id: "ifrj", period: "2013 - 2017", org: "IFRJ" },
] as const;

export type EducationId = (typeof education)[number]["id"];

export const stack = [
  "React", "Next.js", "TypeScript", "Node.js", "Express",
  "React Native", "Jest", "Prisma", "MySQL", "MongoDB", "Docker", "Git",
] as const;

export type ProjectId = (typeof projects)[number]["id"];
