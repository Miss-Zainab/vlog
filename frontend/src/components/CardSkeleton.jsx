export default function CardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-line bg-panel" aria-hidden="true">
      <div className="aspect-[16/10] bg-line/50" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-24 rounded bg-line/50" />
        <div className="h-6 w-4/5 rounded bg-line/50" />
        <div className="h-4 w-full rounded bg-line/40" />
        <div className="h-4 w-2/3 rounded bg-line/40" />
      </div>
    </div>
  );
}
