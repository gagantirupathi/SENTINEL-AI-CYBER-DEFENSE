import { Link } from "react-router-dom";
import { Shield, Activity, Brain, Lock, AlertTriangle, Zap, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { RadarWidget } from "@/components/RadarWidget";

const features = [
  { icon: Activity, title: "Real-Time Monitoring", desc: "Continuous surveillance of all system processes, network traffic, and endpoint behaviors." },
  { icon: Brain, title: "AI Anomaly Detection", desc: "Machine learning models detect zero-day threats and unusual patterns before damage occurs." },
  { icon: Lock, title: "Automated Response", desc: "Instantly isolate compromised nodes, terminate malicious processes, and block threat actors." },
  { icon: AlertTriangle, title: "Threat Intelligence", desc: "Cross-reference attacks against global threat databases for real-time classification." },
  { icon: Zap, title: "Emergency Lockdown", desc: "One-click system lockdown to contain active breaches and prevent lateral movement." },
  { icon: Shield, title: "Incident Forensics", desc: "Complete audit trail with AI-generated explanations for every detected threat." },
];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm">SentinelAI</span>
          </div>
          <Link
            to="/login"
            className="px-4 py-1.5 rounded-md text-xs font-mono bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Launch Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono tactical-border mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-safe animate-pulse-safe" />
              System Operational — 0 Active Threats
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
              AI Powered<br />
              <span className="text-primary text-glow-primary">Cyber Defense</span> System
            </motion.h1>
            <motion.p variants={fadeUp} className="text-muted-foreground text-base max-w-md mb-8 leading-relaxed">
              SentinelAI detects, analyzes, and neutralizes cyber threats in real time using advanced machine learning and behavioral analysis.
            </motion.p>
            <motion.div variants={fadeUp} className="flex gap-3">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-mono bg-primary text-primary-foreground hover:bg-primary/90 transition-colors glow-primary"
              >
                Launch Dashboard <ChevronRight className="w-4 h-4" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-mono bg-secondary text-secondary-foreground hover:bg-accent transition-colors tactical-border"
              >
                Learn More
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative p-8 rounded-md bg-card tactical-border glow-primary">
              <RadarWidget />
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded-sm bg-muted tactical-border">
                  <span className="text-muted-foreground">Endpoints</span>
                  <p className="text-foreground font-semibold">847</p>
                </div>
                <div className="p-2 rounded-sm bg-muted tactical-border">
                  <span className="text-muted-foreground">Threats/24h</span>
                  <p className="text-destructive font-semibold">23</p>
                </div>
                <div className="p-2 rounded-sm bg-muted tactical-border">
                  <span className="text-muted-foreground">Blocked</span>
                  <p className="text-safe font-semibold">21</p>
                </div>
                <div className="p-2 rounded-sm bg-muted tactical-border">
                  <span className="text-muted-foreground">Uptime</span>
                  <p className="text-primary font-semibold">99.97%</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-16 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="p-6 rounded-md bg-card tactical-border">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <h3 className="text-sm font-mono font-semibold text-destructive uppercase tracking-wider">The Problem</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cyber attacks occur every 39 seconds. Traditional security tools generate thousands of alerts, overwhelming security teams. By the time a human analyst identifies a real threat, the damage is already done — data exfiltrated, systems compromised, operations halted.
            </p>
          </div>
          <div className="p-6 rounded-md bg-card tactical-border glow-safe">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-4 h-4 text-safe" />
              <h3 className="text-sm font-mono font-semibold text-safe uppercase tracking-wider">The Solution</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              SentinelAI uses AI-driven behavioral analysis to detect anomalies in real time, automatically classifies threats by severity, and executes containment protocols — all in under 200ms. Zero alert fatigue. Zero missed threats.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight mb-8" style={{ letterSpacing: "-0.02em" }}>
            Core Capabilities
          </h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {features.map((f) => (
              <motion.div key={f.title} variants={fadeUp} className="p-5 rounded-md bg-card tactical-border hover:border-primary/30 transition-colors group">
                <f.icon className="w-5 h-5 text-primary mb-3 group-hover:text-glow-primary transition-all" />
                <h3 className="text-sm font-semibold mb-1.5">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5" />
            <span>SentinelAI v2.4.1</span>
          </div>
          <span>© 2026 SentinelAI — All Systems Secured</span>
        </div>
      </footer>
    </div>
  );
}
