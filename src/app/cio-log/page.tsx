import { allCioLogs } from "content-collections";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export const metadata = {
  title: "CIO Log",
  description: "Weekly investment journal — ALFRED paper trading performance, signal review, and market observations.",
};

const BLUR_FADE_DELAY = 0.04;

function ReturnBadge({ value, label }: { value: string; label: string }) {
  const isPositive = value.startsWith("+");
  const isNegative = value.startsWith("-");
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span
        className={`text-sm font-mono font-semibold tabular-nums ${
          isPositive
            ? "text-emerald-600 dark:text-emerald-400"
            : isNegative
            ? "text-red-500 dark:text-red-400"
            : "text-muted-foreground"
        }`}
      >
        {isPositive ? (
          <span className="inline-flex items-center gap-0.5">
            <TrendingUp className="size-3" />
            {value}
          </span>
        ) : isNegative ? (
          <span className="inline-flex items-center gap-0.5">
            <TrendingDown className="size-3" />
            {value}
          </span>
        ) : (
          <span className="inline-flex items-center gap-0.5">
            <Minus className="size-3" />
            {value}
          </span>
        )}
      </span>
    </div>
  );
}

export default function CIOLogPage() {
  const sortedLogs = allCioLogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <div className="flex flex-col gap-1 mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">CIO Log</h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-lg">
            Weekly investment journal. Tracking ALFRED paper trading performance, signal
            behavior, market observations, and what I'm changing each week. Every entry
            is a record of how my thinking evolves.
          </p>
        </div>
      </BlurFade>

      {/* Status legend */}
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <div className="flex items-center gap-3 mb-8 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-amber-400" />
            Paper trading
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-500" />
            Live account
          </span>
        </div>
      </BlurFade>

      <div className="flex flex-col gap-0 relative">
        {/* Timeline line */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-border hidden md:block" />

        {sortedLogs.map((log, i) => {
          const isOutperform =
            parseFloat(log.portfolioReturn) > parseFloat(log.spyReturn);
          const isUnderperform =
            parseFloat(log.portfolioReturn) < parseFloat(log.spyReturn);

          return (
            <BlurFade key={log._meta.path} delay={BLUR_FADE_DELAY * 3 + i * 0.05}>
              <Link
                href={`/cio-log/${log._meta.path.replace(".mdx", "")}`}
                className="group flex gap-0 md:gap-8 pb-8 relative"
              >
                {/* Timeline dot */}
                <div
                  className={`hidden md:block absolute left-[-4.5px] top-2 size-2.5 rounded-full border-2 border-background z-10 flex-shrink-0 ${
                    log.status === "live"
                      ? "bg-emerald-500"
                      : "bg-amber-400"
                  }`}
                />

                {/* Date column */}
                <div className="hidden md:block w-36 flex-shrink-0 pl-6">
                  <time className="text-xs text-muted-foreground font-mono tabular-nums">
                    {formatDate(new Date(log.date))}
                  </time>
                </div>

                {/* Content card */}
                <div className="flex-1 border border-border rounded-xl p-4 hover:border-border/80 hover:bg-muted/30 transition-all duration-200 md:ml-0">
                  <div className="flex flex-col gap-2">
                    {/* Mobile date */}
                    <time className="md:hidden text-xs text-muted-foreground font-mono">
                      {formatDate(new Date(log.date))}
                    </time>

                    {/* Returns row */}
                    <div
                      className={`flex items-center gap-4 px-3 py-2 rounded-lg text-xs w-fit ${
                        isOutperform
                          ? "bg-emerald-50 dark:bg-emerald-950/30"
                          : isUnderperform
                          ? "bg-red-50 dark:bg-red-950/30"
                          : "bg-muted"
                      }`}
                    >
                      <ReturnBadge value={log.portfolioReturn} label="ALFRED" />
                      <span className="text-muted-foreground/40">vs</span>
                      <ReturnBadge value={log.spyReturn} label="SPY" />
                      <span
                        className={`text-xs font-medium ${
                          isOutperform
                            ? "text-emerald-600 dark:text-emerald-400"
                            : isUnderperform
                            ? "text-red-500"
                            : "text-muted-foreground"
                        }`}
                      >
                        {isOutperform
                          ? "Outperformed"
                          : isUnderperform
                          ? "Underperformed"
                          : "In line"}
                      </span>
                    </div>

                    <h2 className="font-medium text-sm leading-snug group-hover:text-foreground/80 transition-colors line-clamp-2">
                      {log.title}
                    </h2>

                    {log.tags && log.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {log.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </BlurFade>
          );
        })}
      </div>

      {sortedLogs.length === 0 && (
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="text-center py-16 text-muted-foreground text-sm">
            No entries yet. First CIO letter drops next Sunday.
          </div>
        </BlurFade>
      )}
    </section>
  );
}
