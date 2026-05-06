import { motion } from 'framer-motion';

interface ActivityChartProps {
  data?: {
    total: number;
    week: number;
    days: number[];
  }[];
  isRetrying?: boolean;
  retryAttempt?: number;
  maxRetries?: number;
}

export function ActivityChart({ data, isRetrying = false, retryAttempt = 0, maxRetries = 3 }: ActivityChartProps) {
  // Check if data is missing or empty (GitHub returns 202 during computation)
  const isComputing = !data || (Array.isArray(data) && data.length === 0);
  const retryLabelAttempt = Math.min(retryAttempt + 1, maxRetries);

  if (isComputing) {
    if (!isRetrying) {
      return (
        <div className="h-48 flex flex-col items-center justify-center text-zinc-500 space-y-4 industrial-grid bg-zinc-50 border-2 border-black border-dashed">
          <p className="text-xs font-black uppercase tracking-[0.25em]">No Activity Data Available</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
            GitHub stats are still unavailable for this repository.
          </p>
        </div>
      );
    }

    return (
      <div className="h-48 flex flex-col items-center justify-center text-zinc-400 space-y-6 industrial-grid bg-zinc-50 border-2 border-black border-dashed">
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ height: [8, 24, 8] }}
              transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
              className="w-2 bg-black"
            />
          ))}
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
          Fetching_From_GitHub (attempt {retryLabelAttempt}/{maxRetries})...
        </p>
      </div>
    );
  }

  const maxCommits = Math.max(...data.map(w => w.total), 1);
  const width = 800;
  const height = 120;
  const padding = 10;

  // Generate points for the sparkline
  const points = data.map((week, i) => {
    const x = (i / (data.length - 1)) * (width - 2 * padding) + padding;
    const y = height - (week.total / maxCommits) * (height - 2 * padding) - padding;
    return { x, y, total: week.total };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  const monthTicks = [0, 0.33, 0.66, 1].map((ratio) => {
    const index = Math.min(data.length - 1, Math.max(0, Math.round((data.length - 1) * ratio)));
    const weekDate = new Date((data[index]?.week || 0) * 1000);
    return {
      key: `${index}-${ratio}`,
      label: weekDate.toLocaleDateString(undefined, { month: 'short' }).toUpperCase(),
    };
  });

  return (
    <div className="relative group p-4 border-2 border-black bg-white">
      <div className="absolute top-4 right-4 flex items-center gap-3 text-[10px] text-black font-black uppercase tracking-widest bg-yellow-400 px-3 py-1 border-2 border-black">
        <div className="w-2 h-2 bg-black" />
        PULSE: ACTIVE
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-52"
        preserveAspectRatio="none"
      >
        {/* Area Fill - Industrial Pattern instead of gradient */}
        <motion.path
          d={areaPath}
          fill="rgba(0,0,0,0.03)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />

        {/* Sparkline Path */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="black"
          strokeWidth="6"
          strokeLinecap="square"
          strokeLinejoin="miter"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "circOut" }}
        />

        {/* Hover Bars instead of circles */}
        {points.map((p, i) => (
          <rect
            key={i}
            x={p.x - 1}
            y={p.y}
            width="2"
            height={height - p.y}
            className="fill-black opacity-0 group-hover:opacity-10 transition-opacity"
          />
        ))}
      </svg>

      <div className="grid grid-cols-4 mt-6 text-[10px] font-black uppercase tracking-widest text-zinc-400 border-t-2 border-black pt-4">
        {monthTicks.map((tick, idx) => (
          <span key={tick.key} className={idx === 0 ? 'text-left' : idx === monthTicks.length - 1 ? 'text-right' : 'text-center'}>
            {tick.label}
          </span>
        ))}
      </div>

      <div className="flex justify-between mt-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
        <span className="flex items-center gap-2"><span className="w-2 h-2 bg-zinc-200" /> LAST_12_WEEKS</span>
        <span className="flex items-center gap-2">CURRENT_SIGNAL <span className="w-2 h-2 bg-black" /></span>
      </div>
    </div>
  );
}
