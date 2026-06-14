import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-5 transition-colors duration-200",
        hover && "cursor-pointer",
        className
      )}
      style={{
        background: "var(--bg3)",
        borderColor: "var(--b1)",
      }}
      onMouseEnter={
        hover
          ? (e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "var(--ac-border)";
              (e.currentTarget as HTMLDivElement).style.background =
                "var(--bg4)";
            }
          : undefined
      }
      onMouseLeave={
        hover
          ? (e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor =
                "var(--b1)";
              (e.currentTarget as HTMLDivElement).style.background =
                "var(--bg3)";
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
