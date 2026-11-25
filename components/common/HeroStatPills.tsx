import { cn } from "@/lib/utils";

type HeroStat = { value: string; label: string };

/**
 * Hero trust strip: one connected card with the stats side by side, value over label,
 * divided by hairlines. Used on every hero (desktop and mobile) so the stats look the
 * same across the site.
 */
export function HeroStatPills({
  stats,
  className = "",
}: {
  stats: HeroStat[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid w-full max-w-[560px] [grid-template-columns:repeat(var(--stat-count),minmax(0,1fr))] divide-x divide-line-200 overflow-hidden rounded-[18px] bg-white/80 shadow-[0_10px_30px_-18px_rgba(26,61,79,0.45)] ring-1 ring-line-200 backdrop-blur-sm sm:w-max sm:max-w-none sm:min-w-max sm:[grid-template-columns:repeat(var(--stat-count),max-content)]",
        className,
      )}
      style={{ ["--stat-count" as string]: stats.length }}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex min-w-0 flex-col items-center justify-center px-3 py-3 text-center sm:min-w-max sm:px-5 lg:items-start lg:text-left">
          <span className="font-heading text-[20px] font-bold leading-none text-primary sm:text-xl">{stat.value}</span>
          <span className="mt-1.5 font-sans text-base font-medium leading-5 text-body-text sm:whitespace-nowrap">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
