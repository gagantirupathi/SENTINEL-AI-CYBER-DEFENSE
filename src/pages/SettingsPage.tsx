import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Shield, Bell, Sliders, Zap } from "lucide-react";

export default function SettingsPage() {
  const [autoResponse, setAutoResponse] = useState(true);
  const [sensitivity, setSensitivity] = useState(75);
  const [notifications, setNotifications] = useState({
    critical: true,
    high: true,
    medium: false,
    low: false,
    email: true,
    slack: false,
  });

  return (
    <DashboardLayout>
      <div className="space-y-4 animate-fade-in max-w-2xl">
        <div>
          <h1 className="text-lg font-bold tracking-tight" style={{ letterSpacing: "-0.02em" }}>Settings</h1>
          <p className="text-xs font-mono text-muted-foreground">Configure threat detection and response parameters</p>
        </div>

        {/* Auto Response */}
        <div className="p-5 rounded-md bg-card tactical-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold">Automated Threat Response</h3>
            </div>
            <button
              onClick={() => setAutoResponse(!autoResponse)}
              className={`w-10 h-5 rounded-full transition-colors relative ${autoResponse ? "bg-safe" : "bg-muted"}`}
            >
              <div className={`w-4 h-4 rounded-full bg-foreground absolute top-0.5 transition-transform ${autoResponse ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            When enabled, SentinelAI will automatically isolate compromised nodes, terminate malicious processes, and block threat actors without manual intervention.
          </p>
        </div>

        {/* Sensitivity */}
        <div className="p-5 rounded-md bg-card tactical-border">
          <div className="flex items-center gap-2 mb-4">
            <Sliders className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold">Detection Sensitivity</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-muted-foreground">Anomaly threshold</span>
              <span className="text-foreground">{sensitivity}%</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={sensitivity}
              onChange={(e) => setSensitivity(Number(e.target.value))}
              className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
              <span>Permissive</span>
              <span>Balanced</span>
              <span>Aggressive</span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="p-5 rounded-md bg-card tactical-border">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold">Notification Preferences</h3>
          </div>
          <div className="space-y-3">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Alert by severity</p>
            <div className="grid grid-cols-2 gap-2">
              {(["critical", "high", "medium", "low"] as const).map((level) => (
                <label key={level} className="flex items-center gap-2 text-xs font-mono p-2 rounded-sm bg-muted cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications[level]}
                    onChange={() => setNotifications((prev) => ({ ...prev, [level]: !prev[level] }))}
                    className="accent-primary"
                  />
                  <span className="capitalize text-foreground">{level}</span>
                </label>
              ))}
            </div>

            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mt-4">Channels</p>
            <div className="grid grid-cols-2 gap-2">
              {(["email", "slack"] as const).map((ch) => (
                <label key={ch} className="flex items-center gap-2 text-xs font-mono p-2 rounded-sm bg-muted cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications[ch]}
                    onChange={() => setNotifications((prev) => ({ ...prev, [ch]: !prev[ch] }))}
                    className="accent-primary"
                  />
                  <span className="capitalize text-foreground">{ch}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="p-5 rounded-md bg-card tactical-border">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold">Security Recommendations</h3>
          </div>
          <div className="space-y-2">
            {[
              "Enable MFA for all operator accounts",
              "Update firewall rules — 3 entries older than 30 days",
              "Rotate API keys for external integrations",
              "Review access logs for dormant accounts",
            ].map((rec, i) => (
              <div key={i} className="flex items-start gap-2 text-xs font-mono p-2 rounded-sm bg-muted">
                <span className="text-primary mt-0.5">→</span>
                <span className="text-foreground">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
