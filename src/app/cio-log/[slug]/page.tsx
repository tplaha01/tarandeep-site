import { allCioLogs } from "content-collections";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MDXContent } from "@content-collections/mdx/react";
import { mdxComponents } from "@/mdx-components";
interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allCioLogs.map((log) => ({
    slug: log._meta.path.replace(".mdx", ""),
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const log = allCioLogs.find(
    (l) => l._meta.path.replace(".mdx", "") === slug
  );
  if (!log) return {};
  return { title: log.title, description: `CIO Log — ${formatDate(new Date(log.date))}` };
}

function ReturnStat({
  label,
  value,
  compare,
}: {
  label: string;
  value: string;
  compare?: string;
}) {
  const isPositive = value.startsWith("+");
  const isNegative = value.startsWith("-");
  const color = isPositive
    ? "text-emerald-600 dark:text-emerald-400"
    : isNegative
    ? "text-red-500 dark:text-red-400"
    : "text-muted-foreground";

  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={`text-2xl font-mono font-bold tabular-nums ${color}`}>
        {isPositive ? (
          <span className="inline-flex items-center gap-1">
            <TrendingUp className="size-5" />
            {value}
          </span>
        ) : isNegative ? (
          <span className="inline-flex items-center gap-1">
            <TrendingDown className="size-5" />
            {value}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1">
            <Minus className="size-5" />
            {value}
          </span>
        )}
      </span>
    </div>
  );
}

export default async function CIOLogSlugPage({ params }: Props) {
  const { slug } = await params;
  const log = allCioLogs.find(
    (l) => l._meta.path.replace(".mdx", "") === slug
  );

  if (!log) notFound();

  const portfolioVal = parseFloat(log.portfolioReturn);
  const spyVal = parseFloat(log.spyReturn);
  const alpha = (portfolioVal - spyVal).toFixed(1);
  const alphaPositive = parseFloat(alpha) >= 0;

  const MDX = log.mdx;

  return (
    <article className="flex flex-col gap-8">
      {/* Back nav */}
      <Link
        href="/cio-log"
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="size-3.5" />
        CIO Log
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              log.status === "live"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
            }`}
          >
            {log.status === "live" ? "Live account" : "Paper trading"}
          </span>
          <time className="text-sm text-muted-foreground font-mono">
            {formatDate(new Date(log.date))}
          </time>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight leading-tight">
          {log.title}
        </h1>

        {log.tags && log.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {log.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-0.5 bg-muted text-muted-foreground rounded-full border"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Performance card */}
      <div className="grid grid-cols-3 gap-4 p-4 rounded-xl border bg-muted/30">
        <ReturnStat label="ALFRED" value={log.portfolioReturn} />
        <ReturnStat label="SPY" value={log.spyReturn} />
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-muted-foreground">Alpha</span>
          <span
            className={`text-2xl font-mono font-bold tabular-nums ${
              alphaPositive
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-500 dark:text-red-400"
            }`}
          >
            {alphaPositive ? "+" : ""}
            {alpha}%
          </span>
        </div>
      </div>

      {/* MDX body */}
      <div className="prose dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-2 prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-a:text-foreground prose-a:underline-offset-4">
        <MDXContent code={log.mdx} components={mdxComponents} />
      </div>
    </article>
  );
}
