export interface ThreatLog {
  id: string;
  time: string;
  type: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  source: string;
  action: string;
  details: string;
}

export interface ProcessInfo {
  pid: number;
  name: string;
  cpu: number;
  memory: number;
  status: "safe" | "suspicious" | "blocked";
  anomalyScore: number;
}

export interface NetworkConnection {
  ip: string;
  port: number;
  protocol: string;
  status: "active" | "blocked" | "suspicious";
  bytesIn: number;
  bytesOut: number;
  country: string;
}

const threatTypes = ["Brute Force", "SQL Injection", "DDoS", "Malware", "Phishing", "Port Scan", "XSS", "Ransomware", "Lateral Movement", "Data Exfiltration"];
const actions = ["Blocked", "Quarantined", "Terminated", "Logged", "Isolated"];
const ips = ["192.168.1.105", "10.0.0.45", "172.16.0.88", "45.33.32.156", "198.51.100.23", "203.0.113.50", "91.189.89.226", "185.220.101.1"];
const countries = ["US", "CN", "RU", "DE", "BR", "KR", "IR", "UA"];
const processNames = ["sshd", "nginx", "node", "postgres", "redis-server", "dockerd", "kubelet", "unknown_proc", "cryptominer.sh", "data_exfil"];

export function generateThreatLogs(count: number): ThreatLog[] {
  return Array.from({ length: count }, (_, i) => {
    const severities: ThreatLog["severity"][] = ["Critical", "High", "Medium", "Low"];
    const sev = severities[Math.floor(Math.random() * severities.length)];
    const now = new Date();
    now.setMinutes(now.getMinutes() - i * Math.floor(Math.random() * 15));
    return {
      id: `TH-${String(1000 + i).padStart(4, "0")}`,
      time: now.toISOString().replace("T", " ").slice(0, 19),
      type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
      severity: sev,
      source: ips[Math.floor(Math.random() * ips.length)],
      action: actions[Math.floor(Math.random() * actions.length)],
      details: `Anomaly score: ${(Math.random() * 100).toFixed(1)}%`,
    };
  });
}

export function generateProcesses(): ProcessInfo[] {
  return processNames.map((name, i) => ({
    pid: 1000 + i * 111,
    name,
    cpu: +(Math.random() * 80).toFixed(1),
    memory: +(Math.random() * 60).toFixed(1),
    status: i >= 7 ? "suspicious" : i >= 9 ? "blocked" : "safe",
    anomalyScore: i >= 7 ? +(50 + Math.random() * 50).toFixed(0) : +(Math.random() * 30).toFixed(0),
  }));
}

export function generateNetworkConnections(): NetworkConnection[] {
  return ips.map((ip, i) => ({
    ip,
    port: [22, 80, 443, 3306, 5432, 8080, 6379, 27017][i % 8],
    protocol: ["TCP", "UDP", "TCP", "TCP", "TCP", "HTTP", "TCP", "TCP"][i % 8],
    status: i >= 6 ? "suspicious" : i >= 7 ? "blocked" : "active",
    bytesIn: Math.floor(Math.random() * 50000),
    bytesOut: Math.floor(Math.random() * 30000),
    country: countries[i % countries.length],
  }));
}

export function generateChartData() {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const h = String(i).padStart(2, "0") + ":00";
    return {
      time: h,
      threats: Math.floor(Math.random() * 20 + (i > 8 && i < 20 ? 10 : 2)),
      blocked: Math.floor(Math.random() * 15 + (i > 8 && i < 20 ? 8 : 1)),
      traffic: Math.floor(Math.random() * 1000 + 200),
    };
  });
  return hours;
}

export const attackTypeDistribution = [
  { name: "DDoS", value: 28, fill: "hsl(217, 91%, 60%)" },
  { name: "Brute Force", value: 22, fill: "hsl(0, 84%, 60%)" },
  { name: "SQL Injection", value: 18, fill: "hsl(38, 92%, 50%)" },
  { name: "Malware", value: 15, fill: "hsl(142, 70%, 50%)" },
  { name: "Phishing", value: 10, fill: "hsl(280, 65%, 60%)" },
  { name: "Other", value: 7, fill: "hsl(215, 20%, 55%)" },
];
