const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { isMongoActive, saveInMemoryContact, getInMemoryContacts } = require('../config/db');
const { sendInquiryEmail } = require('../utils/mailer');

// Developer Profile Information Endpoint
router.get('/profile', (req, res) => {
  res.json({
    name: "VIPUL SHRIVASTAV",
    title: "Software Engineer & Computer Vision / MERN Stack Specialist",
    location: "New Delhi, India",
    phone: "+91-7897516265",
    email: "shrivastav.vipul252@gmail.com",
    linkedin: "https://linkedin.com/in/vipul-shrivastav-7506a5258",
    github: "https://github.com/Vipulcoder666",
    leetcode: "https://leetcode.com/u/vipul_666",
    education: {
      degree: "B.Tech, Computer Science & Engineering",
      institution: "Maharana Pratap Group of Institutions, Kanpur",
      timeline: "2022 – 2026"
    },
    experience: {
      role: "Software Engineer",
      company: "SmarDen Automation, Haryana",
      timeline: "June 2026 – Present",
      summary: "Engineered high-performance real-time Python backends and computer vision pipelines deployed for enterprise clients in quick-commerce and industrial automation."
    },
    stats: {
      leetcodeSolved: "100+",
      hackerrankBadge: "5-Star Badge (Problem Solving & SQL)",
      visionPrecision: "99%",
      industrialMAP: "91.9% mAP",
      annotationReduction: "80%"
    }
  });
});

// Projects Endpoint
router.get('/projects', (req, res) => {
  const projectsList = [
    {
      id: "carton-box-detection",
      title: "Automated Industrial Carton Box Detection",
      client: "Industrial Quality Control",
      category: "Computer Vision & ML",
      description: "Modular object detection pipeline using YOLOv11 and OpenCV for high-speed industrial quality control and automated inventory tracking on factory conveyor belts.",
      highlights: [
        "Achieved 91.9% mAP and 99% precision for industrial factory assembly line automation.",
        "Built modular CartonBoxDetector class supporting live IP cameras, webcams, and video streams with zero code changes.",
        "Applied active learning with Roboflow annotation and 4x data augmentation, cutting manual effort by 80%.",
        "Trained on Google Colab T4 GPU and validated across extreme industrial lighting & traffic conditions."
      ],
      technologies: ["Python", "YOLOv11", "OpenCV", "Roboflow", "PyTorch", "REST APIs"],
      metrics: {
        map: "91.9%",
        precision: "99%",
        performance: "15ms / frame"
      },
      image: "/assets/images/maruti_carton_detection.jpg"
    },
    {
      id: "conveyor-counting-system",
      title: "High-Speed Conveyor Belt Product Counting",
      client: "Quick-Commerce Fulfillment",
      category: "Computer Vision & Embedded ML",
      description: "Production-grade edge counting system using OpenCV MOG2 background subtraction designed for micro-warehouse fulfillment and logistics lines.",
      highlights: [
        "Deployed on Raspberry Pi with virtual optical tripwire counting line to track moving products.",
        "Built adaptive lighting-change detection using foreground pixel percentage to auto pause/resume counting, eliminating false counts during bulb toggles.",
        "ROI-based spatial image filtering optimization ensuring 30+ FPS real-time execution on low-cost hardware.",
        "Modular architecture (detector.py, counter.py) supporting USB camera, IP streams, and video files."
      ],
      technologies: ["Python", "OpenCV", "MOG2", "NumPy", "Raspberry Pi", "Linux"],
      metrics: {
        accuracy: "99.8%",
        fps: "30+ FPS Edge",
        falseCounts: "0%"
      },
      image: "/assets/images/blinkit_conveyor_counting.jpg"
    },
    {
      id: "smart-appliance-vision-control",
      title: "AI Vision Smart Appliance & Energy Automation",
      client: "Commercial & Smart Home Automation",
      category: "Computer Vision & Embedded ML",
      description: "Zero-hardware CCTV vision intelligence platform that analyzes live camera feeds for occupancy and crowd density to automatically manage fans, lighting, and AC climate controls in real time.",
      highlights: [
        "Eliminated need for extra physical sensors or camera hardware by utilizing existing CCTV streams.",
        "Dynamic AC climate tuning based on crowd density (e.g., auto-adjusts to 18°C during high restaurant/office traffic, switches to 28°C-32°C eco mode during low traffic).",
        "Automated occupancy tracking powering off fans, lights, and HVAC units when rooms or zones become empty.",
        "Achieved up to 42% reduction in overall commercial power consumption and operational energy waste."
      ],
      technologies: ["Python", "OpenCV", "YOLOv8/v11", "Flask", "Node.js", "IoT Relays"],
      metrics: {
        powerSavings: "Up to 42%",
        hardwareNeeded: "0 Extra Sensors",
        latency: "< 50ms"
      },
      image: "/assets/images/smart_appliance_vision_control.jpg"
    },
    {
      id: "human-surveillance-theft",
      title: "Intelligent Human Surveillance & Theft Detection",
      client: "Enterprise Security",
      category: "Computer Vision & Full-Stack",
      description: "Real-time automated multi-camera surveillance system with suspicious behavior telemetry, theft risk matrix, and instant alert notifications.",
      highlights: [
        "Engineered real-time human tracking across multi-camera streams.",
        "Built dynamic threat score matrix to detect loitering and unauthorized inventory interaction.",
        "Designed dark-themed command center web dashboard with active alert logging and video playback.",
        "Integrated Express.js backend API for immediate push notifications."
      ],
      technologies: ["Python", "OpenCV", "YOLOv8/v11", "Node.js", "Express.js", "React", "MongoDB"],
      metrics: {
        latency: "< 50ms",
        alerts: "Real-time Push",
        cameras: "Multi-stream Support"
      },
      image: "/assets/images/human_surveillance_theft.jpg"
    },
    {
      id: "aso-automation-tool",
      title: "Automated App Store Optimization (ASO) Tool",
      client: "SaaS / Digital Growth Client",
      category: "Full Stack & Web Automation",
      description: "Automated intelligence platform for tracking app store rankings, analyzing competitor keywords, and generating metadata optimization reports.",
      highlights: [
        "Built full-stack web application with Node.js, Express, React, and MongoDB.",
        "Automated daily keyword position tracking across Apple App Store and Google Play Store.",
        "Interactive analytics graphs displaying visibility score trends and keyword gap analysis.",
        "Exportable PDF performance summaries for marketing teams."
      ],
      technologies: ["Node.js", "Express.js", "React", "MongoDB", "Tailwind/CSS", "REST APIs"],
      metrics: {
        keywordsTracked: "10,000+",
        updateFrequency: "Automated Daily",
        efficiencyGain: "10x Faster ASO"
      },
      image: "/assets/images/aso_automation_tool.jpg"
    }
  ];

  res.json({ success: true, count: projectsList.length, projects: projectsList });
});

// Post Contact / Freelance Inquiry Endpoint (Saves to DB & Dispatches Email to Vipul)
router.post('/contact', async (req, res) => {
  try {
    const { name, email, projectType, budgetRange, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields (Name, Email, Message)."
      });
    }

    // 1. Save to Database (MongoDB or Memory Fallback)
    let savedData;
    if (isMongoActive()) {
      const newContact = new Contact({ name, email, projectType, budgetRange, message });
      savedData = await newContact.save();
    } else {
      savedData = saveInMemoryContact({ name, email, projectType, budgetRange, message });
    }

    // 2. Dispatch Email Notification to Vipul (shrivastav.vipul252@gmail.com)
    sendInquiryEmail({ name, email, projectType, budgetRange, message });

    res.status(201).json({
      success: true,
      message: "Thank you! Your inquiry has been saved to the database and sent directly to Vipul's inbox.",
      data: savedData
    });
  } catch (error) {
    console.error("Error in /contact route:", error);
    res.status(500).json({ success: false, message: "Server error handling contact inquiry." });
  }
});

// View Contact Inquiries Endpoint
router.get('/contact/submissions', async (req, res) => {
  try {
    let submissions;
    if (isMongoActive()) {
      submissions = await Contact.find().sort({ createdAt: -1 });
    } else {
      submissions = getInMemoryContacts();
    }
    res.json({ success: true, count: submissions.length, submissions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch submissions." });
  }
});

module.exports = router;
