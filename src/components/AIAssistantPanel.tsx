import { motion, AnimatePresence } from "framer-motion";
import { X, Bot } from "lucide-react";
import { useState, useEffect } from "react";

const aiMessages = [
  { role: "ai" as const, text: "Sentinel AI online. Monitoring 847 endpoints across 12 network segments." },
  { role: "ai" as const, text: "Anomaly detected: PID 7888 (unknown_proc) showing unusual outbound SSH traffic to 185.220.101.1. Pattern matches 'Lateral Movement' heuristics." },
  { role: "ai" as const, text: "Recommendation: Isolate node and terminate PID 7888. Confidence: 94.2%." },
  { role: "ai" as const, text: "Entropy score in Sector 7G increased by 14%. Monitoring for escalation." },
  { role: "ai" as const, text: "DDoS mitigation active. Rate limiting applied to 45.33.32.156. Traffic reduced by 73%." },
];

function ThinkingWave() {
  return (
    <div className="flex items-end gap-0.5 h-4">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-0.5 bg-primary rounded-full"
          animate={{ height: ["4px", "16px", "4px"] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function AIAssistantPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState(aiMessages.slice(0, 1));
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (messages.length >= aiMessages.length) return;
    const timer = setTimeout(() => {
      setThinking(true);
      setTimeout(() => {
        setThinking(false);
        setMessages((prev) => [...prev, aiMessages[prev.length]]);
      }, 1500);
    }, 3000);
    return () => clearTimeout(timer);
  }, [open, messages.length]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 380, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="h-full border-l border-border bg-card flex flex-col overflow-hidden shrink-0"
        >
          <div className="h-14 flex items-center justify-between px-4 border-b border-border shrink-0">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Sentinel AI</span>
              <div className="w-1.5 h-1.5 rounded-full bg-safe animate-pulse-safe" />
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="p-3 rounded-md bg-muted tactical-border"
              >
                <p className="text-xs font-mono text-primary mb-1">SENTINEL-AI</p>
                <p className="text-sm text-foreground leading-relaxed">{msg.text}</p>
              </motion.div>
            ))}
            {thinking && (
              <div className="p-3 rounded-md bg-muted tactical-border flex items-center gap-2">
                <ThinkingWave />
                <span className="text-xs text-muted-foreground font-mono">Analyzing...</span>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-border shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask Sentinel AI..."
                className="flex-1 bg-muted text-sm px-3 py-2 rounded-md text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary tactical-border"
              />
              <button className="px-3 py-2 bg-primary text-primary-foreground rounded-md text-xs font-mono hover:bg-primary/90 transition-colors">
                Send
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
