import Link from "next/link";
import type { Category, Tool } from "./data";

type Item = { tool: Tool; cat: Category };

function Row({ items, reverse }: { items: Item[]; reverse?: boolean }) {
  // The list is rendered twice so the -50% translate loops seamlessly.
  const doubled = [...items, ...items];
  return (
    <div className="mask-fade-x overflow-hidden">
      <div className={`flex w-max gap-3 py-1.5 ${reverse ? "animate-marquee-rev" : "animate-marquee-fast"}`}>
        {doubled.map(({ tool, cat }, i) => {
          const chip = (
            <>
              <span
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{ background: `rgba(${cat.accent},0.14)`, color: "var(--color-lime-ink)" }}
              >
                {tool.icon}
              </span>
              {tool.name}
            </>
          );
          const cls =
            "flex shrink-0 items-center gap-2.5 rounded-full border border-border bg-white py-1.5 pl-1.5 pr-4 text-sm font-medium text-foreground/75 shadow-sm transition-colors hover:border-primary/40 hover:text-foreground";
          // Second copy is decorative: keep it out of the tab order and the a11y tree.
          return tool.status === "live" ? (
            <Link
              key={`${tool.id}-${i}`}
              href={`/tools/${tool.id}`}
              className={cls}
              tabIndex={i >= items.length ? -1 : undefined}
              aria-hidden={i >= items.length ? true : undefined}
            >
              {chip}
            </Link>
          ) : (
            <span key={`${tool.id}-${i}`} className={`${cls} opacity-60`} aria-hidden={i >= items.length ? true : undefined}>
              {chip}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function ToolsMarquee({ items }: { items: Item[] }) {
  const a = items.filter((_, i) => i % 2 === 0);
  const b = items.filter((_, i) => i % 2 === 1);
  return (
    <div className="marquee-pause space-y-1 pb-2 pt-10 sm:pt-12" aria-label="Daftar tools">
      <Row items={a} />
      <Row items={b} reverse />
    </div>
  );
}
