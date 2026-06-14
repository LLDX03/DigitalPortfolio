import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn("chip", className)}
      style={{
        fontSize: "11px",
        color: "var(--tag-c)",
        background: "var(--tag-bg)",
        borderRadius: "3px",
        padding: "2px 8px",
        fontFamily: "var(--mono)",
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
}
