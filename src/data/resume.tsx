import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon, TrendingUpIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Python } from "@/components/ui/svgs/python";
import { Postgresql } from "@/components/ui/svgs/postgresql";
import { Docker } from "@/components/ui/svgs/docker";

export const DATA = {
  name: "Tarandeep Singh Plaha",
  initials: "TP",
  url: "https://taranplaha.com",
  location: "Tempe, AZ",
  locationLink: "https://www.google.com/maps/place/tempe+az",
  description:
    "Computer Engineering MS student at ASU. Building algorithmic trading systems and outreach SaaS. Interested in quant finance, ML systems, and making things that work in production.",
  summary:
    "I'm a graduate student at Arizona State University (MS Computer Engineering, expected Spring 2027) building at the intersection of quantitative finance and software engineering. I've shipped two production systems: [ALFRED](https://github.com/tplaha01), an algorithmic trading platform with a 4-signal hybrid engine and live backtesting, and [PitchFlows](https://pitchflows.online), a cold outreach SaaS with 20+ active users and 1,000+ emails sent. Previously interned as a data scientist in India. I write about what I build, what I learn, and how I think about markets.",
  avatarUrl: "/me.png",
  skills: [
    { name: "Python", icon: Python },
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "TypeScript", icon: Typescript },
    { name: "PostgreSQL", icon: Postgresql },
    { name: "Docker", icon: Docker },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "/cio-log", icon: TrendingUpIcon, label: "CIO Log" },
  ],
  contact: {
    email: "tplaha@asu.edu",
    tel: "+19178170065",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/tplaha01",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/taranplaha",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/taranplaha",
        icon: Icons.x,
        navbar: false,
      },
      email: {
        name: "Send Email",
        url: "mailto:tplaha@asu.edu",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "AD Infocom Systems",
      href: "#",
      badges: ["Internship"],
      location: "India",
      title: "Data Science Intern",
      logoUrl: "/adi.png",
      start: "Jan 2025",
      end: "Jun 2025",
      description:
        "Engineered ML classification models on structured datasets, achieving ~15% accuracy gains through feature engineering and ensemble selection. Built preprocessing pipelines handling 50K+ records, reducing data preparation time by 40%. Delivered interactive dashboards surfacing key business KPIs.",
    },
    {
      company: "Oasis Infobyte",
      href: "#",
      badges: ["Internship"],
      location: "Remote",
      title: "Data Science Intern",
      logoUrl: "/oasis.png",
      start: "Aug 2024",
      end: "Sep 2024",
      description:
        "Designed modular end-to-end ML pipelines spanning ingestion, preprocessing, training, evaluation, and deployment, cutting iteration cycle time by 30%. Automated reporting workflows that improved analyst turnaround time by 30%.",
    },
  ],

  education: [
    {
      school: "Arizona State University",
      href: "https://asu.edu",
      degree: "MS Computer Engineering (Computer Systems)",
      logoUrl: "/asu.png",
      start: "Aug 2025",
      end: "May 2027",
    },
    {
      school: "St. Vincent Pallotti College of Engineering",
      href: "#",
      degree: "BTech Computer Science & Engineering (Data Science)",
      logoUrl: "/svpcet.png",
      start: "Dec 2021",
      end: "Jun 2025",
    },
  ],

  projects: [
    {
      title: "ALFRED — Algorithmic Trading System",
      href: "https://github.com/tplaha01",
      dates: "2024 - Present",
      active: true,
      description:
        "Full-stack algorithmic trading platform with a 4-signal hybrid engine (technical, fundamental, sentiment, ML). LightGBM alpha model trained on 39 engineered features with TimeSeriesSplit to prevent lookahead bias. Production risk layer: Half-Kelly sizing, 95% VaR guard, ATR-scaled stops, drawdown circuit breaker. Vectorized backtesting computes 15 metrics including Sharpe, Sortino, Calmar, CAGR, and alpha vs SPY.",
      technologies: ["Python", "FastAPI", "React", "LightGBM", "Alpaca API", "WebSocket"],
      links: [
        {
          type: "Source",
          href: "https://github.com/tplaha01",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/alfred.png",
      video: "",
    },
    {
      title: "PitchFlows — Cold Outreach SaaS",
      href: "https://pitchflows.online",
      dates: "2024 - Present",
      active: true,
      description:
        "Production SaaS for personalized cold email outreach. Orchestrates up to 17 cascaded LLM API calls per email (GPT-4o research → Claude strategy → Claude drafting) with early-exit at ≥35% estimated reply probability. Segments recipients into 8 audience buckets, selects from 5 adaptive draft strategies, scores outputs across 6 weighted signals. 20+ active users, 1,000+ emails sent.",
      technologies: ["React", "FastAPI", "PostgreSQL", "Neon", "Gmail API", "GPT-4o"],
      links: [
        {
          type: "Website",
          href: "https://pitchflows.online",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/pitchflows.png",
      video: "",
    },
    {
      title: "ASU Faculty Research Dashboard",
      href: "#",
      dates: "2024",
      active: false,
      description:
        "Indexed 500+ faculty profiles and 10,000+ publications with sub-millisecond query latency via optimized full-text search. Integrated GPT-4o-mini to auto-generate personalized outreach emails from research-alignment scoring.",
      technologies: ["Python", "Flask", "PostgreSQL", "GPT-4o-mini"],
      links: [],
      image: "",
      video: "",
    },
  ],

  hackathons: [] as {
    title: string;
    dates: string;
    location: string;
    description: string;
    image?: string;
    links?: { title: string; icon: React.ReactNode; href: string }[];
  }[],
} as const;
