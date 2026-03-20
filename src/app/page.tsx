/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { ArrowUpRight, TrendingUp, NotebookPen } from "lucide-react";
import { allCioLogs } from "content-collections";
import { allPosts } from "content-collections";
import { formatDate } from "@/lib/utils";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  const latestLog = allCioLogs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .at(0);

  const latestPost = allPosts
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .at(0);

  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      {/* Hero */}
      <section id="hero">
        <div className="gap-6 flex flex-col md:flex-row justify-between items-start">
          <div className="gap-2 flex flex-col order-2 md:order-1">
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="text-2xl font-semibold tracking-tighter sm:text-3xl lg:text-5xl"
              yOffset={8}
              text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
            />
            <BlurFadeText
              className="text-muted-foreground max-w-[600px] md:text-lg lg:text-xl"
              delay={BLUR_FADE_DELAY}
              text={DATA.description}
            />
          </div>
          <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2 flex-shrink-0">
            <div className="relative size-24 md:size-32">
              {/* Blurred slow glow ring */}
              <div
                className="absolute inset-0 rounded-full animate-spin"
                style={{
                  background: "conic-gradient(from 0deg, #6366f1, #a855f7, #ec4899, #6366f1)",
                  animationDuration: "6s",
                  padding: "3px",
                  filter: "blur(4px)",
                  transform: "scale(1.08)",
                }}
              />
              {/* Photo */}
              <div className="absolute inset-[3px] rounded-full overflow-hidden">
                <img
                  src="/me.png"
                  alt="Tarandeep Singh Plaha"
                  className="size-full object-cover object-top"
                />
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* About */}
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>{DATA.summary}</Markdown>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Latest updates — CIO log + blog teaser */}
      {(latestLog || latestPost) && (
        <section id="latest">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold mb-4">Latest</h2>
          </BlurFade>
          <div className="flex flex-col gap-3">
            {latestLog && (
              <BlurFade delay={BLUR_FADE_DELAY * 6}>
                <Link
                  href={`/cio-log/${latestLog._meta.path.replace(".mdx", "")}`}
                  className="group flex items-start gap-3 p-3.5 rounded-xl border hover:bg-muted/30 transition-all"
                >
                  <div className="mt-0.5 flex-shrink-0 size-7 rounded-lg bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
                    <TrendingUp className="size-3.5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs text-muted-foreground font-mono">
                        CIO Log · {formatDate(new Date(latestLog.date))}
                      </span>
                      <span
                        className={`text-xs font-mono font-semibold ${
                          latestLog.portfolioReturn.startsWith("+")
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-red-500"
                        }`}
                      >
                        {latestLog.portfolioReturn}
                      </span>
                    </div>
                    <p className="text-sm font-medium leading-snug line-clamp-1 group-hover:text-foreground/80 transition-colors">
                      {latestLog.title}
                    </p>
                  </div>
                  <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
                </Link>
              </BlurFade>
            )}
            {latestPost && (
              <BlurFade delay={BLUR_FADE_DELAY * 7}>
                <Link
                  href={`/blog/${latestPost._meta.path.replace(".mdx", "")}`}
                  className="group flex items-start gap-3 p-3.5 rounded-xl border hover:bg-muted/30 transition-all"
                >
                  <div className="mt-0.5 flex-shrink-0 size-7 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
                    <NotebookPen className="size-3.5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="mb-0.5">
                      <span className="text-xs text-muted-foreground font-mono">
                        Blog · {formatDate(new Date(latestPost.publishedAt))}
                      </span>
                    </div>
                    <p className="text-sm font-medium leading-snug line-clamp-1 group-hover:text-foreground/80 transition-colors">
                      {latestPost.title}
                    </p>
                  </div>
                  <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
                </Link>
              </BlurFade>
            )}
          </div>
        </section>
      )}

      {/* Work */}
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 8}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>

      {/* Education */}
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 11 + index * 0.05}
              >
                <div className="flex items-center gap-x-3 justify-between">
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    <div className="size-8 md:size-10 p-1 border rounded-full shadow ring-2 ring-border bg-muted flex-none" />
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-none">{education.school}</div>
                      <div className="font-sans text-sm text-muted-foreground">{education.degree}</div>
                    </div>
                  </div>
                  <div className="text-xs tabular-nums text-muted-foreground text-right flex-none">
                    {education.start} – {education.end}
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 12}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-2">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill.name} delay={BLUR_FADE_DELAY * 13 + id * 0.05}>
                <div className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-4 flex items-center gap-2">
                  {skill.icon && <skill.icon className="size-4 rounded overflow-hidden object-contain" />}
                  <span className="text-foreground text-sm font-medium">{skill.name}</span>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 14}>
          <ProjectsSection />
        </BlurFade>
      </section>

      {/* Contact */}
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
