import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/scroll";

/** The cutout keeps the template's continuous scroll choreography. Desktop poses
 * interpolate between measured DOM slots; narrow screens dock directly to the
 * nearest slot so the product never sits on top of stacked copy. */
export function ShoeStage({ reduced }: { reduced: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const slots = Array.from(
      document.querySelectorAll<HTMLElement>("[data-shoe-slot]"),
    );
    let points: { x: number; y: number; width: number; rotation: number }[] =
      [];
    const measure = () => {
      points = slots.map((slot) => {
        const r = slot.getBoundingClientRect();
        return {
          x: r.left + r.width / 2,
          y: r.top + window.scrollY + r.height / 2,
          width: r.width,
          rotation: Number(slot.dataset.angle),
        };
      });
      update();
    };
    const update = () => {
      if (!points.length) return;
      const sy = window.scrollY;
      const center = sy + window.innerHeight * 0.52;
      const narrow = window.innerWidth < 900 || reduced;
      let p = points[0];
      let y = p.y - sy;
      if (narrow) {
        p = points.reduce((a, b) =>
          Math.abs(a.y - center) < Math.abs(b.y - center) ? a : b,
        );
        y = p.y - sy;
      } else if (center >= points[points.length - 1].y) {
        p = points[points.length - 1];
        y = p.y - sy;
      } else if (center > points[0].y) {
        const i = points.findIndex((point) => point.y >= center);
        const a = points[i - 1],
          b = points[i];
        const t = (center - a.y) / (b.y - a.y);
        const eased = t * t * (3 - 2 * t);
        p = {
          x: a.x + (b.x - a.x) * eased,
          y: center,
          width: a.width + (b.width - a.width) * eased,
          rotation: a.rotation + (b.rotation - a.rotation) * eased,
        };
        y = window.innerHeight * 0.52;
      }
      gsap.set(el, {
        x: p.x - p.width / 2,
        y: y - p.width / 3,
        width: p.width,
        rotation: reduced ? 0 : p.rotation,
        visibility: "visible",
      });
    };
    measure();
    gsap.ticker.add(update);
    ScrollTrigger.addEventListener("refresh", measure);
    window.addEventListener("resize", measure);
    const observer = new ResizeObserver(measure);
    slots.forEach((slot) => observer.observe(slot));
    return () => {
      gsap.ticker.remove(update);
      ScrollTrigger.removeEventListener("refresh", measure);
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, [reduced]);
  return (
    <div className="shoe-stage" ref={ref}>
      <img
        src={`${import.meta.env.BASE_URL}img/checkered-sneaker.png`}
        alt="Styling illustration: white sneaker laced with colorful Google checkered shoelaces"
        width="1536"
        height="1024"
        fetchPriority="high"
      />
    </div>
  );
}
