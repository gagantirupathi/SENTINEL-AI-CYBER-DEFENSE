import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { generateThreatLogs, type ThreatLog } from "@/lib/mock-data";
import { Download, Filter } from "lucide-react";

const severityStyles: Record<string, string> = {
  Critical: "bg-destructive/10 text-destructive border border-destructive/20",
  High: "bg-warning/10 text-warning border border-warning/20",
  Medium: "bg-primary/10 text-primary border border-primary/20",
  Low: "bg-muted text-muted-foreground border border-border",
};

export default function ThreatLogs() {
  const [logs] = useState<ThreatLog[]>(generateThreatLogs(50));
  const [filter, setFilter] = useState<string>("All");

  const filtered = useMemo(() => (filter === "All" ? logs : logs.filter((l) => l.severity === filter)), [logs, filter]);

  const downloadReport = () => {
    const csv = "Time,Type,Severity,Source,Action,Details\n" + filtered.map((l) => `${l.time},${l.type},${l.severity},${l.source},${l.action},${l.details}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sentinel-threat-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight" style={{ letterSpacing: "-0.02em" }}>Threat Logs</h1>
            <p className="text-xs font-mono text-muted-foreground">{filtered.length} incidents recorded</p>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-1 p-1 rounded-md bg-muted tactical-border">
              <Filter className="w-3 h-3 text-muted-foreground ml-2" />
              {["All", "Critical", "High", "Medium", "Low"].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-2.5 py-1 rounded-sm text-xs font-mono transition-colors ${filter === s ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {s}
                </button>
              ))}
            </div>
            <button onClick={downloadReport} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-primary/10 text-primary hover:bg-primary/20 tactical-border transition-colors">
              <Download className="w-3 h-3" />
              Export CSV
            </button>
          </div>
        </div>

        <div className="rounded-md bg-card tactical-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="border-b border-border">
                  {["ID", "Time", "Type", "Severity", "Source", "Action", "Details"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-muted-foreground uppercase tracking-wider font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((log) => (
                  <tr key={log.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-2.5 text-muted-foreground">{log.id}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{log.time}</td>
                    <td className="px-4 py-2.5 text-foreground">{log.type}</td>
                    <td className="px-4 py-2.5">
                      <span className={`inline-block px-2 py-0.5 rounded-sm text-[10px] ${severityStyles[log.severity]}`}>{log.severity}</span>
                    </td>
                    <td className="px-4 py-2.5 text-foreground">{log.source}</td>
                    <td className="px-4 py-2.5 text-safe">{log.action}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{log.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
