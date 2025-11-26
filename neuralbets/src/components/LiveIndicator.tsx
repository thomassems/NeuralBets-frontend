export function LiveIndicator() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
      </div>
      <span className="text-sm text-cyan-400">LIVE</span>
    </div>
  );
}