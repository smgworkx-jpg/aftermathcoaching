export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-7 border-b-2 border-edge pb-5">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div className="min-w-0">
          <div className="eyebrow flex items-center gap-3">
            <span className="h-2.5 w-8 stripes-tight" />
            {eyebrow}
          </div>
          <h1 className="headline mt-3 text-4xl text-bone md:text-6xl">{title}</h1>
          {description && <p className="mt-3 max-w-2xl text-sm leading-6 text-ash">{description}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}
