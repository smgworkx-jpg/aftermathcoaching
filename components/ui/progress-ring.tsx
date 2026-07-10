export function ProgressRing({ value, label }: { value: number; label: string }) {
  return (
    <div
      className="grid size-24 place-items-center rounded-full"
      style={{ background: `conic-gradient(#a855f7 ${value * 3.6}deg, rgba(255,255,255,.07) 0deg)` }}
    >
      <div className="grid size-20 place-items-center rounded-full bg-[#11131a] text-center">
        <div><strong className="block text-xl text-white">{value}%</strong><span className="text-[10px] uppercase tracking-[.2em] text-slate-500">{label}</span></div>
      </div>
    </div>
  );
}
