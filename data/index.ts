export const siteConfig = {
  name: "Leo Leong",
  fullName: "Leong Ding Xuan, Leo",
  tagline: "Cybersecurity by Training — Software Engineering by Passion",
  subTagline:
    "",
  description:
    "Cybersecurity & Digital forensic Diploma graduate from Temasek Polytechnic with hands-on experience building secure, full-stack applications. Interned at Trend Micro. Currently serving NS — building production-grade projects in my own time.",
  availability: "Available for full-time work from 2nd August 2026",
  email: "leongdingxuan@gmail.com",
  phone: "(65) 90065959",
  linkedin: "https://www.linkedin.com/in/leoleongdingxuan",
  github: "https://github.com/LLDX03",
  location: "Singapore",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Certifications", href: "/certifications" },
  { label: "Contact", href: "/contact" },
];

export type ProjectCategory =
  | "All"
  | "Full Stack"
  | "Cybersecurity"
  | "IoT / Cloud"
  | "Networking"
  | "Data";

export interface Project {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, "All">;
  badge: string;
  description: string;
  overview: string;
  problem: string;
  architecture: string;
  techStack: string[];
  securityNotes: string[];
  challenges: string[];
  lessons: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  sideProject?: boolean;
  tagline?: string;
  imageUrl?: string;
  codeSnippet?: { lang: string; code: string };
}

export const projects: Project[] = [
  {
    id: "leos-cafe",
    title: "Leo's Cafe",
    category: "Full Stack",
    badge: "Personal Project · NS Build",
    description:
      "Full-stack café management app with JWT auth, loyalty tiers, QR code redemptions, table reservations, and SendGrid email verification.",
    overview:
      "A production-grade café platform built during National Service to stay sharp. Simulates a real café business with customer-facing ordering, a loyalty programme, and an admin dashboard.",
    problem:
      "Wanted to build something end-to-end that integrated authentication, email flows, real-time state, and a reward system — all with security-first design from the ground up.",
    architecture:
      "Node.js + Express REST API backend, PostgreSQL with Sequelize ORM, EJS-rendered frontend, JWT sessions stored in httpOnly cookies, bcrypt password hashing, SendGrid transactional email, QR code generation for loyalty redemptions.",
    techStack: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Sequelize ORM",
      "JWT",
      "bcrypt",
      "SendGrid",
      "QR Code",
      "EJS",
      "CSS",
    ],
    securityNotes: [
      "JWT stored in httpOnly cookies (no localStorage)",
      "bcrypt password hashing with salt rounds",
      "Email verification via SendGrid before account activation",
      "Rate limiting on auth endpoints",
      "Environment variables for all secrets — .env.example included",
      "Input validation and output sanitisation on all API routes",
    ],
    challenges: [
      "Designing the loyalty tier system with QR-based redemption flow",
      "Handling concurrent reservation conflicts without double-booking",
      "Structuring PostgreSQL schema for extensibility",
    ],
    lessons: [
      "Importance of designing auth flows before writing any feature code",
      "How database constraints enforce business rules more reliably than application logic",
      "Value of .env discipline — never committing secrets",
    ],
    githubUrl: "https://github.com/LLDX03/cafe-menu",
    featured: true,
    sideProject: true,
    imageUrl: "/projects/leos-cafe.png",
    tagline: "Full-stack café platform built during NS — JWT auth, loyalty tiers, QR redemptions, table reservations, and SendGrid email verification.",
    codeSnippet: {
      lang: "javascript",
      code: `// JWT auth middleware — Leo's Cafe
const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: 'Unauthorised' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.clearCookie('token');
    return res.status(401).json({ error: 'Session expired' });
  }
};`,
    },
  },
  {
    id: "hdb-predictor",
    title: "HDB Resale Price Predictor",
    category: "Data",
    badge: "Personal Project",
    tagline: "Random Forest model trained on Singapore HDB resale data — R²=0.843, MAE S$68,844. Enter flat details and get an instant price estimate with a 5-year projection.",
    description:
      "Machine learning web app that predicts Singapore HDB resale prices using a Random Forest model trained on historical transaction data.",
    overview:
      "Built a full ML pipeline — data cleaning, feature engineering, model training, and a Streamlit web interface — to make HDB resale price prediction accessible to anyone.",
    problem:
      "HDB resale prices vary enormously by town, flat type, floor, and lease remaining. Buyers and sellers have no quick way to estimate fair market value without engaging an agent.",
    architecture:
      "Python data pipeline with pandas for cleaning and feature engineering on 150k+ HDB transactions. Random Forest Regressor via scikit-learn. Streamlit for the interactive web interface with real-time predictions and 5-year price projections.",
    techStack: ["Python", "pandas", "scikit-learn", "Random Forest", "Streamlit"],
    securityNotes: [],
    challenges: [
      "Feature engineering — encoding town, flat type, and storey range meaningfully without leaking target information",
      "Handling remaining lease as a continuous feature from heterogeneous formats",
    ],
    lessons: [
      "Feature engineering has more impact on ML accuracy than model choice alone",
      "Streamlit lets you ship a usable ML demo in hours, not days",
    ],
    githubUrl: "https://github.com/LLDX03/HDB-Resale-Price-Prediction",
    featured: true,
    sideProject: true,
    imageUrl: "/projects/hdb-predictor.png",
  },
  {
    id: "ecosaver",
    title: "EcoSaver — IoT Air Quality Platform",
    category: "IoT / Cloud",
    badge: "Final Year Project · Temasek Polytechnic",
    description:
      "Live IoT sensor platform on Azure. MQTT data pipeline ingests PSI, NO2, SO2, CO, O3, Temperature, and Humidity readings, visualised in real-time daily/weekly charts.",
    overview:
      "A full-stack IoT monitoring platform deployed on Microsoft Azure with a custom domain and SSL/TLS certificates. Built as the Final Year Project for the Diploma in Cybersecurity & Digital Forensics.",
    problem:
      "There was no affordable, real-time air quality monitoring solution that combined consumer-facing dashboards with an admin portal for sensor management and API access for third-party integrations.",
    architecture:
      "Node.js server subscribing to MQTT broker for sensor data ingestion, MySQL + Sequelize ORM for time-series storage, EJS server-rendered frontend with Chart.js visualisations, RESTful API with token-based authentication, deployed on Azure VM with Nginx reverse proxy and Let's Encrypt SSL.",
    techStack: [
      "Node.js",
      "Express.js",
      "MQTT.js",
      "MySQL",
      "Sequelize ORM",
      "Azure",
      "EJS",
      "Chart.js",
      "Nginx",
      "Let's Encrypt",
    ],
    securityNotes: [
      "SSL/TLS via Let's Encrypt — enforced HTTPS",
      "Token-based REST API authentication for third-party access",
      "Nginx reverse proxy isolating application server",
      "Sequelize ORM preventing raw SQL injection",
      "systemd service management for process reliability",
      "Environment-scoped secrets, no credentials in repository",
    ],
    challenges: [
      "Configuring MQTT broker on Azure with reliable reconnection logic",
      "Managing time-series data efficiently without bloating the database",
      "Setting up Nginx + Let's Encrypt SSL on a Linux VM from scratch",
    ],
    lessons: [
      "Real-world cloud deployment is fundamentally different from localhost development",
      "Reverse proxies are essential infrastructure, not optional extras",
      "IoT data pipelines require careful error handling at every ingestion step",
    ],
    githubUrl: "https://github.com/LLDX03/FYP",
    featured: true,
    codeSnippet: {
      lang: "javascript",
      code: `// MQTT data ingestion — EcoSaver
client.on('message', async (topic, payload) => {
  const data = JSON.parse(payload.toString());
  await SensorReading.create({
    psi:         data.psi,
    no2:         data.no2,
    temperature: data.temp,
    humidity:    data.humidity,
    timestamp:   new Date(),
  });
});`,
    },
  },
  {
    id: "pentest",
    title: "Penetration Testing Engagement",
    category: "Cybersecurity",
    badge: "Security Assessment",
    description:
      "Simulated professional pentest applying the Cyber Kill Chain methodology to systematically identify and exploit vulnerabilities across a target network.",
    overview:
      "A structured penetration testing engagement covering reconnaissance, enumeration, exploitation, and reporting — following the Cyber Kill Chain framework used in professional security assessments.",
    problem:
      "Target organisation required an independent security assessment to identify exploitable vulnerabilities before a red team engagement.",
    architecture:
      "Phased engagement: passive/active recon with Nmap, web application testing with Burp Suite, exploitation with Metasploit, post-exploitation analysis, and a formal remediation report with CVSS-scored findings.",
    techStack: [
      "Nmap",
      "Burp Suite",
      "Metasploit",
      "Kali Linux",
      "Wireshark",
      "Cyber Kill Chain",
    ],
    securityNotes: [
      "Followed Cyber Kill Chain: Recon → Weaponise → Deliver → Exploit → Install → C2 → Actions",
      "CVSS scoring applied to all findings",
      "Remediation recommendations provided for every identified vulnerability",
      "All testing conducted in isolated, controlled lab environment",
    ],
    challenges: [
      "Correlating findings from multiple tools into a coherent attack narrative",
      "Distinguishing true positives from false positives during automated scanning",
    ],
    lessons: [
      "Methodology matters more than tools — a structured approach finds more than tool-hopping",
      "Remediation reports are as important as the technical findings themselves",
    ],
    featured: true,
  },
  {
    id: "network-design",
    title: "MNC Network Infrastructure Design",
    category: "Networking",
    badge: "Network Architecture",
    description:
      "Designed WAN connectivity between Southeast Asia offices and overseas cloud facilities for a simulated MNC, with VLAN segmentation and IP calculation.",
    overview:
      "Acting as Network Consultant for a multinational corporation, designed and configured end-to-end network infrastructure in Cisco Packet Tracer — from LAN configuration per office to WAN connectivity and VLAN segmentation.",
    problem:
      "MNC needed to connect multiple regional offices and overseas cloud facilities with secure, segmented, and reliable network infrastructure.",
    architecture:
      "Cisco Packet Tracer simulation with multi-site WAN topology, VLAN segmentation per department, IP subnetting/calculation, and LAN configuration for each office location.",
    techStack: [
      "Cisco Packet Tracer",
      "VLAN",
      "IP Subnetting",
      "WAN Design",
      "LAN Configuration",
    ],
    securityNotes: [
      "VLAN segmentation to isolate departmental traffic",
      "IP calculation to prevent address conflicts across sites",
      "Secure cross-country host communication via proper routing protocols",
    ],
    challenges: [
      "Ensuring consistent IP scheme across multiple geographically dispersed sites",
      "Configuring VLAN inter-routing without creating unintended network exposure",
    ],
    lessons: [
      "Network design decisions made early are very expensive to change later",
      "VLAN segmentation is the network equivalent of the principle of least privilege",
    ],
    featured: false,
  },
  {
    id: "covid-analysis",
    title: "COVID-19 Data Analysis & Predictive Modelling",
    category: "Data",
    badge: "Data Analysis",
    description:
      "Analysed Singapore COVID-19 datasets to derive insights on infection trends, building predictive models and interactive dashboards in KNIME and Power BI.",
    overview:
      "End-to-end data analysis project using KNIME for data preprocessing and predictive modelling, and Power BI for interactive dashboard creation — aimed at informing government preventive measure focus.",
    problem:
      "Needed to determine whether Singapore government preventive measures should focus more on local or imported COVID-19 cases based on infection trend data.",
    architecture:
      "Data ingestion and cleaning in KNIME, feature engineering and predictive modelling, Power BI dashboard for stakeholder-facing visualisation of findings.",
    techStack: ["KNIME", "Power BI", "Data Preprocessing", "Predictive Modelling"],
    securityNotes: [
      "Public dataset used — no PII involved",
      "Data integrity verified before modelling",
    ],
    challenges: [
      "Cleaning inconsistent government-sourced datasets",
      "Selecting the right predictive model for time-series infection data",
    ],
    lessons: [
      "Data quality upstream determines the reliability of every downstream insight",
      "Visualisation choices significantly affect how findings are interpreted by stakeholders",
    ],
    featured: false,
  },
];

export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  skills?: Skill[];
  tags?: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Programming Languages",
    icon: "code",
    skills: [
      { name: "JavaScript / Node.js", level: 88 },
      { name: "Python", level: 78 },
      { name: "Java", level: 65 },
      { name: "PHP", level: 60 },
      { name: "HTML / CSS / SQL", level: 85 },
    ],
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    icon: "shield",
    skills: [
      { name: "Penetration Testing", level: 78 },
      { name: "Secure Coding (OWASP)", level: 82 },
      { name: "Vulnerability Assessment", level: 75 },
      { name: "Digital Forensics", level: 72 },
      { name: "Network Security", level: 70 },
    ],
  },
  {
    id: "frameworks",
    label: "Frameworks & Libraries",
    icon: "layers",
    tags: [
      "Express.js",
      "Sequelize ORM",
      "MQTT.js",
      "Nodemailer",
      "EJS",
      "Chart.js",
      "React (learning)",
      "Next.js (learning)",
    ],
  },
  {
    id: "security-tools",
    label: "Security Tools",
    icon: "bug",
    tags: [
      "Burp Suite",
      "Nmap",
      "Metasploit",
      "FTK Imager",
      "Autopsy",
      "Kali Linux",
      "Wireshark",
      "Cisco Packet Tracer",
    ],
  },
  {
    id: "cloud-infra",
    label: "Cloud & Infrastructure",
    icon: "cloud",
    tags: [
      "Microsoft Azure",
      "MySQL",
      "PostgreSQL",
      "Linux (Red Hat)",
      "Nginx",
      "VirtualBox",
      "Android Studio",
      "Git",
    ],
  },
  {
    id: "data-tools",
    label: "Data & Other",
    icon: "bar-chart",
    tags: ["KNIME", "Power BI", "Firebase", "Adobe XD", "SendGrid"],
  },
];

export const certifications = [
  {
    id: "aws",
    type: "Certification",
    name: "AWS Academy Cloud Foundations",
    issuer: "Amazon Web Services",
    date: "AWS Academy",
    highlight: false,
  },
  {
    id: "ndg",
    type: "Certification",
    name: "NDG Linux Unhatched",
    issuer: "Cisco Networking Academy",
    date: "NDG / Cisco",
    highlight: false,
  },
  {
    id: "diploma",
    type: "Academic",
    name: "Diploma in Cybersecurity & Digital Forensics",
    issuer: "Temasek Polytechnic",
    date: "April 2021 – May 2024",
    highlight: true,
  },
  {
    id: "trendmicro",
    type: "Internship",
    name: "Technical Intern — Cybersecurity POC",
    issuer: "Trend Micro",
    date: "April 2023 – September 2023",
    highlight: true,
  },
];

export const achievements = [
  "Director's List — AY2021/2022, Temasek Polytechnic",
  "Edusave Certificate of Academic Achievement, 2022",
  "Distinction — Network Technology, Coding & Development Project",
  "Edusave Scholarship — 2018 & 2020 (Pasir Ris Secondary School)",
  "Li Kaiyan Progress Award — 2020",
];

export const timeline = [
  {
    year: "2025 – Present",
    title: "National Service · Building in spare time",
    org: "",
    description:
      "Serving NS while developing Leo's Cafe — a full-stack project to stay production-sharp. Available for full-time roles from 2nd August 2026.",
  },
  {
    year: "Apr 2023 – Sep 2023",
    title: "Technical Intern",
    org: "Trend Micro",
    description:
      "Developed POC security documentation, validated detection & remediation behaviour in VM environments, supported Sales Engineers and Technical Account Managers with client cybersecurity solutions.",
  },
  {
    year: "Apr 2021 – May 2024",
    title: "Diploma in Cybersecurity & Digital Forensics",
    org: "Temasek Polytechnic",
    description:
      "Director's List AY2021/22. Distinctions in Network Technology, Coding & Development. Final Year Project: EcoSaver IoT Air Quality Platform on Azure.",
  },
  {
    year: "2019 – 2024",
    title: "Part-Time Roles",
    org: "Retail · Banquet · F&B · Warehouse",
    description:
      "Developed strong communication and problem-solving skills across diverse customer-facing and operational environments.",
  },
  {
    year: "2016 – 2020",
    title: "Cambridge GCE O-Level",
    org: "Pasir Ris Secondary School",
    description:
      "Edusave Scholarship (2018, 2020). Edusave Certificate of Academic Achievement (2019). Li Kaiyan Progress Award (2020).",
  },
  {
    year: "Upcoming",
    title: "Computer Science Degree",
    org: "",
    description:
      "Planning to pursue a CS degree to deepen software engineering foundations and complement cybersecurity expertise.",
  },
];
