"use client";

import { Children, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Layout classes applied from `sm` up, e.g. "sm:grid sm:grid-cols-2 lg:grid-cols-3" */
  desktopClassName?: string;
  /** Width of each slide on phones */
  slideClassName?: string;
};

/**
 * Phones: a swipeable, snapping row with pagination dots.
 * Larger screens: whatever grid `desktopClassName` describes.
 */
export default function MobileCarousel({
  children,
  desktopClassName = "",
  slideClassName = "w-[84%]",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const items = Children.toArray(children);

  const onScroll = () => {
    const el = ref.current;
    const first = el?.children[0] as HTMLElement | undefined;
    if (!el || !first) return;
    const step = first.offsetWidth + 16;
    setActive(Math.min(items.length - 1, Math.max(0, Math.round(el.scrollLeft / step))));
  };

  const go = (i: number) => {
    const el = ref.current;
    const child = el?.children[i] as HTMLElement | undefined;
    if (!el || !child) return;
    el.scrollTo({ left: child.offsetLeft - 24, behavior: "smooth" });
  };

  return (
    <>
      <div
        ref={ref}
        onScroll={onScroll}
        className={`scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-3 sm:mx-0 sm:snap-none sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 ${desktopClassName}`}
      >
        {items.map((child, i) => (
          <div key={i} className={`shrink-0 snap-center sm:w-auto sm:shrink ${slideClassName}`}>
            {child}
          </div>
        ))}
      </div>
      {items.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-1.5 sm:hidden" role="tablist" aria-label="Slide">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Slide ${i + 1}`}
              onClick={() => go(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-primary" : "w-1.5 bg-foreground/20"
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}
