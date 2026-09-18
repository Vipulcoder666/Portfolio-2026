// client/src/data/content.js
// Single source of truth for all portfolio content.
// All metrics, claims, and links verified against real project artifacts.

export const personalInfo = {
  name: "Vipul Shrivastav",
  initials: "VS",
  title: "Software Engineer",
  company: "SmarDen Automation",
  location: "New Delhi, India",
  timezone: "Asia/Kolkata",
  availability: "Available for Software Engineering Roles & Freelance Work",
  headline: {
    prefix: "I build computer vision systems that run",
    emphasis: "real", // Rendered in Instrument Serif italic
    suffix: "factories."
  },
  headlines: [
    {
      topic: "Computer Vision",
      prefix: "I build computer vision systems that run",
      emphasis: "real",
      suffix: "factories.",
      panel: {
        title: "INSPECTION_TELEMETRY // LIVE",
        tag: "ACCURACY_BENCHMARKS",
        metrics: [
          { label: "mAP@0.5", value: "91.9%", context: "Carton Box Detection" },
          { label: "Precision", value: "99.0%", context: "Production Model" },
          { label: "Counting Accuracy", value: "99.8%", context: "Conveyor Belt Line" },
          { label: "Edge Speed", value: "30+ FPS", context: "Raspberry Pi Deployment" }
        ],
        footerInfo: "HARDWARE: Raspberry Pi 4 · Linux OS · IP / RTSP Feeds",
        showSparkline: true
      }
    },
    {
      topic: "AI / ML",
      prefix: "I train and deploy custom AI/ML models with",
      emphasis: "production",
      suffix: "precision.",
      panel: {
        title: "MODEL_EVALUATION // TRAIN",
        tag: "CONVERGENCE_METRICS",
        metrics: [
          { label: "Validation mAP", value: "91.9%", context: "IOU Threshold 0.5" },
          { label: "Precision Score", value: "99.0%", context: "Zero False Defect Goal" },
          { label: "Annotation Saved", value: "80%", context: "Roboflow Active Learning" },
          { label: "Inference Speed", value: "2.1 ms", context: "YOLOv11 · T4 GPU Benchmark" }
        ],
        footerInfo: "TRAINED: Google Colab T4 GPU · Roboflow 4x Augmentation",
        showSparkline: true
      }
    },
    {
      topic: "Python",
      prefix: "I write high-throughput Python pipelines for",
      emphasis: "edge",
      suffix: "hardware.",
      panel: {
        title: "RUNTIME_PIPELINE // EDGE",
        tag: "EMBEDDED_PERFORMANCE",
        metrics: [
          { label: "Frame Budget", value: "30+ FPS", context: "Real-Time Conveyor Clock" },
          { label: "Spatial Filter", value: "ROI-Based", context: "OpenCV MOG2 Subtraction" },
          { label: "Lighting Shift", value: "Adaptive", context: "Foreground Pixel Auto Pause" },
          { label: "Platform Target", value: "ARM64", context: "Raspberry Pi 4 / Linux Shell" }
        ],
        footerInfo: "MODULAR: detector.py · counter.py · RTSP Streams",
        showSparkline: false
      }
    },
    {
      topic: "NodeJS",
      prefix: "I architect scalable Node.js services for",
      emphasis: "real-time",
      suffix: "telemetry.",
      panel: {
        title: "SERVICE_CLUSTER // MERN",
        tag: "REALTIME_BACKEND",
        metrics: [
          { label: "Pipeline Latency", value: "< 50 ms", context: "Detection to Alert Push" },
          { label: "Stream Ingestion", value: "Multi-Feed", context: "IP Cameras & Live Feeds" },
          { label: "Database Layer", value: "MongoDB", context: "Mongoose Audit Logging" },
          { label: "Web Interface", value: "React 19", context: "Dark Command Dashboard" }
        ],
        footerInfo: "BACKEND: Node.js · Express.js · REST APIs · MongoDB",
        showSparkline: false
      }
    },
    {
      topic: "REST APIs",
      prefix: "I design resilient REST APIs that",
      emphasis: "scale",
      suffix: "reliably.",
      panel: {
        title: "API_GATEWAY // CONTRACTS",
        tag: "RESTFUL_ARCHITECTURE",
        metrics: [
          { label: "Response Latency", value: "p95 < 45 ms", context: "Optimized Express Routes" },
          { label: "Auth Protocol", value: "JWT", context: "Stateless Token Security" },
          { label: "API Spec", value: "REST / JSON", context: "Postman Verified Endpoints" },
          { label: "Notification", value: "Nodemailer", context: "Automated Dispatch Engine" }
        ],
        footerInfo: "ENDPOINTS: POST /api/contact · GET /api/projects",
        showSparkline: false
      }
    }
  ],
  subparagraph:
    "Software Engineer skilled in building production-grade MERN web applications, REST APIs, and industrial Computer Vision systems (YOLOv11, OpenCV). Delivered high-precision detection & counting pipelines deployed for enterprise automotive manufacturing and quick-commerce clients.",
  roles: [
    "Software Engineer",
    "Computer Vision & ML Developer",
    "Full-Stack MERN Specialist",
    "Python & REST API Specialist"
  ],
  philosophy: {
    statement: "I can automate anything.",
    subtext: "Kuch bhi automate kar dunga."
  },
  links: {
    resume: "https://drive.google.com/file/d/1xGaalmK38J-D7yqqvbfINR_RKUYTp_NS/view?usp=drive_link",
    github: "https://github.com/Vipulcoder666",
    linkedin: "https://linkedin.com/in/vipul-shrivastav-7506a5258",
    leetcode: "https://leetcode.com/u/vipul_666",
    email: "shrivastav.vipul252@gmail.com",
    phone: "+91-7897516265" // Note: kept in data, never rendered on site
  }
};

// Hero Inference Panel: project outcomes only
export const heroInferenceMetrics = [
  {
    label: "mAP@0.5",
    value: "91.9%",
    context: "Carton Box Detection"
  },
  {
    label: "Precision",
    value: "99.0%",
    context: "Production Model"
  },
  {
    label: "Counting Accuracy",
    value: "99.8%",
    context: "Conveyor Belt Line"
  },
  {
    label: "Edge Speed",
    value: "30+ FPS",
    context: "Raspberry Pi Deployment"
  }
];

export const marqueeItems = [
  "YOLOv11",
  "OpenCV",
  "PyTorch",
  "Edge Inference",
  "Node.js",
  "Express.js",
  "MongoDB",
  "React 19",
  "MOG2 Background Subtraction",
  "Roboflow",
  "Raspberry Pi",
  "REST APIs",
  "Industrial Automation",
  "Computer Vision"
];

export const projects = [
  {
    id: "carton-box-detection",
    index: "01",
    status: "Client deployment",
    title: "Automated Industrial Carton Box Detection",
    outcome: "91.9% mAP and 99.0% precision real-time factory QC inspection",
    clientDisplayName: "Automotive Manufacturing Enterprise",
    clientIsPublic: false,
    media: {
      type: "image",
      src: "/assets/images/carton-detection.jpg",
      poster: "/assets/images/carton-detection.jpg"
      // TODO: replace with real inference footage
    },
    metrics: [
      { label: "mAP@0.5", value: "91.9%", context: "IOU threshold 0.5" },
      { label: "Precision", value: "99.0%", context: "Zero false-defect tolerance" },
      { label: "Inference", value: "2.1 ms", context: "YOLOv11n · T4 GPU" } // TODO: confirm model size & hardware
    ],
    problem:
      "Manual counting and quality verification on high-speed factory packaging lines caused bottleneck delays and missed mislabeled or damaged cartons under variable industrial lighting.",
    approach: [
      "Built a modular CartonBoxDetector class supporting image, video, and live IP camera / webcam streams with zero code changes.",
      "Executed a full end-to-end ML pipeline: data collection, Roboflow annotation, 4x data augmentation, and model training on a Colab T4 GPU.",
      "Applied active learning to cut manual annotation effort by 80%; validated across multiple lighting and traffic conditions for false-count-free operation."
    ],
    results: [
      "91.9% mAP@0.5 and 99.0% precision achieved in production tests.",
      "2.1 ms inference latency enabling 60 FPS real-time conveyor tracking.",
      "Full ownership from data collection to deployment on factory floor streams."
    ],
    technologies: ["Python", "YOLOv11", "OpenCV", "Roboflow", "PyTorch", "REST APIs"]
  },
  {
    id: "conveyor-counting-system",
    index: "02",
    status: "Client deployment",
    title: "High-Speed Conveyor Belt Product Counting",
    outcome: "99.8% counting accuracy at 30+ FPS deployed on edge Raspberry Pi",
    clientDisplayName: "Quick-Commerce Fulfillment Network",
    clientIsPublic: false,
    media: {
      type: "image",
      src: "/assets/images/conveyor-counting.jpg",
      poster: "/assets/images/conveyor-counting.jpg"
      // TODO: replace with real inference footage
    },
    metrics: [
      { label: "Accuracy", value: "99.8%", context: "Fulfillment micro-warehouse line" },
      { label: "Throughput", value: "30+ FPS", context: "Raspberry Pi edge hardware" },
      { label: "Lighting Tolerance", value: "Adaptive", context: "Foreground pixel auto pause/resume" }
    ],
    problem:
      "Automating inventory intake in dark stores required low-cost edge deployment that would not miscount products when warehouse bulbs flickered or lighting switched.",
    approach: [
      "Designed a production-ready POC for Raspberry Pi deployment using MOG2 background subtraction and a virtual counting line to track moving products.",
      "Built lighting-change detection using foreground pixel percentage to auto pause/resume counting, eliminating false counts during bulb ON/OFF events.",
      "Optimized for real-time performance with ROI-based processing and a modular codebase (detector.py, counter.py); supports USB camera, IP webcam, and video file inputs."
    ],
    results: [
      "Maintained 99.8% counting precision on moving inventory items.",
      "Sustained 30+ FPS execution on edge hardware with minimal CPU thermal throttling.",
      "Supports USB cameras, RTSP streams, and recorded audit streams."
    ],
    technologies: ["Python", "OpenCV", "MOG2", "NumPy", "Raspberry Pi", "Linux"]
  },
  {
    id: "smart-appliance-vision-control",
    index: "03",
    status: "Internal R&D", // TODO: confirm for projects 03, 04, 05
    title: "AI Vision Occupancy & Climate Automation",
    outcome: "Commercial HVAC and lighting power optimization using existing CCTV streams",
    clientDisplayName: "Commercial Facility Automation",
    clientIsPublic: false,
    media: {
      type: "image",
      src: "/assets/images/appliance-energy-control.jpg",
      poster: "/assets/images/appliance-energy-control.jpg"
      // TODO: replace with real inference footage
    },
    metrics: [
      {
        label: "Power Reduction",
        value: "Up to 42%",
        context: "HVAC & lighting in pilot zones",
        verified: false // TODO: verify where it was measured and for how long. Keep hidden until confirmed.
      },
      { label: "Added Hardware", value: "0 Sensors", context: "Leverages existing CCTV" },
      { label: "Latency", value: "< 50 ms", context: "Zone occupancy update" }
    ],
    problem:
      "Commercial offices and restaurants waste substantial energy running high-power HVAC and lighting in unoccupied zones, while traditional PIR motion sensors are expensive to retrofit and lack occupancy density awareness.",
    approach: [
      "Engineered a zero-sensor computer vision pipeline analyzing live CCTV feeds for real-time room occupancy and spatial density.",
      "Mapped crowd density thresholds to dynamic AC setpoints (e.g. 18°C during peak rushes; 28°C-32°C eco mode during low density).",
      "Integrated automated zone power relays to shut down fans and lights when areas clear."
    ],
    results: [
      "Eliminated the cost and complexity of installing dedicated sensor hardware.",
      "Demonstrated up to 42% HVAC energy reduction in simulated commercial deployment zones."
    ],
    technologies: ["Python", "OpenCV", "YOLOv8/v11", "Flask", "Node.js", "IoT Relays"]
  },
  {
    id: "human-surveillance-theft",
    index: "04",
    status: "Internal R&D", // TODO: confirm for projects 03, 04, 05
    title: "Multi-Camera Surveillance & Anomaly Detection",
    outcome: "Sub-50ms suspicious behavior telemetry and automated threat scoring",
    clientDisplayName: "Retail Security Solutions",
    clientIsPublic: false,
    media: {
      type: "image",
      src: "/assets/images/surveillance-theft.jpg",
      poster: "/assets/images/surveillance-theft.jpg"
      // TODO: replace with real inference footage
    },
    metrics: [
      { label: "Pipeline Latency", value: "< 50 ms", context: "Frame capture to alert" },
      { label: "Tracking", value: "Multi-Camera", context: "Cross-stream human tracking" },
      { label: "Telemetry", value: "Real-time", context: "Spatial risk matrix scoring" }
    ],
    problem:
      "Manual surveillance monitoring across multiple retail camera feeds leads to high operator fatigue and missed theft or unauthorized stockroom access events.",
    approach: [
      "Built multi-camera human tracking pipeline with spatial trajectory logging.",
      "Implemented behavior scoring algorithm to detect loitering and restricted inventory interaction.",
      "Engineered dark-themed command center interface with live alert logging and push notifications."
    ],
    results: [
      "End-to-end detection to notification pipeline running under 50 ms.",
      "Real-time event logging connected to Express backend API."
    ],
    technologies: ["Python", "OpenCV", "YOLOv8/v11", "Node.js", "Express.js", "React", "MongoDB"]
  },
  {
    id: "aso-automation-tool",
    index: "05",
    status: "Personal project", // TODO: confirm for projects 03, 04, 05
    title: "App Store Optimization (ASO) Intelligence Platform",
    outcome: "Daily ranking and metadata tracking across 10,000+ app store keywords",
    clientDisplayName: "Digital Growth Intelligence",
    clientIsPublic: false,
    media: {
      type: "image",
      src: "/assets/images/aso-automation.jpg",
      poster: "/assets/images/aso-automation.jpg"
      // TODO: replace with real inference footage
    },
    metrics: [
      { label: "Keywords Tracked", value: "10,000+", context: "Apple App Store & Google Play" },
      { label: "Update Cadence", value: "Daily", context: "Automated ranking ingestion" },
      { label: "Workflow Gain", value: "10x", context: "Compared to manual position audits" }
    ],
    problem:
      "Tracking mobile app keyword performance manually across iOS and Android stores is slow, error-prone, and misses high-velocity competitor ranking shifts.",
    approach: [
      "Built full-stack automation platform using Node.js, Express, React, and MongoDB.",
      "Scheduled automated daily scrapers for Apple App Store and Google Play keyword indexes.",
      "Designed analytics dashboard with visibility trend curves and keyword gap analysis."
    ],
    results: [
      "Tracks 10,000+ keywords daily with automated gap reports.",
      "Replaced manual spreadsheet tracking with an automated SaaS analytics dashboard."
    ],
    technologies: ["Node.js", "Express.js", "React", "MongoDB", "CSS Modules", "REST APIs"]
  }
];

export const capabilities = [
  {
    index: "01",
    title: "Computer Vision & ML",
    description:
      "Design, train, and deploy machine vision systems for industrial inspection, sorting, and edge tracking.",
    deliverables: [
      "Custom YOLOv11 and OpenCV detection pipelines",
      "Active learning dataset annotation and augmentation (Roboflow)",
      "Edge hardware deployment (Raspberry Pi, Linux)", // Note: TensorRT/ONNX removed // TODO: re-add if used
      "Lighting-invariant background subtraction and tracking"
    ]
  },
  {
    index: "02",
    title: "Industrial Automation",
    description:
      "Connect camera feeds, edge hardware, and backends to automate factory floor inspection and logistics.",
    deliverables: [
      "Real-time IP camera and RTSP stream ingestion",
      "CCTV occupancy analytics for automated climate control",
      "Conveyor belt product counting with optical tripwires",
      "Hardware relay integration and sub-50ms alerts"
    ]
  },
  {
    index: "03",
    title: "Full-Stack Products & APIs",
    description:
      "Build production web applications and REST APIs that display telemetry, store audits, and handle workflows.",
    deliverables: [
      "Node.js and Express RESTful API architecture",
      "MongoDB database modeling, schemas, and aggregation",
      "React interfaces with design tokens and CSS Modules",
      "Authentication, webhooks, and automated email notifications"
    ]
  }
];

export const experience = [
  {
    role: "Software Engineer",
    company: "SmarDen Automation",
    location: "Haryana, India",
    period: "June 2026 – Present",
    type: "Full-time",
    description:
      "Software engineer building real-time backends, computer vision pipelines, and REST APIs deployed for automotive manufacturing and quick-commerce operations.",
    achievements: [
      "Engineered vision detection pipeline achieving 91.9% mAP and 99.0% precision for an automotive manufacturing client.",
      "Architected real-time Python backend for conveyor product-counting pipeline running on Raspberry Pi at 30+ FPS.",
      "Developed REST APIs and connected vision models with local database layers for continuous audit tracking.",
      "Applied active learning with Roboflow, reducing manual annotation effort by 80%."
    ]
  }
];

export const education = {
  degree: "B.Tech in Computer Science & Engineering",
  institution: "Maharana Pratap Group of Institutions, Kanpur",
  period: "2022 – 2026",
  fundamentals: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming (OOP)",
    "Database Management Systems (DBMS)",
    "Operating Systems & Linux",
    "Software Engineering & SDLC"
  ]
};

export const credentials = [
  { label: "HackerRank 5★", detail: "Problem Solving & SQL" },
  { label: "LeetCode 100+", detail: "Algorithms Solved" },
  { label: "MongoDB Basics", detail: "GeeksforGeeks Certified" }
];

export const stackGroups = [
  {
    category: "Languages",
    items: ["Python", "JavaScript (ES6+)", "SQL", "HTML5 & CSS3"]
  },
  {
    category: "Computer Vision & ML",
    items: ["YOLOv11", "OpenCV", "Roboflow", "MOG2 Subtraction", "NumPy", "PyTorch"]
  },
  {
    category: "Backend & Storage",
    items: ["Node.js", "Express.js", "REST APIs", "MongoDB", "Mongoose ORM", "MySQL"]
  },
  {
    category: "Frontend & Animation",
    items: ["React 19", "Vite", "GSAP (ScrollTrigger, SplitText)", "Framer Motion", "CSS Modules"]
  },
  {
    category: "Hardware & Edge",
    items: ["Raspberry Pi", "IP / RTSP Cameras", "Linux Shell", "IoT Relays"]
  },
  {
    category: "Tools & DevOps",
    items: ["Git & GitHub", "Postman", "VS Code", "Vercel", "Nodemailer"]
  }
];

export const workflowSteps = [
  {
    number: "01",
    title: "Discover & Scope",
    description: "Analyze camera stream specs, environment constraints, hardware limitations, and target metrics."
  },
  {
    number: "02",
    title: "Prototype & Annotate",
    description: "Data collection, active-learning Roboflow annotation, and baseline model training to benchmark accuracy."
  },
  {
    number: "03",
    title: "Build & Optimize",
    description: "Write modular Python/Node code, optimize inference for edge hardware, and assemble telemetry interfaces."
  },
  {
    number: "04",
    title: "Deploy & Support",
    description: "Factory floor deployment, real-world lighting validation, continuous telemetry, and post-launch maintenance."
  }
];

export const services = [
  {
    name: "REST API & Backend MVP",
    tagline: "Tailored Architecture",
    description: "Custom Node.js and Express backend with MongoDB database models, JWT authentication, and REST endpoints.",
    features: [
      "Node.js & Express RESTful API",
      "MongoDB schema design & Mongoose setup",
      "JWT authentication and secure middleware",
      "Postman documentation",
      "Agile delivery"
    ]
  },
  {
    name: "Custom Computer Vision Pipeline",
    tagline: "Industrial Grade AI",
    featured: true,
    description: "Machine vision detection or counting pipeline tailored for factory, warehouse, or facility camera feeds.",
    features: [
      "YOLOv11 & OpenCV object detection model",
      "Dataset annotation & augmentation (Roboflow)",
      "Real-time camera stream / video inference",
      "Raspberry Pi / edge hardware optimization",
      "Python API & dashboard interface"
    ]
  },
  {
    name: "Full-Stack MERN Web Application",
    tagline: "Complete Digital Product",
    description: "React frontend, Express backend, and MongoDB database full-stack platform built with custom design tokens.",
    features: [
      "React frontend with CSS Modules & tokens",
      "Express backend & MongoDB integration",
      "Responsive layout for mobile and desktop",
      "Deployment setup (Vercel / Render / AWS)",
      "Post-launch maintenance support"
    ]
  }
];

// Note: Testimonials component kept but not rendered until attributed quotes are provided.
// Data shape for future use: { quote: string, name: string, title: string, company: string, avatar?: string }
export const testimonials = [];

export const contactFormOptions = {
  hiringProjectTypes: [
    "Full-Time Engineering Role",
    "Contract / Consulting Engagement",
    "Technical Advisory"
  ],
  clientProjectTypes: [
    "Computer Vision Pipeline",
    "Industrial Automation System",
    "Full-Stack MERN Application",
    "REST API Backend",
    "General Inquiry"
  ],
  budgetRanges: [
    "Flexible / Open Discussion",
    "Starter MVP Project",
    "Medium Custom Solution",
    "Large Enterprise System"
  ]
};
