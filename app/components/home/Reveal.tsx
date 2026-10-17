"use client";

import { useEffect, useRef, useState } from "react";
import type { RevealProps } from "@/app/interfaces/components.interface";

export default function Reveal({ className = "", children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`${className} reveal${shown ? " in" : ""}`}>
      {children}
    </section>
  );
}
