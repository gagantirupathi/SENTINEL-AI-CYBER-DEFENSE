import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [operatorId, setOperatorId] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [error, setError] = useState("");

  // Normal login credentials
  const validUser = {
    email: "admin@sentinel.ai",
    password: "sentinel2026",
    role: "admin",
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      operatorId === validUser.email &&
      accessKey === validUser.password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", validUser.role);
      localStorage.setItem("userEmail", validUser.email);

      navigate("/dashboard");
    } else {
      setError("Invalid Operator ID or Access Key");
    }
  };

  const handleDemoLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", "demo");
    localStorage.setItem("userEmail", "demo@sentinel.ai");

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="fixed inset-0 scanline pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 tactical-border mb-4 glow-primary">
            <Shield className="w-6 h-6 text-primary" />
          </div>

          <h1
            className="text-xl font-bold tracking-tight"
            style={{ letterSpacing: "-0.02em" }}
          >
            SentinelAI
          </h1>

          <p className="text-xs font-mono text-muted-foreground mt-1">
            Secure Authentication Required
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="p-6 rounded-md bg-card tactical-border space-y-4">
            <div>
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Operator ID
              </label>
              <input
                type="text"
                value={operatorId}
                onChange={(e) => setOperatorId(e.target.value)}
                placeholder="Enter operator email"
                className="w-full bg-muted text-sm px-3 py-2 rounded-md text-foreground outline-none focus:ring-1 focus:ring-primary tactical-border font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Access Key
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  placeholder="Enter access key"
                  className="w-full bg-muted text-sm px-3 py-2 rounded-md text-foreground outline-none focus:ring-1 focus:ring-primary tactical-border font-mono pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs font-mono">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-md text-sm font-mono bg-primary text-primary-foreground hover:bg-primary/90 transition-colors glow-primary"
            >
              Authenticate
            </button>
          </div>
        </form>

        <button
          onClick={handleDemoLogin}
          className="w-full mt-3 py-2 rounded-md text-xs font-mono text-muted-foreground hover:text-foreground bg-secondary hover:bg-accent tactical-border transition-colors"
        >
          Demo Access — Skip Authentication
        </button>

        <div className="mt-4 text-center text-[11px] font-mono text-muted-foreground">
          Demo Credentials: admin@sentinel.ai / sentinel2026
        </div>
      </motion.div>
    </div>
  );
}