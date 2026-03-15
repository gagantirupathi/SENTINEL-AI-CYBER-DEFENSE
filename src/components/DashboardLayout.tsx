import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Shield, LayoutDashboard, FileText, BarChart3, Settings,
  LogOut, AlertTriangle, Lock, ChevronLeft, ChevronRight, Bot
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AIAssistantPanel } from "./AIAssistantPanel";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FileText, label: "Threat Logs", path: "/threat-logs" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [lockdownActive, setLockdownActive] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Scanline overlay */}
      <div className="fixed inset-0 scanline z-50 pointer-events-none" />

      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 220 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="h-full flex flex-col border-r border-border bg-sidebar shrink-0"
      >
        <div className="h-14 flex items-center px-4 border-b border-border gap-2">
          <Shield className="w-6 h-6 text-primary shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-semibold text-sm text-foreground whitespace-nowrap overflow-hidden"
              >
                SentinelAI
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 py-3 space-y-1 px-2">
          {navItems.map(({ icon: Icon, label, path }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors duration-150
                  ${active
                    ? "bg-primary/10 text-primary tactical-border glow-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="whitespace-nowrap"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t border-border space-y-1">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent w-full transition-colors"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            {!collapsed && <span>Collapse</span>}
          </button>
          <Link
            to="/login"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-destructive hover:bg-accent w-full transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </Link>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 flex items-center justify-between px-6 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${lockdownActive ? "bg-destructive animate-pulse-danger" : "bg-safe animate-pulse-safe"}`} />
            <span className="text-sm font-mono text-muted-foreground">
              {lockdownActive ? "LOCKDOWN ACTIVE" : "SYSTEM OPERATIONAL"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAiOpen(!aiOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono bg-primary/10 text-primary hover:bg-primary/20 tactical-border transition-colors"
            >
              <Bot className="w-3.5 h-3.5" />
              AI Assistant
            </button>
            <button
              onClick={() => setLockdownActive(!lockdownActive)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-150
                ${lockdownActive
                  ? "bg-destructive text-destructive-foreground glow-danger"
                  : "bg-destructive/10 text-destructive hover:bg-destructive/20 tactical-border"
                }`}
            >
              <Lock className="w-3.5 h-3.5" />
              {lockdownActive ? "DEACTIVATE" : "EMERGENCY LOCKDOWN"}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>

      {/* AI Assistant Panel */}
      <AIAssistantPanel open={aiOpen} onClose={() => setAiOpen(false)} />
    </div>
  );
}
