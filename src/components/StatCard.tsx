import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  variant?: "default" | "safe" | "danger" | "warning";
  subtitle?: string;
}

export function StatCard({ label, value, icon: Icon, variant = "default", subtitle }: StatCardProps) {
  const glowClass = variant === "safe" ? "glow-safe" : variant === "danger" ? "glow-danger" : variant === "warning" ? "glow-warning" : "";
  const iconColor = variant === "safe" ? "text-safe" : variant === "danger" ? "text-destructive" : variant === "warning" ? "text-warning" : "text-primary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className={`p-4 rounded-md bg-card tactical-border ${glowClass}`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{label}</span>
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </div>
      <p className={`text-2xl font-mono font-bold tracking-tight ${iconColor}`}>{value}</p>
      {subtitle && <p className="text-xs font-mono text-muted-foreground mt-1">{subtitle}</p>}
    </motion.div>
  );
}
