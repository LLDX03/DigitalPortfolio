"use client";

import { useEffect, useRef, useState } from "react";

interface SkillBarProps {
  name: string;
  level: number;
}

export function SkillBar({ name, level }: SkillBarProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex items-center justify-between mb-2.5 gap-3">
      <span className="text-xs shrink-0" style={{ color: "var(--t2)", minWidth: "160px" }}>
        {name}
      </span>
      <div
        className="flex-1 h-[3px] rounded-full"
        style={{ background: "var(--b1)" }}
      >
        <div
          className="h-[3px] rounded-full transition-all duration-700 ease-out"
          style={{
            width: animated ? `${level}%` : "0%",
            background: "var(--ac)",
          }}
        />
      </div>
      <span
        className="text-xs font-mono shrink-0 w-8 text-right"
        style={{ color: "var(--t3)", fontFamily: "var(--mono)" }}
      >
        {level}%
      </span>
    </div>
  );
}
