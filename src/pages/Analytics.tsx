import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { generateChartData, attackTypeDistribution } from "@/lib/mock-data";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend,
} from "recharts";

export default function Analytics() {
  const [chartData] = useState(generateChartData());

  return (
    <DashboardLayout>
      <div className="space-y-4 animate-fade-in">
        <div>
          <h1 className="text-lg font-bold tracking-tight" style={{ letterSpacing: "-0.02em" }}>Security Analytics</h1>
          <p className="text-xs font-mono text-muted-foreground">24-hour threat intelligence overview</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Threat Timeline */}
          <div className="p-4 rounded-md bg-card tactical-border">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">Threat Activity Timeline</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(0,84%,60%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(0,84%,60%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="bg2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(142,70%,50%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(142,70%,50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(215,20%,55%)" }} axisLine={false} tickLine={false} interval={3} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(215,20%,55%)" }} axisLine={false} tickLine={false} width={30} />
                <Tooltip contentStyle={{ background: "hsl(222,47%,4%)", border: "1px solid hsl(217,19%,14%)", borderRadius: 4, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="threats" name="Detected" stroke="hsl(0,84%,60%)" fill="url(#tg)" strokeWidth={1.5} />
                <Area type="monotone" dataKey="blocked" name="Blocked" stroke="hsl(142,70%,50%)" fill="url(#bg2)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Attack Distribution */}
          <div className="p-4 rounded-md bg-card tactical-border">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">Attack Type Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={attackTypeDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={2} stroke="none">
                  {attackTypeDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(222,47%,4%)", border: "1px solid hsl(217,19%,14%)", borderRadius: 4, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Network Traffic */}
          <div className="p-4 rounded-md bg-card tactical-border">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">Network Traffic Volume</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(215,20%,55%)" }} axisLine={false} tickLine={false} interval={3} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(215,20%,55%)" }} axisLine={false} tickLine={false} width={35} />
                <Tooltip contentStyle={{ background: "hsl(222,47%,4%)", border: "1px solid hsl(217,19%,14%)", borderRadius: 4, fontSize: 12 }} />
                <Bar dataKey="traffic" name="Traffic (KB)" fill="hsl(217,91%,60%)" radius={[2, 2, 0, 0]} opacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* System Performance */}
          <div className="p-4 rounded-md bg-card tactical-border">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">System Performance</h3>
            <div className="space-y-4 mt-4">
              {[
                { label: "CPU Usage", value: 34, color: "bg-primary" },
                { label: "Memory", value: 62, color: "bg-warning" },
                { label: "Disk I/O", value: 18, color: "bg-safe" },
                { label: "Network Load", value: 45, color: "bg-primary" },
                { label: "Threat Engine", value: 88, color: "bg-safe" },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-muted-foreground">{m.label}</span>
                    <span className="text-foreground">{m.value}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full ${m.color} rounded-full transition-all duration-500`} style={{ width: `${m.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
