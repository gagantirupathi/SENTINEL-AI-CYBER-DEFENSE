export function RadarWidget() {
  const nodes = [
    { x: 35, y: 25, status: "safe" },
    { x: 65, y: 30, status: "safe" },
    { x: 50, y: 60, status: "suspicious" },
    { x: 25, y: 55, status: "safe" },
    { x: 75, y: 65, status: "safe" },
    { x: 40, y: 75, status: "suspicious" },
    { x: 60, y: 20, status: "safe" },
    { x: 80, y: 45, status: "blocked" },
  ];

  return (
    <div className="relative w-full aspect-square max-w-[200px] mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Rings */}
        {[40, 30, 20, 10].map((r) => (
          <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="hsl(217,19%,27%)" strokeOpacity="0.2" strokeWidth="0.5" />
        ))}
        {/* Cross */}
        <line x1="50" y1="10" x2="50" y2="90" stroke="hsl(217,19%,27%)" strokeOpacity="0.15" strokeWidth="0.5" />
        <line x1="10" y1="50" x2="90" y2="50" stroke="hsl(217,19%,27%)" strokeOpacity="0.15" strokeWidth="0.5" />
        {/* Sweep */}
        <line
          x1="50" y1="50" x2="50" y2="10"
          stroke="hsl(217,91%,60%)"
          strokeWidth="0.8"
          strokeOpacity="0.6"
          className="origin-center animate-radar-sweep"
          style={{ transformOrigin: "50px 50px" }}
        />
        {/* Sweep gradient cone */}
        <path
          d="M50,50 L48,12 A40,40 0 0,1 52,12 Z"
          fill="hsl(217,91%,60%)"
          fillOpacity="0.08"
          className="origin-center animate-radar-sweep"
          style={{ transformOrigin: "50px 50px" }}
        />
        {/* Nodes */}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r="2"
            fill={n.status === "safe" ? "hsl(142,70%,50%)" : n.status === "suspicious" ? "hsl(0,84%,60%)" : "hsl(38,92%,50%)"}
            opacity={n.status === "suspicious" ? 1 : 0.6}
          >
            {n.status === "suspicious" && (
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
            )}
          </circle>
        ))}
      </svg>
    </div>
  );
}
