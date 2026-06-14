import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "text-xs font-mono inline-block rounded px-2 py-0.5",
        className
      )}
      style={{
        fontSize: "10px",
        color: "var(--ac)",
        background: "var(--ac-glow)",
        fontFamily: "var(--mono)",
      }}
    >
      {children}
    </span>
  );
}
