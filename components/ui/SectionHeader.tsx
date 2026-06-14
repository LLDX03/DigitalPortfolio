interface SectionHeaderProps {
  title: string;
  sub: string;
  className?: string;
}

export function SectionHeader({ title, sub, className = "" }: SectionHeaderProps) {
  return (
    <div className={`mb-8 ${className}`}>
      <h2 className="text-2xl font-medium mb-1" style={{ color: "var(--t1)" }}>
        {title}
      </h2>
      <p className="text-xs font-mono" style={{ color: "var(--t3)", fontFamily: "var(--mono)" }}>
        //{" "}
        <span style={{ color: "var(--ac)" }}>{sub}</span>
      </p>
    </div>
  );
}
