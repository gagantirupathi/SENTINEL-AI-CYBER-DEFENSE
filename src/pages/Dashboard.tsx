import { useState, useEffect } from "react";
import { Shield, Activity, AlertTriangle, Ban, Wifi, Cpu, HardDrive, Skull, Crosshair } from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { RadarWidget } from "@/components/RadarWidget";
import { generateProcesses, generateNetworkConnections, generateChartData, type ProcessInfo, type NetworkConnection } from "@/lib/mock-data";

export default function Dashboard() {
  const [processes, setProcesses] = useState<ProcessInfo[]>(generateProcesses());
  const [connections] = useState<NetworkConnection[]>(generateNetworkConnections());
  const [chartData] = useState(generateChartData());
  const [healthScore, setHealthScore] = useState(98.4);
  const [blockedCount, setBlockedCount] = useState(21);
  const [activityFeed, setActivityFeed] = useState([
    { time: "14:23:01", msg: "Brute force attempt blocked from 185.220.101.1", severity: "high" as const },
    { time: "14:21:45", msg: "Port scan detected on ports 22-1024", severity: "medium" as const },
    { time: "14:20:12", msg: "SSL certificate renewed for api.internal", severity: "low" as const },
    { time: "14:18:33", msg: "Anomalous outbound traffic from PID 7888", severity: "critical" as const },
    { time: "14:15:00", msg: "Firewall rules updated — 3 new entries", severity: "low" as const },
  ]);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHealthScore((prev) => Math.max(90, Math.min(100, prev + (Math.random() - 0.5) * 0.3)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const terminateProcess = (pid: number) => {
    setProcesses((prev) => prev.map((p) => p.pid === pid ? { ...p, status: "blocked" as const } : p));
    setBlockedCount((c) => c + 1);
    setActivityFeed((prev) => [{ time: new Date().toTimeString().slice(0, 8), msg: `Process PID ${pid} terminated by operator`, severity: "high" as const }, ...prev.slice(0, 9)]);
  };

  const blockIP = (ip: string) => {
    setActivityFeed((prev) => [{ time: new Date().toTimeString().slice(0, 8), msg: `IP ${ip} blocked by operator`, severity: "high" as const }, ...prev.slice(0, 9)]);
    setBlockedCount((c) => c + 1);
  };

  const runSimulation = (type: string) => {
    setActivityFeed((prev) => [
      { time: new Date().toTimeString().slice(0, 8), msg: `[SIMULATION] ${type} attack initiated`, severity: "critical" as const },
      ...prev.slice(0, 9),
    ]);
    setHealthScore((prev) => Math.max(85, prev - Math.random() * 5));
  };

  const sevColor = (s: string) =>
    s === "critical" ? "text-destructive" : s === "high" ? "text-warning" : s === "medium" ? "text-primary" : "text-muted-foreground";

  return (
    <DashboardLayout>
      <div className="space-y-4 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight" style={{ letterSpacing: "-0.02em" }}>Security Dashboard</h1>
            <p className="text-xs font-mono text-muted-foreground">Last scan: {new Date().toLocaleTimeString()}</p>
          </div>
          <div className="flex gap-2">
            {["DDoS Simulation", "Ransomware Drill", "Intrusion Test"].map((sim) => (
              <button
                key={sim}
                onClick={() => runSimulation(sim)}
                className="px-3 py-1.5 rounded-md text-xs font-mono bg-destructive/10 text-destructive hover:bg-destructive/20 tactical-border transition-colors"
              >
                <Crosshair className="w-3 h-3 inline mr-1" />{sim}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="Health Score" value={`${healthScore.toFixed(1)}%`} icon={Shield} variant="safe" subtitle="System integrity" />
          <StatCard label="Active Threats" value={2} icon={AlertTriangle} variant="danger" subtitle="Requires attention" />
          <StatCard label="Blocked" value={blockedCount} icon={Ban} variant="safe" subtitle="Last 24 hours" />
          <StatCard label="Endpoints" value={847} icon={Wifi} variant="default" subtitle="12 segments" />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Network Chart */}
          <div className="lg:col-span-2 p-4 rounded-md bg-card tactical-border">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">Threat Activity — 24h</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="threatGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(0,84%,60%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(0,84%,60%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="blockedGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(142,70%,50%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(142,70%,50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(215,20%,55%)" }} axisLine={false} tickLine={false} interval={3} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(215,20%,55%)" }} axisLine={false} tickLine={false} width={30} />
                <Tooltip contentStyle={{ background: "hsl(222,47%,4%)", border: "1px solid hsl(217,19%,14%)", borderRadius: 4, fontSize: 12 }} />
                <Area type="monotone" dataKey="threats" stroke="hsl(0,84%,60%)" fill="url(#threatGrad)" strokeWidth={1.5} />
                <Area type="monotone" dataKey="blocked" stroke="hsl(142,70%,50%)" fill="url(#blockedGrad)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Radar */}
          <div className="p-4 rounded-md bg-card tactical-border flex flex-col items-center justify-center">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 self-start">Network Radar</h3>
            <RadarWidget />
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Process Monitor */}
          <div className="p-4 rounded-md bg-card tactical-border">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
              <Cpu className="w-3 h-3 inline mr-1" />Live Processes
            </h3>
            <div className="space-y-1.5 max-h-[250px] overflow-auto">
              {processes.map((p) => (
                <div
                  key={p.pid}
                  className={`flex items-center justify-between text-xs font-mono p-2 rounded-sm ${
                    p.status === "suspicious" ? "bg-destructive/10 tactical-border" : p.status === "blocked" ? "bg-muted opacity-50" : "bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${p.status === "suspicious" ? "bg-destructive animate-pulse-danger" : p.status === "blocked" ? "bg-muted-foreground" : "bg-safe"}`} />
                    <span className="text-foreground">{p.name}</span>
                    <span className="text-muted-foreground">PID:{p.pid}</span>
                  </div>
                  {p.status === "suspicious" && (
                    <button
                      onClick={() => terminateProcess(p.pid)}
                      className="px-2 py-0.5 rounded-sm bg-destructive/20 text-destructive hover:bg-destructive/30 text-[10px] transition-colors"
                    >
                      TERMINATE
                    </button>
                  )}
                  {p.status === "blocked" && <span className="text-muted-foreground text-[10px]">TERMINATED</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Network Connections */}
          <div className="p-4 rounded-md bg-card tactical-border">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
              <Wifi className="w-3 h-3 inline mr-1" />Network Connections
            </h3>
            <div className="space-y-1.5 max-h-[250px] overflow-auto">
              {connections.map((c) => (
                <div key={c.ip} className={`flex items-center justify-between text-xs font-mono p-2 rounded-sm ${c.status === "suspicious" ? "bg-destructive/10 tactical-border" : "bg-muted"}`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${c.status === "suspicious" ? "bg-destructive animate-pulse-danger" : c.status === "blocked" ? "bg-muted-foreground" : "bg-safe"}`} />
                    <span className="text-foreground">{c.ip}</span>
                    <span className="text-muted-foreground">:{c.port}</span>
                    <span className="text-muted-foreground">{c.country}</span>
                  </div>
                  {c.status === "suspicious" && (
                    <button
                      onClick={() => blockIP(c.ip)}
                      className="px-2 py-0.5 rounded-sm bg-destructive/20 text-destructive hover:bg-destructive/30 text-[10px] transition-colors"
                    >
                      BLOCK
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="p-4 rounded-md bg-card tactical-border">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
              <Activity className="w-3 h-3 inline mr-1" />Activity Feed
            </h3>
            <div className="space-y-1.5 max-h-[250px] overflow-auto">
              {activityFeed.map((a, i) => (
                <motion.div
                  key={`${a.time}-${i}`}
                  initial={i === 0 ? { opacity: 0, x: -8 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs font-mono p-2 rounded-sm bg-muted"
                >
                  <span className="text-muted-foreground">{a.time}</span>{" "}
                  <span className={sevColor(a.severity)}>■</span>{" "}
                  <span className="text-foreground">{a.msg}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
