import { useEffect, useMemo, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { useFloatingButtons } from "../context/FloatingButtonContext";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const context = useFloatingButtons();

  useEffect(() => {
    let rafId = null;

    const onScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const visible = y > 240;

        setIsVisible(visible);

        if (context?.setIsScrollVisible) {
          context.setIsScrollVisible(visible);
        }

        const doc = document.documentElement;
        const scrollTop = doc.scrollTop || y;
        const scrollHeight = (doc.scrollHeight || 1) - (doc.clientHeight || 1);

        const p =
          scrollHeight > 0
            ? Math.min(1, Math.max(0, scrollTop / scrollHeight))
            : 0;

        setProgress(p);

        rafId = null;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [context]);

  useEffect(() => {
    let rafId = null;

    const onScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        setIsVisible(y > 240);

        const doc = document.documentElement;
        const scrollTop = doc.scrollTop || y;
        const scrollHeight = (doc.scrollHeight || 1) - (doc.clientHeight || 1);
        const p =
          scrollHeight > 0
            ? Math.min(1, Math.max(0, scrollTop / scrollHeight))
            : 0;
        setProgress(p);

        rafId = null;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const ring = useMemo(() => {
    const r = 18;
    const c = 2 * Math.PI * r;
    const dash = c * progress;
    const gap = c - dash;
    return { r, c, dasharray: `${dash} ${gap}` };
  }, [progress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
      className={[
        "fixed bottom-6 right-6 z-50",
        "h-12 w-12 rounded-2xl",
        "border border-green-200 bg-white/90 backdrop-blur",
        "shadow-lg shadow-black/10",
        "grid place-items-center",
        "transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/15",
        "active:translate-y-0 active:scale-[0.98]",
        "focus:outline-none focus:ring-4 focus:ring-green-200 focus:border-green-700",
        isVisible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-90 pointer-events-none",
      ].join(" ")}
    >
      {/* progress ring */}
      <span className="absolute inset-0 grid place-items-center pointer-events-none">
        <svg width="44" height="44" viewBox="0 0 44 44" className="opacity-90">
          {/* track */}
          <circle
            cx="22"
            cy="22"
            r={ring.r}
            fill="none"
            stroke="rgba(187, 247, 208, 0.9)"
            strokeWidth="3"
          />
          {/* progress */}
          <circle
            cx="22"
            cy="22"
            r={ring.r}
            fill="none"
            stroke="rgba(21, 128, 61, 0.95)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={ring.dasharray}
            transform="rotate(-90 22 22)"
          />
        </svg>
      </span>

      {/* icon */}
      <span className="relative">
        <FiArrowUp className="text-green-800" size={20} />
      </span>
    </button>
  );
}
