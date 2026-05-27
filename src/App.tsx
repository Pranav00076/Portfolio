/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValueEvent } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Cpu, 
  Globe, 
  Terminal, 
  ChevronDown, 
  Rocket, 
  Star,
  Layers,
  Wrench,
  Send,
  Calendar,
  Trophy,
  Briefcase,
  Zap,
  Anchor,
  Skull,
  Menu,
  X,
  Copy,
  Swords,
  RotateCcw,
  Phone,
  Search,
  MessageSquare,
  Sparkles,
  Camera,
  Image,
  Heart,
  Palette,
  Tv,
  Film
} from 'lucide-react';

// --- Sound Constants ---
const SOUNDS = {
  THUNDER: 'https://www.soundjay.com/nature/thunder-2.mp3',
  CLASH: 'https://www.soundjay.com/mechanical/metal-clash-1.mp3',
  SNAIL_RING: 'https://www.soundjay.com/phone/telephone-ring-01.mp3',
  SNAIL_PICKUP: 'https://www.soundjay.com/phone/telephone-pick-up-1.mp3'
};

const playSound = (url: string, volume = 0.1) => {
  try {
    const audio = new Audio(url);
    audio.volume = volume;
    audio.play().catch(() => {});
  } catch (e) {
    console.error("Audio play failed", e);
  }
};

// --- Types ---
interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
  reward: string;
  longDescription?: string;
  technologies?: string[];
}

interface Skill {
  name: string;
  icon: React.ReactNode;
  devilFruit: string;
  description: string;
  role?: string;
  usage?: string;
  projects?: string[];
  level?: number;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

interface ExperienceItem {
  title: string;
  organization: string;
  period: string;
  description: string;
  type: 'internship' | 'hackathon' | 'achievement' | 'open-source';
  bounty: number;
}

interface Certification {
  title: string;
  issuer: string;
  date: string;
  link: string;
  thumbnail?: string;
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    id: "invoice-generator",
    title: "Invoice-Generator",
    description: "A lightweight, single-file invoice generator with real-time preview, auto-calculation, and print-ready PDF export.",
    tags: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/Pranav00076/Invoice-Generator",
    image: "/invoice generator.png",
    reward: "150,000,000",
    longDescription: "This project provides a seamless experience for creating professional invoices directly in the browser. It features a split-screen layout with a live preview that updates as you type. Built with pure web technologies, it ensures high performance and offline capability.",
    technologies: ["HTML5", "CSS3", "JavaScript (ES6+)", "Local Storage", "Print Media Queries"]
  },
  {
    id: "battleship",
    title: "BattleShip",
    description: "A classic strategy game where players compete to sink each other's hidden fleet.",
    tags: ["JavaScript", "Game Dev", "UI"],
    link: "https://github.com/Pranav00076/BattleShip",
    image: "/battleship-game.webp",
    reward: "320,000,000",
    longDescription: "A fully functional Battleship game implemented with complex game logic and an interactive UI. Players can place their ships and challenge an AI or another player in a tactical battle on the high seas.",
    technologies: ["JavaScript", "DOM Manipulation", "CSS Animations", "Game Logic Algorithms"]
  },
  {
    id: "local-ai",
    title: "Local-AI",
    description: "A privacy-first local AI assistant powered by open-source models, ensuring offline capabilities.",
    tags: ["AI", "Local", "LLM"],
    link: "https://github.com/Pranav00076/Local-AI",
    image: "/localAI.png",
    reward: "600,000,000",
    longDescription: "Local-AI is a privacy-first AI assistant that runs entirely on your local machine. It leverages powerful open-source models to provide intelligent responses without sending your data to the cloud, ensuring complete data sovereignty.",
    technologies: ["Python", "Ollama", "React", "Tailwind CSS", "Local LLMs"]
  },
  {
    id: "taptapluffy",
    title: "TapTapLuffy",
    description: "An addictive tapping game featuring Monkey D. Luffy, testing your speed and reflexes.",
    tags: ["Game", "One Piece", "JavaScript"],
    link: "https://github.com/Pranav00076/TapTapLuffy",
    image: "/taptapluffy.png",
    reward: "280,000,000",
    longDescription: "A fun and fast-paced game where players must tap as fast as possible to help Luffy power up. Features custom animations and sound effects inspired by the One Piece series.",
    technologies: ["JavaScript", "Canvas API", "CSS Keyframes", "Audio API"]
  },
  {
    id: "phototrance",
    title: "PhotoTrance",
    description: "A personal photography gallery sharing visual stories from nature to star captures.",
    tags: ["Photography", "Web Design", "Framer Motion"],
    link: "https://github.com/Pranav00076/PhotoTrance",
    image: "/phototrance.png",
    reward: "250,000,000",
    longDescription: "PhotoTrance is more than just a gallery; it's a journey through the lens. It showcases high-quality photography with smooth transitions and an immersive layout that puts the focus on the visual narrative.",
    technologies: ["React", "Framer Motion", "Tailwind CSS", "Responsive Design"]
  },
  {
    id: "css-art-museum",
    title: "CSS Art Museum",
    description: "A collection of intricate artworks created entirely using CSS, showcasing the power of modern styling.",
    tags: ["CSS", "Art", "Frontend"],
    link: "https://github.com/Pranav00076/css-art-museum",
    image: "/cssartmeuseum.png",
    reward: "400,000,000",
    longDescription: "This project pushes the boundaries of CSS, creating complex shapes and scenes without any images. It's a testament to the creative possibilities of web styling and layout techniques.",
    technologies: ["Advanced CSS", "Flexbox", "Grid", "Clip-path", "Pseudo-elements"]
  }
];

const SKILLS: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: [
      { 
        name: "JavaScript", 
        icon: <Code2 className="w-4 h-4" />,
        devilFruit: "Script-Script Fruit",
        description: "Allows the user to manipulate the logic and behavior of the digital world.",
        role: "Navigator",
        usage: "Used as the primary logic driver for all web-based voyages, handling complex state and interactivity.",
        projects: ["Local-AI", "BattleShip", "TapTapLuffy"],
        level: 90
      },
      { 
        name: "CSS", 
        icon: <Layers className="w-4 h-4" />,
        devilFruit: "Style-Style Fruit",
        description: "Allows the user to transform any interface into a visual masterpiece.",
        role: "Artist",
        usage: "Crafting beautiful, responsive layouts and intricate CSS art without external assets.",
        projects: ["CSS Art Museum", "PhotoTrance"],
        level: 85
      },
      { 
        name: "HTML", 
        icon: <Globe className="w-4 h-4" />,
        devilFruit: "Structure-Structure Fruit",
        description: "Allows the user to build the indestructible foundation of any web island.",
        role: "Shipwright",
        usage: "Building semantic and accessible foundations for all digital vessels.",
        projects: ["Invoice-Generator", "Local-AI"],
        level: 95
      },
      { 
        name: "Python", 
        icon: <Terminal className="w-4 h-4" />,
        devilFruit: "Logic-Logic Fruit",
        description: "Allows the user to solve complex algorithmic challenges with extreme efficiency.",
        role: "Strategist",
        usage: "Solving complex backend logic, data processing, and AI-related tasks.",
        projects: ["AI Research", "Backend APIs"],
        level: 80
      }
    ]
  },
  {
    category: "Technical & Tools",
    skills: [
      { 
        name: "OpenAI API", 
        icon: <Zap className="w-4 h-4" />,
        devilFruit: "Brain-Brain Fruit",
        description: "Grants the user the power of artificial intelligence and vast digital knowledge.",
        role: "Scholar",
        usage: "Integrating advanced AI capabilities into applications for smarter user experiences.",
        projects: ["AI Chatbots", "Smart Search"],
        level: 75
      },
      { 
        name: "GitHub Actions", 
        icon: <Rocket className="w-4 h-4" />,
        devilFruit: "Automate-Automate Fruit",
        description: "Allows the user to automate any repetitive task with robotic precision.",
        role: "Mechanic",
        usage: "Setting up CI/CD pipelines to ensure smooth sailing for every deployment.",
        projects: ["Automated Testing", "Deployment Pipelines"],
        level: 70
      },
      { 
        name: "Git & GitHub", 
        icon: <Github className="w-4 h-4" />,
        devilFruit: "Sync-Sync Fruit",
        description: "Allows the user to synchronize their work across different timelines and crews.",
        role: "Helmsman",
        usage: "Managing version control and collaborative development across multiple crews.",
        projects: ["All Open Source Work"],
        level: 85
      },
      { 
        name: "UI/UX & Canva", 
        icon: <Wrench className="w-4 h-4" />,
        devilFruit: "Design-Design Fruit",
        description: "Allows the user to create intuitive and beautiful experiences for all voyagers.",
        role: "Cartographer",
        usage: "Mapping out user journeys and designing intuitive interfaces for seamless navigation.",
        projects: ["PhotoTrance", "Local-AI UI"],
        level: 80
      }
    ]
  },
  {
    category: "Soft Skills",
    skills: [
      { 
        name: "Critical Thinking", 
        icon: <Zap className="w-4 h-4" />,
        devilFruit: "Insight-Insight Fruit",
        description: "Allows the user to see through complex problems with absolute clarity.",
        role: "Lookout",
        usage: "Identifying potential issues and bottlenecks before they hit the ship.",
        level: 90
      },
      { 
        name: "Problem Solving", 
        icon: <Trophy className="w-4 h-4" />,
        devilFruit: "Strategy-Strategy Fruit",
        description: "Allows the user to find the optimal path through any obstacle or storm.",
        role: "Captain",
        usage: "Leading teams through technical storms and finding the best way forward.",
        level: 95
      }
    ]
  }
];

const EXPERIENCE: ExperienceItem[] = [
  {
    title: "Smart India Hackathon 2025",
    organization: "Team Leader",
    period: "2025",
    description: "Led a team of 6, qualified prelims, and submitted innovative ideas to the Government.",
    type: "hackathon",
    bounty: 300000000
  },
  {
    title: "Impact India Hackathon",
    organization: "Team Leader",
    period: "2025",
    description: "Led the team to a Top 10 finish in a national-level presentation competition.",
    type: "hackathon",
    bounty: 300000000
  },
  {
    title: "HacktoberFest 2025",
    organization: "Open Source Contributor",
    period: "2025",
    description: "Contributed to multiple open-source projects with all pull requests accepted.",
    type: "open-source",
    bounty: 150000000
  },
  {
    title: "Academic Excellence",
    organization: "JEE Mains",
    period: "2024",
    description: "Achieved 90+ percentile in JEE Mains. Merit certificates for 10th and 12th results.",
    type: "achievement",
    bounty: 100000000
  }
];

const TOTAL_BOUNTY = EXPERIENCE.reduce((acc, item) => acc + item.bounty, 0) + 
                     PROJECTS.reduce((acc, p) => acc + parseInt(p.reward.replace(/,/g, '')), 0);

const formatBounty = (num: number) => {
  return num.toLocaleString();
};

const CERTIFICATIONS: Certification[] = [
  {
    title: "Oracle AI Vector Search Certified Professional",
    issuer: "Oracle",
    date: "2025",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=D4A709CEDDF5DBE2294BF800A7BFCE0E7B7D6AE09F8E012BB1B756AFCA491A35",
    thumbnail: "https://wsrv.nl/?url=" + encodeURIComponent("https://media.licdn.com/dms/image/v2/D4D2DAQGRUoYe0kcHcQ/profile-treasury-document-images_1920/B4DZoll5u7GkA0-/1/1761567289862?e=1774483200&v=beta&t=h3lET-qq0bdbb_l1I878uQVoW6tgwVGFpBDsW6GALEg")
  },
  {
    title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    issuer: "Oracle",
    date: "2025",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=18DF72FDDB26A58F948D8770230C380797608D87F26104CF561F4A0AA9C2F6BB",
    thumbnail: "https://wsrv.nl/?url=" + encodeURIComponent("https://media.licdn.com/dms/image/v2/D4D2DAQE2CiU-dyTENg/profile-treasury-document-cover-images_1920/B4DZolkhTkJEBM-/0/1761566926140?e=1774004400&v=beta&t=Hf4SkXMD5MA3x_mB9Vmw2Gpb41WnOeInNCwEHhma0-A")
  }
];

// --- Components ---

const DynamicBackgrounds = () => {
  const { scrollYProgress } = useScroll();

  // Opacities for 4 different backgrounds, maxing out at 0.7 (70%)
  // They crossfade as the user scrolls down
  const op1 = useTransform(scrollYProgress, [0, 0.2, 0.33], [0.7, 0.7, 0]);
  const op2 = useTransform(scrollYProgress, [0.2, 0.33, 0.53, 0.66], [0, 0.7, 0.7, 0]);
  const op3 = useTransform(scrollYProgress, [0.53, 0.66, 0.86, 1], [0, 0.7, 0.7, 0]);
  const op4 = useTransform(scrollYProgress, [0.86, 1], [0, 0.7]);

  // Slight parallax scale effect
  const scale1 = useTransform(scrollYProgress, [0, 0.33], [1, 1.05]);
  const scale2 = useTransform(scrollYProgress, [0.2, 0.66], [1, 1.05]);
  const scale3 = useTransform(scrollYProgress, [0.53, 1], [1, 1.05]);
  const scale4 = useTransform(scrollYProgress, [0.86, 1], [1, 1.05]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* 1. Grand Line Ocean / Ship */}
      <motion.div 
        style={{ opacity: op1, scale: scale1 }}
        className="absolute inset-0 bg-[url('https://wallpaperaccess.com/full/9387243.jpg')] bg-cover bg-center"
      />
      
      {/* 2. Zunesha (Elephant) */}
      <motion.div 
        style={{ opacity: op2, scale: scale2 }}
        className="absolute inset-0 bg-[url('https://imgs.search.brave.com/u8Tc3V10jVUOGKAkjc4WfHSCKCGxhdjVdEY2pl1v_1s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9saDct/dXMuZ29vZ2xldXNl/cmNvbnRlbnQuY29t/L0RoZXVnUThKVnhI/aWE4UFFyY1VZcFMx/dVd2NmZsV0xjVG9Z/cmIxSTZwcnVBa3lO/VFNndjZHanFiR2Vp/bU5rc21YeTlNcUNi/UktXb1I0ZFhDY1dR/dFR2dzdpbkpOaXpj/Q0R1VVAtOWRsUV9K/RlhBUU8xUGVfdW5P/OExVLVJJOEN1bURD/TndLQXMybkFIcW1k/UnBqQ1VJTDA')] bg-cover bg-center"
      />

      {/* 3. The Moon */}
      <motion.div 
        style={{ opacity: op3, scale: scale3 }}
        className="absolute inset-0 bg-[url('https://imgs.search.brave.com/Ts8dd-niYA_awZgmIoxldTmDloTTE-HByJi7bbw7hJE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/ZGV4ZXJ0by5jb20v/Y2RuLWltYWdlL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIzLzA2/LzEzL29uZS1waWVj/ZS1tYXhpbi1hcmst/MTAyNHg1NzYuanBl/Zz93aWR0aD0xMjAw/JnF1YWxpdHk9NzUm/Zm9ybWF0PWF1dG8')] bg-cover bg-center"
      />

      {/* 4. Sun God Nika (Sun/Fire) */}
      <motion.div 
        style={{ opacity: op4, scale: scale4 }}
        className="absolute inset-0 bg-[url('https://imgs.search.brave.com/oSjx4-Z3HX5Kr5jvmFJcZasXdnGyrMtr-5gYyxTjnOQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZGV4ZXJ0by5jb20v/Y2RuLWltYWdlL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIzLzA2/LzEzL29uZS1waWVj/ZS1sdWZmeS13YW5v/LmpwZWc_d2lkdGg9/MTIwMCZxdWFsaXR5/PTYwJmZvcm1hdD1h/dXRv')] bg-cover bg-center"
      />

      {/* Blue tint overlay to blend everything into the ocean theme */}
      <div className="absolute inset-0 bg-ocean-950/60 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-950/40 via-transparent to-ocean-950/80" />
    </div>
  );
};

const StarBackground = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const y1 = useTransform(scrollY, [0, 5000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 5000], [0, -500]);
  const y3 = useTransform(scrollY, [0, 5000], [0, -800]);
  
  // Stars are more prominent in the middle and end
  const starOpacity = useTransform(scrollYProgress, 
    [0, 0.2, 0.4, 0.6, 0.8, 1], 
    [0.3, 0.8, 0.4, 0.9, 0.5, 1]
  );

  return (
    <motion.div style={{ opacity: starOpacity }} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Layer 1: Slow, small stars */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={`s1-${i}`}
            className="absolute bg-white rounded-full opacity-20"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: Math.random() * 5 + 5, repeat: Infinity }}
            style={{
              top: Math.random() * 300 + "%",
              left: Math.random() * 100 + "%",
              width: "1px",
              height: "1px",
            }}
          />
        ))}
      </motion.div>

      {/* Layer 2: Medium speed stars */}
      <motion.div style={{ y: y2 }} className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`s2-${i}`}
            className="absolute bg-blue-400 rounded-full"
            animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.2, 1] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
            style={{
              top: Math.random() * 300 + "%",
              left: Math.random() * 100 + "%",
              width: "2px",
              height: "2px",
              boxShadow: "0 0 5px rgba(96, 165, 250, 0.5)"
            }}
          />
        ))}
      </motion.div>

      {/* Layer 3: Fast, bright stars */}
      <motion.div style={{ y: y3 }} className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`s3-${i}`}
            className="absolute bg-white rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: Math.random() * 2 + 1, repeat: Infinity }}
            style={{
              top: Math.random() * 300 + "%",
              left: Math.random() * 100 + "%",
              width: "3px",
              height: "3px",
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)"
            }}
          />
        ))}
      </motion.div>

      {/* Shooting Stars */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute w-px h-20 bg-gradient-to-b from-white to-transparent opacity-0"
          animate={{
            top: ["-10%", "110%"],
            left: [Math.random() * 100 + "%", (Math.random() * 100 - 20) + "%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 1,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
          style={{ transform: "rotate(45deg)" }}
        />
      ))}

      <div className="absolute inset-0 bg-radial-gradient from-blue-900/10 via-transparent to-transparent opacity-30" />
    </motion.div>
  );
};

const OceanWaves = () => {
  const { scrollYProgress } = useScroll();
  const waveY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const waveOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.3, 0.6, 0.6, 0.3]);

  const wavePath1 = "M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z";
  const wavePath2 = "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,144C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z";

  return (
    <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden opacity-40">
      <motion.div 
        style={{ y: waveY, opacity: waveOpacity }}
        className="absolute bottom-0 left-0 w-full h-64"
      >
        {/* Back Wave */}
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[200%] h-full flex items-end"
        >
          <div className="w-1/2 h-full">
            <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="#1e3a8a" fillOpacity="0.3" d={wavePath1} />
            </svg>
          </div>
          <div className="w-1/2 h-full">
            <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="#1e3a8a" fillOpacity="0.3" d={wavePath1} />
            </svg>
          </div>
        </motion.div>
        
        {/* Front Wave */}
        <motion.div 
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[200%] h-full flex items-end"
        >
          <div className="w-1/2 h-full">
            <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="#1e40af" fillOpacity="0.2" d={wavePath2} />
            </svg>
          </div>
          <div className="w-1/2 h-full">
            <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path fill="#1e40af" fillOpacity="0.2" d={wavePath2} />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const MysteryFog = () => {
  const { scrollYProgress } = useScroll();
  const fogOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.7, 0.8], [0, 0.4, 0.4, 0]);

  return (
    <motion.div 
      style={{ opacity: fogOpacity }}
      className="fixed inset-0 z-40 pointer-events-none overflow-hidden bg-gradient-to-b from-transparent via-slate-900/40 to-transparent backdrop-blur-[2px]"
    >
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`fog-${i}`}
          className="absolute bg-white/5 rounded-full blur-[120px]"
          animate={{
            x: ["-20%", "120%"],
            y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 30 + 30,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: Math.random() * 800 + 400 + "px",
            height: Math.random() * 600 + 300 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
        />
      ))}
    </motion.div>
  );
};

const ParallaxElement = ({ children, speed = 0.2, className = "" }: { children: React.ReactNode, speed?: number, className?: string }) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

const SectionTitle = ({ title, subtitle, island }: { title: string; subtitle?: string; island?: string }) => (
  <div className="mb-12 text-center relative px-4">
    {island && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-center gap-2 mb-2"
      >
        <span className="text-xl sm:text-2xl">🏝️</span>
        <span className="text-gold-500/60 font-pirate text-xs sm:text-sm tracking-[0.3em] uppercase">{island}</span>
      </motion.div>
    )}
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 0.1, scale: 1 }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    >
      <Skull className="w-24 h-24 sm:w-32 h-32 text-gold-500" />
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl sm:text-4xl md:text-5xl font-pirate text-gold-400 mb-4 tracking-widest glow-gold flex items-center justify-center gap-3 sm:gap-4"
    >
      <Skull className="w-6 h-6 sm:w-8 h-8 text-red-600" />
      <span className="leading-tight">{title}</span>
      <Skull className="w-6 h-6 sm:w-8 h-8 text-red-600" />
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-red-500/80 font-pirate text-base sm:text-lg uppercase tracking-widest"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="h-px w-24 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mt-6"
    />
  </div>
);

const SeaPath = () => {
  const { scrollYProgress } = useScroll();
  const location = useLocation();
  const isProjectPage = location.pathname.startsWith('/project/');

  const pathLength = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);
  
  const currentIslandValue = useTransform(scrollYProgress, 
    [0, 0.2, 0.4, 0.6, 0.8, 1], 
    ["Foosha Village", "Devil Fruit Island", "Enies Lobby", "Marineford", "Laugh Tale", "The One Piece"]
  );
  
  const [island, setIsland] = useState(isProjectPage ? "Enies Lobby" : "Foosha Village");
  
  useMotionValueEvent(currentIslandValue, "change", (latest) => {
    if (!isProjectPage) {
      setIsland(latest);
    }
  });

  useEffect(() => {
    if (isProjectPage) {
      setIsland("Enies Lobby");
    } else {
      setIsland(currentIslandValue.get());
    }
  }, [isProjectPage, currentIslandValue]);

  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 pointer-events-none z-30">
      {/* Ship's Log Status Bar */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed bottom-6 left-6 z-50 pointer-events-auto hidden md:block"
      >
        <div className="bg-black/80 backdrop-blur-md border-2 border-gold-500/30 p-4 rounded-2xl shadow-2xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
            <Anchor className="w-6 h-6 text-gold-500" />
          </div>
          <div>
            <div className="text-[10px] font-pirate text-gold-500/60 uppercase tracking-widest">Current Location</div>
            <div className="text-lg font-pirate text-white tracking-widest">
              {island}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-8 opacity-20 hidden lg:block">
        <svg className="w-full h-full" viewBox="0 0 100 1000" preserveAspectRatio="none">
          <motion.path
            d="M 50 0 C 80 200 20 400 50 500 C 80 600 20 800 50 1000"
            fill="none"
            stroke="url(#seaGradient)"
            strokeWidth="2"
            strokeDasharray="10 10"
            style={{ pathLength }}
          />
          <defs>
            <linearGradient id="seaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

const PirateTerminal = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto min-h-[500px] md:aspect-[16/10] flex items-center justify-center p-4">
      {/* Outer Frame - Ancient Ship Control Panel */}
      <div className="absolute inset-0 bg-[#3e2723] rounded-[30px] md:rounded-[40px] border-[10px] md:border-[16px] border-[#1a1111] shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Wood Texture Lines */}
        <div className="absolute inset-0 opacity-20 flex flex-col justify-evenly pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-full h-1 bg-black/40" />
          ))}
        </div>
        
        {/* Brass Rivets */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 bg-gold-700 rounded-full flex items-center justify-center border-4 border-gold-900 shadow-lg">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-cyan-500/50 rounded-full animate-pulse shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
        </div>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute w-3 h-3 md:w-4 md:h-4 bg-gold-500 rounded-full border-2 border-gold-900 shadow-sm" 
               style={{ 
                 top: i < 4 ? '8px' : 'auto', 
                 bottom: i >= 4 ? '8px' : 'auto',
                 left: `${(i % 4) * 30 + 5}%` 
               }} 
          />
        ))}
        
        {/* Screen Content */}
        <div className="absolute inset-4 md:inset-6 bg-[#0a192f] rounded-[15px] md:rounded-[20px] border-4 md:border-8 border-gold-800 overflow-hidden flex flex-col md:flex-row items-center justify-between text-center p-6 md:p-12 lg:p-16 gap-6 md:gap-12 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
          {/* Magical/Nautical Grid Effect */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:30px_30px] z-10" />
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-20 flex-1 flex flex-col items-center md:items-center justify-center h-full"
          >
            <div className="mb-4 md:mb-6 relative inline-block">
              <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full border-4 border-gold-500 overflow-hidden bg-white/10 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                <img 
                  src="/king-avatar.png" 
                  alt="Straw Hat" 
                  className="w-full h-full object-cover object-top" 
                  onError={(e) => { e.currentTarget.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pranav&backgroundColor=f59e0b' }}
                />
              </div>
            </div>
            
            <h2 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-pirate text-white mb-2 md:mb-4 tracking-widest leading-tight text-center whitespace-nowrap">Hi, I'm Pranav Thawait</h2>
            <p className="text-gold-400 font-mono text-sm md:text-lg lg:text-xl mb-6 md:mb-10 text-center">Software Engineer & Luffy's Crewmate</p>
            
            <div className="flex flex-wrap justify-center gap-3 md:gap-6">
              {[
                { icon: <Github className="w-5 h-5 md:w-6 md:h-6" />, color: "bg-wood-800/80 border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-wood-900", link: "https://github.com/Pranav00076" },
                { icon: <Linkedin className="w-5 h-5 md:w-6 md:h-6" />, color: "bg-wood-800/80 border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-wood-900", link: "https://www.linkedin.com/in/pranav-thawait-140a092b2" },
                { icon: <Code2 className="w-5 h-5 md:w-6 md:h-6" />, color: "bg-wood-800/80 border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-wood-900", link: "https://codeforces.com/profile/Pritoo29" },
                { icon: <Globe className="w-5 h-5 md:w-6 md:h-6" />, color: "bg-wood-800/80 border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-wood-900", link: "https://www.instagram.com/pt.clicks/" },
                { icon: <Mail className="w-5 h-5 md:w-6 md:h-6" />, color: "bg-wood-800/80 border-gold-500/30 text-gold-400 hover:bg-gold-500 hover:text-wood-900", link: "mailto:pranavthawait02@gmail.com" }
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className={`${item.color} p-2 md:p-3 rounded-lg md:rounded-xl shadow-lg cursor-pointer border transition-colors`}
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>


          {/* Right Side Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="z-20 flex-1 hidden md:flex justify-center items-center h-full"
          >
            <div className="w-full max-w-xs lg:max-w-md xl:max-w-lg aspect-[3/4] rounded-2xl border-4 border-gold-500/30 overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.15)] relative group">
               <img 
                 src="/hero-right.jpeg" 
                 alt="Hero Portrait" 
                 className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
                 onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800' }}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Snail Phone (Den Den Mushi) */}
      <div className="absolute -right-16 bottom-0 w-32 h-32 hidden lg:block">
        <motion.div 
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="relative w-full h-full"
        >
          {/* Snail Body */}
          <div className="absolute bottom-0 left-0 w-24 h-12 bg-[#d7ccc8] rounded-full border-2 border-[#5d4037]" />
          {/* Shell */}
          <div className="absolute bottom-4 left-4 w-20 h-20 bg-[#8d6e63] rounded-full border-4 border-[#5d4037] flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-[#5d4037] rounded-full border-dashed animate-spin-slow" />
          </div>
          {/* Eyes */}
          <div className="absolute top-0 left-8 w-2 h-8 bg-[#d7ccc8] border-r border-[#5d4037]" />
          <div className="absolute top-0 left-14 w-2 h-8 bg-[#d7ccc8] border-r border-[#5d4037]" />
          <div className="absolute -top-2 left-6 w-6 h-6 bg-white rounded-full border-2 border-[#5d4037] flex items-center justify-center">
            <div className="w-2 h-2 bg-black rounded-full" />
          </div>
          <div className="absolute -top-2 left-12 w-6 h-6 bg-white rounded-full border-2 border-[#5d4037] flex items-center justify-center">
            <div className="w-2 h-2 bg-black rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* Pirate Crew Assignments Bar */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[#3e2723] border-4 border-[#1a1111] rounded-lg p-3 shadow-2xl z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gold-500 rounded flex items-center justify-center shrink-0">
            <Rocket className="w-5 h-5 text-wood-900" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between text-[8px] font-mono text-gold-400 uppercase mb-1">
              <span className="truncate">Pirate Crew Assignments</span>
              <span>85%</span>
            </div>
            <div className="h-2 bg-black/50 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "85%" }}
                transition={{ duration: 2, delay: 1 }}
                className="h-full bg-gold-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OnePieceHero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  
  const [posterClicks, setPosterClicks] = useState(0);
  const [showSecret, setShowSecret] = useState(false);

  const handlePosterClick = () => {
    setPosterClicks(prev => {
      const newCount = prev + 1;
      if (newCount === 5) {
        setShowSecret(true);
        setTimeout(() => {
          setShowSecret(false);
          setPosterClicks(0);
        }, 5000);
      }
      return newCount;
    });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-32">
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              rotate: Math.random() * 360
            }}
            animate={{
              y: ["-10%", "110%"],
              rotate: 360
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {i % 3 === 0 ? (
              <div className="w-8 h-8 bg-wood-800/40 rounded-sm blur-[1px]" />
            ) : i % 3 === 1 ? (
              <Star className="w-4 h-4 text-gold-500/20" />
            ) : (
              <div className="w-12 h-4 bg-slate-400/10 rounded-full blur-[2px]" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Pirate Flag */}
      <motion.div 
        style={{ y }}
        className="absolute top-10 left-10 w-32 h-32 opacity-40 hidden md:block"
      >
        <div className="relative w-full h-full">
          <div className="absolute top-0 left-0 w-1 h-48 bg-wood-900 rounded-full" />
          <motion.div 
            animate={{ rotateY: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute top-4 left-1 w-24 h-16 bg-black border-2 border-white/20 rounded-sm flex items-center justify-center"
          >
            <div className="text-white text-2xl font-pirate">☠</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Wanted Poster - Decorative */}
      <motion.div 
        initial={{ opacity: 0, rotate: -10, x: 50 }}
        animate={{ opacity: 1, rotate: -5, x: 0 }}
        transition={{ delay: 1 }}
        onClick={handlePosterClick}
        className="absolute bottom-24 right-10 w-48 h-64 parchment-card p-4 hidden md:block shadow-2xl cursor-pointer hover:scale-105 transition-transform z-30"
      >
        <div className="border-4 border-[#8d6e63] h-full flex flex-col items-center justify-between py-4 relative overflow-hidden">
          <div className="text-2xl font-pirate uppercase tracking-tighter">Wanted</div>
          <div className="w-32 h-32 bg-black/10 rounded border-2 border-[#8d6e63] overflow-hidden">
             <img 
               src="https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=400" 
               alt="Wanted" 
               className="w-full h-full object-cover object-top grayscale" 
               onError={(e) => { e.currentTarget.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luffy' }}
             />
          </div>
          <div className="text-center">
            <div className="text-xs font-bold uppercase">Dead or Alive</div>
            <div className="text-lg font-pirate">3,000,000,000</div>
          </div>
          
          {/* Secret Message Overlay */}
          <AnimatePresence>
            {showSecret && (
              <motion.div
                key="secret-message"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 bg-black/90 flex items-center justify-center p-4 text-center z-50"
              >
                <div className="text-gold-500 font-pirate text-xl leading-tight">
                  "You found the hidden treasure!"
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Log Pose - Floating Compass */}
      <motion.div 
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-24 h-24 hidden lg:flex items-center justify-center z-20"
      >
        <div className="relative w-16 h-16 rounded-full bg-blue-400/20 border-2 border-gold-500/50 backdrop-blur-sm flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]">
          <div className="w-1 h-12 bg-red-500 rounded-full absolute rotate-45" />
          <div className="w-12 h-1 bg-gold-500/30 rounded-full absolute" />
          <div className="absolute inset-0 rounded-full border border-white/10 animate-pulse" />
        </div>
        <div className="absolute -bottom-4 text-[10px] font-mono text-gold-500 uppercase tracking-widest">Log Pose</div>
      </motion.div>

      {/* Main Terminal */}
      <div className="relative z-10 w-full px-6">
        <PirateTerminal />
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold-500 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll to Sail</span>
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', message: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required to send a signal.';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      // In a real app, you would send the data here
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    }
  };

  const handleClear = () => {
    setFormData({ name: '', email: '', message: '' });
    setErrors({ name: '', email: '', message: '' });
    setIsSubmitted(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof typeof errors]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto text-left space-y-6">
      {isSubmitted && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="p-4 bg-green-900/40 border border-green-500/50 rounded-xl text-green-400 text-center font-medium"
        >
          Signal sent successfully! I'll get back to you soon.
        </motion.div>
      )}
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-pirate tracking-widest text-gold-400 mb-2">Your Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-black/40 border-2 ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-xl focus:outline-none focus:border-gold-500/50 focus:bg-black/60 focus:shadow-[0_0_15px_rgba(245,158,11,0.1)] text-slate-200 transition-all`}
            placeholder="Monkey D. Luffy"
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-pirate tracking-widest text-gold-400 mb-2">Your Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-black/40 border-2 ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-xl focus:outline-none focus:border-gold-500/50 focus:bg-black/60 focus:shadow-[0_0_15px_rgba(245,158,11,0.1)] text-slate-200 transition-all`}
            placeholder="luffy@strawhats.com"
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-pirate tracking-widest text-gold-400 mb-2">Message</label>
        <textarea 
          id="message" 
          name="message" 
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className={`w-full px-4 py-3 bg-black/40 border-2 ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-xl focus:outline-none focus:border-gold-500/50 focus:bg-black/60 focus:shadow-[0_0_15px_rgba(245,158,11,0.1)] text-slate-200 transition-all resize-none`}
          placeholder="I have a mission for you..."
        />
        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <motion.button 
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 px-10 py-4 bg-gold-500 hover:bg-gold-400 text-wood-900 rounded-xl font-pirate tracking-widest text-lg shadow-[0_0_30px_rgba(245,158,11,0.3)] flex items-center justify-center gap-3 transition-all"
        >
          SEND SIGNAL <Send className="w-5 h-5" />
        </motion.button>
        
        <motion.button 
          type="button"
          onClick={handleClear}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-4 bg-white/5 hover:bg-white/10 text-gold-400 border border-gold-500/30 rounded-xl font-pirate tracking-widest text-lg transition-all flex items-center justify-center gap-3"
        >
          CLEAR <RotateCcw className="w-5 h-5" />
        </motion.button>
      </div>
    </form>
  );
};

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-24 px-6 max-w-6xl mx-auto relative overflow-hidden">
      <ParallaxElement speed={0.3} className="absolute top-0 left-0 opacity-5">
        <div className="text-[150px] font-pirate leading-none select-none text-gold-500">SCROLLS</div>
      </ParallaxElement>

      <SectionTitle title="Navigational Licenses" subtitle="Certifications" island="Ohara" />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {CERTIFICATIONS.map((cert, idx) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ 
              scale: 1.05,
              rotate: idx % 2 === 0 ? 1 : -1,
            }}
            className="relative group cursor-pointer h-full"
          >
            {/* Vivre Card Body */}
            <div 
              className="bg-[#fdfbf7] p-8 shadow-xl relative overflow-hidden min-h-[200px] flex flex-col justify-between h-full"
              style={{
                clipPath: 'polygon(2% 0%, 98% 1%, 100% 98%, 1% 100%, 0% 2%)', // Slightly irregular "torn" look
                boxShadow: '0 10px 30px -5px rgba(0,0,0,0.3)'
              }}
            >
              {/* Paper Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
              
              {/* The "Soul" - A glowing dot that points */}
              <motion.div 
                animate={{ 
                  x: [0, 5, 0],
                  y: [0, -5, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-4 right-4 w-3 h-3 bg-gold-500 rounded-full blur-[2px] shadow-[0_0_10px_rgba(245,158,11,0.8)]"
              />

              <div className="flex-1">
                {cert.thumbnail && (
                  <div className="mb-6 rounded-lg overflow-hidden border-2 border-slate-200 shadow-md relative aspect-[1.4/1] w-full">
                    <img 
                      src={cert.thumbnail} 
                      alt={cert.title} 
                      className="absolute inset-0 w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em] mb-4 font-black">
                  Issued: {cert.date}
                </div>
                <h4 className="text-xl font-pirate text-slate-800 mb-2 leading-tight tracking-wide">
                  {cert.title}
                </h4>
              </div>

              <div className="flex justify-between items-end pt-6 border-t border-slate-200/50">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Authority</span>
                  <span className="text-red-800 font-pirate text-sm tracking-widest">{cert.issuer}</span>
                </div>
                
                <motion.a 
                  href={cert.link}
                  whileHover={{ rotate: 45, scale: 1.2 }}
                  className="text-slate-400 hover:text-gold-600 transition-all"
                >
                  <ExternalLink className="w-5 h-5" />
                </motion.a>
              </div>

              {/* Vivre Card "Pointing" indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-20 group-hover:opacity-100 transition-opacity">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <div className="w-1 h-4 bg-gold-500 rounded-full mx-auto" />
                  <div className="w-2 h-2 border-b-2 border-r-2 border-gold-500 rotate-45 -mt-1 mx-auto" />
                </motion.div>
              </div>
            </div>

            {/* Subtle "Burning" effect on hover edges */}
            <div className="absolute inset-0 -z-10 bg-gold-500/0 group-hover:bg-gold-500/10 blur-xl transition-all duration-500 rounded-full scale-90 group-hover:scale-110" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ProjectDetails = ({ projectId, onBack }: { projectId?: string, onBack?: () => void }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const activeId = projectId || id;
  const project = PROJECTS.find(p => p.id === activeId);

  useEffect(() => {
    if (!projectId) {
      window.scrollTo(0, 0);
    }
  }, [projectId]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/');
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen relative z-10 flex flex-col items-center justify-center bg-ocean-950/90 text-gold-500 p-6">
        <Skull className="w-24 h-24 mb-6 animate-bounce" />
        <h2 className="text-4xl font-pirate mb-4">Lost at Sea!</h2>
        <p className="mb-8 text-slate-400">This mission doesn't exist in our records.</p>
        <button 
          onClick={handleBack}
          className="px-8 py-3 bg-gold-500 text-wood-900 rounded-full font-bold hover:bg-gold-400 transition-colors"
        >
          Return to Port
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${projectId ? 'pt-8 pb-12' : 'min-h-screen pt-32 pb-24'} relative z-10 bg-ocean-950/90 px-6 rounded-3xl`}
    >
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-gold-500 hover:text-gold-400 mb-12 font-pirate tracking-widest transition-colors"
        >
          <ChevronDown className="w-6 h-6 rotate-90" /> Back to Fleet
        </button>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="parchment-card p-4 rounded-lg shadow-2xl"
          >
            <div className="border-8 border-[#8d6e63] rounded overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-auto min-h-[300px] object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-6 text-center">
              <div className="text-4xl font-pirate text-red-800 mb-2">REWARD</div>
              <div className="text-3xl font-pirate text-wood-900">{project.reward} ฿</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-8"
          >
            <div>
              <h1 className="text-5xl md:text-6xl font-pirate text-gold-500 mb-4 tracking-widest">{project.title}</h1>
              <div className="flex flex-wrap gap-3">
                {project.tags.map(tag => (
                  <span key={tag} className="px-4 py-1 bg-red-900/30 border border-red-500/50 rounded-full text-red-400 text-xs font-mono uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="wood-panel p-8 rounded-2xl">
              <h3 className="text-2xl font-pirate text-gold-400 mb-4 tracking-widest">Mission Briefing</h3>
              <p className="text-slate-300 leading-relaxed text-lg">
                {project.longDescription || project.description}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-pirate text-gold-400 tracking-widest">Ancient Technologies</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {(project.technologies || project.tags).map(tech => (
                  <div key={tech} className="flex items-center gap-2 text-slate-400">
                    <Zap className="w-4 h-4 text-gold-500" />
                    <span className="text-sm font-medium">{tech}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.a 
              href={project.link}
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-4 bg-gold-500 hover:bg-gold-400 text-wood-900 rounded-xl font-bold text-lg shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all"
            >
              Inspect Repository <Github className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const CrewMemberModal = ({ skill, onClose }: { skill: Skill, onClose: () => void }) => {
  if (!skill) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="parchment-card max-w-lg w-full p-8 rounded-sm relative shadow-2xl border-4 border-wood-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-wood-800 hover:text-red-800 transition-colors"
        >
          <Zap className="w-6 h-6 rotate-45" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-wood-800/10 rounded-full flex items-center justify-center text-wood-800 border-2 border-wood-800">
            {React.isValidElement(skill.icon) ? React.cloneElement(skill.icon as React.ReactElement, { className: "w-8 h-8" }) : skill.icon}
          </div>
          <div>
            <h3 className="text-3xl font-pirate text-wood-900 tracking-widest">{skill.name}</h3>
            <div className="text-red-800 font-bold uppercase tracking-widest text-sm">{skill.role || 'Crew Member'}</div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="text-xs font-pirate text-wood-800/60 uppercase tracking-widest mb-2">Devil Fruit</div>
            <div className="flex items-center gap-2 text-wood-900 font-medium italic">
              <span className="text-xl">🍎</span> {skill.devilFruit}
            </div>
          </div>

          <div>
            <div className="text-xs font-pirate text-wood-800/60 uppercase tracking-widest mb-2">Mission Usage</div>
            <p className="text-wood-800 leading-relaxed font-medium">
              {skill.usage || skill.description}
            </p>
          </div>

          {skill.projects && skill.projects.length > 0 && (
            <div>
              <div className="text-xs font-pirate text-wood-800/60 uppercase tracking-widest mb-2">Notable Voyages</div>
              <div className="flex flex-wrap gap-2">
                {skill.projects.map(p => (
                  <span key={p} className="px-3 py-1 bg-wood-800/10 border border-wood-800/20 rounded-full text-xs font-bold text-wood-900">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}

          {skill.level !== undefined && (
            <div>
              <div className="text-xs font-pirate text-wood-800/60 uppercase tracking-widest mb-2">Haki Level (Skill)</div>
              <div className="w-full h-4 bg-wood-800/10 rounded-full overflow-hidden border border-wood-800/20">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-red-800 to-red-600 shadow-[0_0_10px_rgba(153,27,27,0.5)]"
                />
              </div>
              <div className="flex justify-between mt-1 text-[10px] font-bold text-wood-800/60 uppercase">
                <span>Beginner</span>
                <span>Master</span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-wood-800/20 text-center">
          <div className="text-[10px] font-pirate text-wood-800/40 uppercase tracking-[0.3em]">Official Straw Hat Fleet Record</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const StarShower = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: `${Math.random() * 100}vw`, y: -100, opacity: 0 }}
          animate={{ 
            y: "110vh", 
            x: `${(Math.random() * 100) - 20}vw`,
            opacity: [0, 1, 1, 0] 
          }}
          transition={{ 
            duration: 1.5 + Math.random() * 2, 
            repeat: Infinity, 
            delay: Math.random() * 10,
            ease: "linear"
          }}
          className="absolute w-[1px] h-20 bg-gradient-to-b from-white/40 via-gold-500/20 to-transparent"
          style={{ rotate: 25 }}
        />
      ))}
    </div>
  );
};

const FloatingShips = ({ onClash }: { onClash: (x: number, y: number) => void }) => {
  // We'll have two fleets
  const fleets = [
    { side: 'left', count: 2, color: '#5d4037', initialX: '-15vw', targetX: '115vw' },
    { side: 'right', count: 2, color: '#2c1e1e', initialX: '115vw', targetX: '-15vw' }
  ];

  useEffect(() => {
    // Simulate clashes periodically
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        // Clash near the center
        const x = 40 + Math.random() * 20;
        const y = 60 + Math.random() * 20;
        onClash(x, y);
        playSound(SOUNDS.CLASH, 0.05);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [onClash]);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
      {fleets.map((fleet) => (
        [...Array(fleet.count)].map((_, i) => (
          <motion.div
            key={`${fleet.side}-${i}`}
            className="absolute bottom-32"
            initial={{ x: fleet.initialX, y: 0, rotate: fleet.side === 'left' ? -5 : 5 }}
            animate={{ 
              x: fleet.targetX, 
              y: [0, -20, 0, 15, 0],
              rotate: fleet.side === 'left' ? [-5, 5, -3, 3, -5] : [5, -5, 3, -3, 5]
            }}
            transition={{ 
              x: { duration: 35 + i * 10, repeat: Infinity, ease: "linear", delay: i * 12 },
              y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{
              filter: `drop-shadow(0 10px 10px rgba(0,0,0,0.5))`,
              opacity: 0.5 - i * 0.1,
              scale: (0.7 - i * 0.1) * (fleet.side === 'right' ? -1 : 1), // flip for right side
              zIndex: 10 - i
            }}
          >
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 21L4 19L6 21L8 19L10 21L12 19L14 21L16 19L18 21L20 19L22 21" stroke="#8d6e63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 17L5 11L12 15L19 11L20 17H4Z" fill={fleet.color} stroke="#3e2723" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M12 15V3L19 9L12 11" fill="#f5f5f5" stroke="#e0e0e0" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M12 11L5 9L12 3" fill="#e0e0e0" stroke="#bdbdbd" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M12 3V1" stroke="#3e2723" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="6" r="1" fill={fleet.side === 'left' ? "#ef4444" : "#a855f7"}/>
            </svg>
          </motion.div>
        ))
      ))}
    </div>
  );
};

const HakiLightning = ({ trigger }: { trigger?: { x: number, y: number } | null }) => {
  const [flashes, setFlashes] = useState<{ id: number; x: number; y: number; rotate: number; color: string; scale: number; intensity: number }[]>([]);

  const createFlash = useCallback((x?: number, y?: number, isClash = false) => {
    const newFlash = {
      id: Math.random(),
      x: x ?? Math.random() * 100,
      y: y ?? Math.random() * 100,
      rotate: Math.random() * 360,
      color: isClash ? '#ffffff' : (Math.random() > 0.5 ? '#ef4444' : '#a855f7'),
      scale: isClash ? 2.5 : (0.5 + Math.random() * 1.5),
      intensity: isClash ? 1.5 : 1
    };
    setFlashes(prev => [...prev, newFlash]);
    
    if (isClash) {
      playSound(SOUNDS.THUNDER, 0.15);
    } else if (Math.random() > 0.7) {
      playSound(SOUNDS.THUNDER, 0.05);
    }

    setTimeout(() => {
      setFlashes(prev => prev.filter(f => f.id !== newFlash.id));
    }, 400);
  }, []);

  useEffect(() => {
    if (trigger) {
      createFlash(trigger.x, trigger.y, true);
    }
  }, [trigger, createFlash]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.75) {
        createFlash();
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [createFlash]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {flashes.map(flash => (
          <motion.div
            key={flash.id}
            initial={{ opacity: 0, scale: flash.scale * 0.5 }}
            animate={{ 
              opacity: [0, 1, 0.4, 1, 0],
              scale: [flash.scale * 0.8, flash.scale, flash.scale * 1.1]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute"
            style={{ 
              left: `${flash.x}%`, 
              top: `${flash.y}%`,
              transform: `translate(-50%, -50%) rotate(${flash.rotate}deg)`,
              filter: `drop-shadow(0 0 ${20 * flash.intensity}px ${flash.color}) drop-shadow(0 0 ${40 * flash.intensity}px ${flash.color})`
            }}
          >
            <svg width="150" height="150" viewBox="0 0 100 100" fill="none" className="opacity-90">
              <path d="M50 0 L30 40 L60 50 L40 100 L80 45 L45 35 Z" fill="black" stroke={flash.color} strokeWidth="3" />
              <path d="M55 5 L35 45 L65 55 L45 105 L85 50 L50 40 Z" fill="white" fillOpacity="0.3" stroke={flash.color} strokeWidth="1" className="blur-[1px]" />
              {/* Extra sparks */}
              <circle cx="20" cy="30" r="1" fill={flash.color} className="animate-ping" />
              <circle cx="80" cy="70" r="1" fill={flash.color} className="animate-ping" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const DenDenMushiChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite-preview",
        contents: [...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })), { role: 'user', parts: [{ text: userMsg }] }],
        config: {
          systemInstruction: "You are a Den Den Mushi (Snail Phone) from the One Piece world. You are helping Pranav Thawait, a software engineer and pirate. Speak like a pirate or a snail phone (e.g., 'Puru puru puru...', 'Gacha!'). Keep responses short and helpful.",
        }
      });
      
      const aiText = response.text || "Puru puru... connection lost!";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Puru puru... the signal is weak in the Grand Line!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-80 sm:w-96 bg-[#3e2723] border-4 border-[#1a1111] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="bg-[#1a1111] p-4 flex justify-between items-center border-b border-gold-900/30">
              <div className="flex items-center gap-2 text-gold-500 font-pirate tracking-widest">
                <Phone className="w-5 h-5" />
                <span>DEN DEN MUSHI</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gold-500 hover:text-red-500 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-[#0a192f]/50 custom-scrollbar">
              {messages.length === 0 && (
                <div className="text-center text-gold-500/40 font-mono text-xs mt-10">
                  Puru puru puru... <br/> Establish connection?
                </div>
              )}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl text-sm font-medium ${
                    m.role === 'user' 
                      ? 'bg-gold-500 text-wood-900 rounded-tr-none' 
                      : 'bg-black/40 text-slate-200 border border-white/10 rounded-tl-none'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-black/40 p-3 rounded-xl rounded-tl-none border border-white/10 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-[#1a1111] border-t border-gold-900/30 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Message the crew..."
                className="flex-1 bg-black/50 border border-gold-900/30 rounded-lg px-4 py-2 text-sm text-gold-400 placeholder:text-gold-900/50 focus:outline-none focus:border-gold-500"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-gold-500 hover:bg-gold-400 disabled:opacity-50 text-wood-900 p-2 rounded-lg transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) playSound(SOUNDS.SNAIL_PICKUP, 0.2);
        }}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-4 transition-all duration-300 ${
          isOpen ? 'bg-red-600 border-red-900' : 'bg-gold-500 border-gold-900'
        }`}
      >
        <Phone className={`w-8 h-8 ${isOpen ? 'text-white' : 'text-wood-900'}`} />
        {!isOpen && (
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
          >
            <Sparkles className="w-3 h-3 text-white" />
          </motion.div>
        )}
      </motion.button>
    </div>
  );
};

const CodeforcesShowcase = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/codeforces/user');
        const result = await response.json();
        if (result.status === "OK") {
          setData(result.result[0]);
        }
      } catch (error) {
        console.error("Failed to fetch Codeforces data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center py-12">
      <RotateCcw className="w-8 h-8 text-gold-500 animate-spin" />
    </div>
  );

  if (!data) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto mt-12 parchment-card p-8 rounded-lg shadow-2xl relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Code2 className="w-32 h-32 text-wood-900" />
      </div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 rounded-xl border-4 border-[#8d6e63] overflow-hidden shadow-lg">
          <img src={data.titlePhoto} alt={data.handle} className="w-full h-full object-cover" />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-end gap-2 mb-4">
            <h3 className="text-4xl font-pirate text-wood-900 tracking-widest">{data.handle}</h3>
            <span className="text-red-800 font-bold uppercase tracking-widest text-sm mb-1">{data.rank}</span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center md:text-left">
              <div className="text-[10px] uppercase tracking-widest text-wood-800/60 font-bold mb-1">Rating</div>
              <div className="text-2xl font-pirate text-red-800">{data.rating}</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-[10px] uppercase tracking-widest text-wood-800/60 font-bold mb-1">Max Rating</div>
              <div className="text-2xl font-pirate text-red-800">{data.maxRating}</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-[10px] uppercase tracking-widest text-wood-800/60 font-bold mb-1">Max Rank</div>
              <div className="text-xl font-pirate text-wood-900 leading-tight">{data.maxRank}</div>
            </div>
            <div className="text-center md:text-left">
              <div className="text-[10px] uppercase tracking-widest text-wood-800/60 font-bold mb-1">Contribution</div>
              <div className="text-2xl font-pirate text-wood-900">{data.contribution}</div>
            </div>
          </div>
        </div>
        
        <motion.a 
          href={`https://codeforces.com/profile/${data.handle}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-red-800 text-white rounded-lg font-pirate tracking-widest shadow-lg hover:bg-red-900 transition-colors"
        >
          View Profile
        </motion.a>
      </div>
    </motion.div>
  );
};

const HobbiesPage = ({ isInline, onBack }: { isInline?: boolean, onBack?: () => void }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Photography');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  useEffect(() => {
    if (!isInline) {
      window.scrollTo(0, 0);
    }
  }, [isInline]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/');
    }
  };

  const hobbies = [
    {
      title: "Photography",
      description: "Capturing the beauty of the Grand Line through my lens. From vibrant nature to the silent stars, I find stories in every frame.",
      icon: <Camera className="w-8 h-8" />,
      externalLink: "https://pranav00076.github.io/PhotoTrance/",
      externalLinkText: "Visit PhotoTrance Gallery",
      bgImage: "https://imgs.search.brave.com/aDTlBHIk10Zgn9DmY9ZwoPOsaGvjOv7tMZa3CnAgFUA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvMTM4/MzI5NjgvcGV4ZWxz/LXBob3RvLTEzODMy/OTY4LmpwZWc_YXV0/bz1jb21wcmVzcyZj/cz10aW55c3JnYiZk/cHI9MSZ3PTUwMA",
      imageStyle: "gallery",
      images: [
        "https://pin.it/3rS4NzQlH",
        "https://pin.it/2eV71VLOj",
        "https://pin.it/2mZ1zJRNe"
      ]
    },
    {
      title: "Art",
      description: "Expressing creativity through sketches and digital illustrations. Inspired by the bold lines and vibrant colors of the pirate world.",
      icon: <Palette className="w-8 h-8" />,
      externalLink: "https://drive.google.com/drive/folders/1s2Wo9QKf0XJOJPBsOd1FgpJ8mcIBOVh_",
      externalLinkText: "View Full Gallery on Google Drive",
      bgImage: "https://imgs.search.brave.com/80WWBq2iAj2AGYW2CBL8vw2pEGga1t1caAi4n9R2cm4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/d2FsbHBhcGVyc2Fm/YXJpLmNvbS81Mi83/Ny9zZEVnOHEzLndl/YnA",
      imageStyle: "gallery",
      images: [
        "https://drive.google.com/uc?id=11bbg0WJyWRtz5oPpfGW4CkGciitHmE3a",
        "https://drive.google.com/uc?id=1_7BeMOdmCVrQi0g3aJUGfdHFZyQpTnY5",
        "https://drive.google.com/uc?id=1ooYw6ffepmWZH7taeJI3s5AkUsNN2RmL"
      ]
    },
    {
      title: "Anime",
      description: "A deep appreciation for storytelling and animation. From the epic journey of One Piece to the psychological depths of modern classics.",
      icon: <Tv className="w-8 h-8" />,
      topPicks: ["One Piece", "Shinchan", "Hunter x Hunter", "Food Wars", "That Time I Got Reincarnated as a Slime", "Welcome to Demon School"],
      bgImage: "https://imgs.search.brave.com/oaihTkGxF-WQqvy8LqKGPK_bt5Q3kPGtZrOA12FZwGo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXM1LmFscGhhY29k/ZXJzLmNvbS8xMjcv/dGh1bWJiaWctMTI3/OTQ0My53ZWJw",
      imageStyle: "posters",
      images: [
        "https://i.pinimg.com/originals/61/58/6d/61586ddd738db8da7329908069b39bb1.jpg", // One Piece
        "https://i.pinimg.com/originals/49/ee/47/49ee473fbae8721d2437b5e3fd0fcc1e.jpg", // Hunter x Hunter
        "https://i.pinimg.com/originals/44/e8/04/44e80491a2b25fe6de1bbe96cad3a808.jpg" // Shinchan
      ]
    },
    {
      title: "Movies",
      description: "Exploring cinematic universes and the art of filmmaking. I love how a great movie can transport you to another world entirely.",
      icon: <Film className="w-8 h-8" />,
      topPicks: ["John Wick", "Leo (Thalapathy Vijay)", "National Treasure", "Doraemon: Nobita's Three Visionary Swordsmen"],
      bgImage: "https://imgs.search.brave.com/YdIog-QJWaW7Vc7qV4wx4dJO9bCWMx7d3YG-nvKZHAE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzZXQuY29t/L3cvZnVsbC80L2Mv/YS81MDQyNzMuanBn",
      imageStyle: "posters",
      images: [
        "https://i.pinimg.com/originals/97/fa/3a/97fa3a8d01230a0b80a1f9ef6b5fa599.jpg", // John Wick
        "https://i.pinimg.com/originals/d3/f2/5f/d3f25fdf93a004ed439a570da97dfed5.jpg", // Leo
        "https://i.pinimg.com/originals/b0/96/16/b09616b6209f66a107da2b36ace71a61.jpg" // National Treasure
      ]
    }
  ];

  const activeHobby = hobbies.find(h => h.title === activeTab) || hobbies[0];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${isInline ? 'py-12 rounded-3xl' : 'min-h-screen pt-32 pb-24'} bg-ocean-950 px-6 relative overflow-hidden`}
    >
      {/* Dynamic Background Elements */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 pointer-events-none bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${(activeHobby as any).bgImage})` }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-ocean-950/60 pointer-events-none" />
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-gold-500 hover:text-gold-400 mb-12 font-pirate tracking-widest transition-colors"
        >
          <ChevronDown className="w-6 h-6 rotate-90" /> Back to Port
        </button>

        <SectionTitle title="Beyond the Code" subtitle="My Hobbies" island="Skypiea" />

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-12 mb-16">
          {hobbies.map((hobby) => (
            <motion.button
              key={hobby.title}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(hobby.title)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-pirate tracking-widest transition-all border-2 ${
                activeTab === hobby.title 
                ? 'bg-gold-500 text-wood-900 border-gold-400 shadow-[0_0_20px_rgba(245,158,11,0.4)]' 
                : 'bg-white/5 text-gold-500 border-white/10 hover:bg-white/10'
              }`}
            >
              {React.cloneElement(hobby.icon as React.ReactElement, { className: "w-5 h-5" })}
              {hobby.title}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col lg:flex-row gap-12 items-center"
          >
            <div className="flex-1 space-y-6">
              <div className="text-gold-500 mb-4">{activeHobby.icon}</div>
              <h3 className="text-4xl font-pirate text-white tracking-widest">{activeHobby.title}</h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                {activeHobby.description}
              </p>

              {/* Top Picks Section */}
              {(activeHobby as any).topPicks && (
                <div className="mt-6">
                  <h4 className="text-xl font-pirate text-gold-400 mb-3 tracking-wider">Top Picks</h4>
                  <ul className="flex flex-wrap gap-2">
                    {(activeHobby as any).topPicks.map((pick: string, idx: number) => (
                      <li key={idx} className="bg-wood-800/80 border border-wood-700 text-slate-300 px-3 py-1.5 rounded-lg text-sm font-medium">
                        {pick}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* External Link Section */}
              {(activeHobby as any).externalLink && (
                <div className="mt-6">
                  <a 
                    href={(activeHobby as any).externalLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> {(activeHobby as any).externalLinkText}
                  </a>
                </div>
              )}

              <div className="flex gap-4 mt-8">
                <div className="w-12 h-1 bg-gold-500 rounded-full" />
                <div className="w-4 h-1 bg-gold-500/30 rounded-full" />
              </div>
            </div>

            <div className={`flex-1 grid ${(activeHobby as any).imageStyle === 'posters' ? 'grid-cols-3 gap-4' : 'grid-cols-2 gap-4'}`}>
              {activeHobby.images.map((img, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2, zIndex: 10 }}
                  onClick={() => setSelectedImage(img)}
                  className={`rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl cursor-pointer relative group ${
                    (activeHobby as any).imageStyle === 'posters' 
                      ? 'aspect-[2/3]' 
                      : (i === 0 ? 'col-span-2 aspect-video' : 'aspect-square')
                  }`}
                >
                  <img 
                    src={img} 
                    alt={activeHobby.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    referrerPolicy="no-referrer"
                    onError={(e) => { 
                      const target = e.currentTarget;
                      if (!target.src.includes('unsplash.com')) {
                        target.src = 'https://images.unsplash.com/photo-1493246507139-91e8bef99c02?q=80&w=800';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <Search className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity scale-50 group-hover:scale-100 duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-[100000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
            >
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={selectedImage}
                alt="Enlarged view"
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border-2 border-gold-500/30"
                referrerPolicy="no-referrer"
                onError={(e) => { 
                  const target = e.currentTarget;
                  if (!target.src.includes('unsplash.com')) {
                    target.src = 'https://images.unsplash.com/photo-1493246507139-91e8bef99c02?q=80&w=800';
                  }
                }}
              />
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                className="absolute top-6 right-6 text-white/50 hover:text-white bg-black/50 hover:bg-black/80 p-2 rounded-full transition-all"
              >
                <X className="w-8 h-8" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 text-center wood-panel p-12 rounded-3xl"
        >
          <Heart className="w-12 h-12 text-red-500 mx-auto mb-6 animate-pulse" />
          <h3 className="text-3xl font-pirate text-gold-400 mb-4 tracking-widest">Life is an Adventure</h3>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            When I'm not navigating the digital seas, I'm out there exploring the real world, 
            capturing moments and finding inspiration in every corner of the horizon.
          </p>
          <button 
            onClick={handleBack}
            className="px-10 py-4 bg-gold-500 text-wood-900 rounded-xl font-bold hover:bg-gold-400 transition-all shadow-lg"
          >
            {isInline ? 'Close Hobbies' : 'Return to Main Voyage'}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const HomePage = () => {
  const [selectedCrewMember, setSelectedCrewMember] = useState<Skill | null>(null);
  const [clashPos, setClashPos] = useState<{ x: number, y: number } | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [skillSearch, setSkillSearch] = useState('');
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [showHobbies, setShowHobbies] = useState<boolean>(false);

  useEffect(() => {
    if (selectedProject) {
      const element = document.getElementById('projects');
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [selectedProject]);

  useEffect(() => {
    if (showHobbies) {
      const element = document.getElementById('hobbies');
      if (element) {
        const y = element.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [showHobbies]);

  const handleClash = useCallback((x: number, y: number) => {
    setClashPos({ x, y });
    setIsShaking(true);
    setTimeout(() => {
      setClashPos(null);
      setIsShaking(false);
    }, 500);
  }, []);

  const filteredSkills = SKILLS.map(cat => ({
    ...cat,
    skills: cat.skills.filter(s => 
      s.name.toLowerCase().includes(skillSearch.toLowerCase()) || 
      s.devilFruit.toLowerCase().includes(skillSearch.toLowerCase())
    )
  })).filter(cat => cat.skills.length > 0);

  return (
    <motion.div
      animate={isShaking ? {
        x: [0, -10, 10, -10, 10, 0],
        y: [0, 5, -5, 5, -5, 0]
      } : {}}
      transition={{ duration: 0.4 }}
    >
      <StarShower />
      <FloatingShips onClash={handleClash} />
      <HakiLightning trigger={clashPos} />
      <DenDenMushiChat />
      <AnimatePresence>
        {selectedCrewMember && (
          <CrewMemberModal 
            skill={selectedCrewMember} 
            onClose={() => setSelectedCrewMember(null)} 
          />
        )}
      </AnimatePresence>
      <OnePieceHero />

      {/* About Section */}
      <section id="about" className="py-24 px-6 max-w-6xl mx-auto relative">
        <ParallaxElement speed={0.5} className="absolute top-20 right-10 opacity-20 hidden lg:block">
          <Star className="w-12 h-12 text-gold-500" />
        </ParallaxElement>
        <ParallaxElement speed={-0.3} className="absolute bottom-20 left-0 opacity-10 hidden lg:block">
          <div className="w-64 h-64 bg-gold-500 rounded-full blur-[100px]" />
        </ParallaxElement>

        <SectionTitle title="The Explorer's Log" subtitle="About Me" island="Foosha Village" />
        
        <div className="grid md:grid-rows-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden wood-panel p-2">
              <img 
                src="/about-me.png" 
                alt="Profile" 
                className="w-full h-full object-cover object-top rounded-xl sepia hover:sepia-0 transition-all duration-700"
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800' }}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold-500/20 rounded-full blur-3xl" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-red-500/20 rounded-full blur-3xl" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-pirate text-gold-400 tracking-widest">Navigating the Grand Line</h3>
            <p className="text-slate-300 leading-relaxed text-lg font-medium">
              I am a curious and driven student with a strong interest in technology and artificial intelligence. 
              My journey is fueled by a passion for learning through projects, problem-solving, and exploring 
              creative applications of AI to build practical and innovative solutions.
            </p>
            <p className="text-slate-300 leading-relaxed text-lg font-medium">
              Whether it's diving into complex AI architectures, solving intricate algorithmic problems, 
              or collaborating in high-energy hackathons, I thrive on the challenge of the unknown. 
              My goal is to bridge the gap between human imagination and digital reality.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="parchment-card p-4 rounded-sm">
                <div className="text-red-800 font-pirate text-3xl mb-1">10+</div>
                <div className="text-wood-800/60 text-[10px] uppercase tracking-widest font-bold">Projects Built</div>
              </div>
              <div className="parchment-card p-4 rounded-sm">
                <div className="text-gold-800 font-pirate text-3xl mb-1">5+</div>
                <div className="text-wood-800/60 text-[10px] uppercase tracking-widest font-bold">Hackathons</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 bg-ocean-900/50 relative overflow-hidden">
        <ParallaxElement speed={0.8} className="absolute -top-20 -left-20 opacity-10">
          <Cpu className="w-64 h-64 text-gold-500" />
        </ParallaxElement>
        <ParallaxElement speed={-0.5} className="absolute -bottom-20 -right-20 opacity-10">
          <Rocket className="w-64 h-64 text-gold-500" />
        </ParallaxElement>

        <div className="max-w-6xl mx-auto relative z-10">
          <SectionTitle title="Arsenal & Tools" subtitle="Technical Skills" island="Devil Fruit Island" />
          
          {/* Skill Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto mb-16 relative group"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gold-500/50 group-focus-within:text-gold-500 transition-colors" />
            </div>
            <input 
              type="text" 
              placeholder="Search by Skill or Devil Fruit..."
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              className="w-full bg-black/40 border-2 border-gold-900/30 rounded-xl py-4 pl-12 pr-4 text-gold-400 placeholder:text-gold-900/50 focus:outline-none focus:border-gold-500 focus:bg-black/60 focus:shadow-[0_0_20px_rgba(245,158,11,0.15)] transition-all font-mono shadow-2xl"
            />
            <div className="absolute -bottom-1 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {filteredSkills.map((cat, idx) => (
              <motion.div 
                key={cat.category}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="wood-panel p-8 rounded-2xl hover:border-gold-500/30 transition-all group"
              >
                <h4 className="text-2xl font-pirate mb-6 text-gold-400 group-hover:glow-gold tracking-widest">{cat.category}</h4>
                <div className="flex flex-col gap-4">
                  {cat.skills.map((skill, sIdx) => (
                    <motion.div 
                      key={skill.name}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (idx * 0.1) + (sIdx * 0.05) }}
                      className="relative group/skill"
                    >
                      <div 
                        onClick={() => setSelectedCrewMember(skill)}
                        className="flex items-center gap-3 px-4 py-3 bg-black/20 rounded-lg border border-white/5 hover:border-gold-500/40 hover:bg-gold-500/10 transition-all cursor-pointer group/item"
                      >
                        <span className="text-gold-400 group-hover/skill:scale-125 transition-transform duration-300">{skill.icon}</span>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-slate-300 group-hover/skill:text-gold-400 transition-colors flex items-center gap-2">
                            {skill.name}
                            {skill.role && (
                              <span className="text-[10px] bg-red-900/40 text-red-500 px-1.5 py-0.5 rounded border border-red-500/30 font-pirate tracking-tighter">
                                {skill.role}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] font-pirate text-red-500/60 uppercase tracking-widest opacity-0 group-hover/skill:opacity-100 transition-opacity">
                            {skill.devilFruit}
                          </div>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-gold-500/20 group-hover/skill:bg-gold-500 group-hover/skill:shadow-[0_0_10px_rgba(245,158,11,1)] transition-all" />
                        
                        {/* Click indicator */}
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                          <Anchor className="w-3 h-3 text-gold-500 animate-bounce" />
                        </div>
                      </div>
                      
                      {/* Tooltip-style description */}
                      <div className="absolute left-0 top-full mt-2 w-full z-50 pointer-events-none opacity-0 group-hover/skill:opacity-100 transition-all duration-300 translate-y-2 group-hover/skill:translate-y-0">
                        <div className="parchment-card p-3 rounded-sm border-2 border-wood-800 shadow-2xl">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">🍎</span>
                            <span className="text-xs font-pirate text-wood-900 tracking-widest">{skill.devilFruit}</span>
                          </div>
                          <p className="text-[11px] text-wood-800/80 font-medium leading-tight">
                            {skill.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 max-w-7xl mx-auto relative">
        <ParallaxElement speed={0.4} className="absolute top-1/2 -left-40 opacity-5 hidden xl:block">
          <div className="text-[200px] font-pirate leading-none select-none text-gold-500">FLEET</div>
        </ParallaxElement>

        <SectionTitle title="The Grand Line Fleet" subtitle="Featured Projects" island="Enies Lobby" />
        
        <AnimatePresence mode="wait">
          {selectedProject ? (
            <motion.div
              key="project-details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ProjectDetails projectId={selectedProject} onBack={() => {
                setSelectedProject(null);
                setTimeout(() => {
                  const element = document.getElementById('projects');
                  if (element) {
                    const y = element.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }, 100);
              }} />
            </motion.div>
          ) : (
            <motion.div
              key="project-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-12"
            >
              {PROJECTS.map((project, idx) => (
                <div key={project.id} onClick={() => setSelectedProject(project.id)}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ 
                      y: -5,
                      scale: 1.01,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)"
                    }}
                    className="bg-[#111111] border border-[#333333] rounded-2xl overflow-hidden group transition-all duration-300 cursor-pointer h-full flex flex-col relative font-mono text-gray-300 p-6"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-2 text-white">
                        <Swords className="w-5 h-5 text-gray-400" />
                        <h3 className="text-lg">Boss Battle: {project.title}</h3>
                      </div>
                      <Copy className="w-5 h-5 text-gray-500 hover:text-white transition-colors" />
                    </div>

                    <div className="mb-6">
                      <div className="text-gray-500 mb-2">Mission:</div>
                      <p className="text-sm leading-relaxed">{project.description}</p>
                    </div>

                    <div className="mb-6">
                      <div className="text-gray-500 mb-3 text-xs uppercase tracking-widest font-bold">Challenges:</div>
                      <ul className="text-sm space-y-2">
                        {project.tags.map(tag => (
                          <li key={tag} className="flex items-center gap-3 text-slate-400 group-hover:text-slate-200 transition-colors">
                            <span className="w-1.5 h-1.5 bg-gold-500/40 group-hover:bg-gold-500 rounded-full transition-colors"></span>
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-6 border-t border-white/5">
                      <div className="text-gray-500 mb-2 text-xs uppercase tracking-widest font-bold">Outcome:</div>
                      <p className="text-sm text-gold-500/80 font-medium">Successfully claimed {project.reward} ฿ bounty.</p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 bg-ocean-900/30 relative overflow-hidden">
        <ParallaxElement speed={-0.2} className="absolute top-0 right-0 opacity-10">
          <div className="w-[500px] h-[500px] border border-gold-500/20 rounded-full" />
        </ParallaxElement>
        <ParallaxElement speed={0.3} className="absolute bottom-0 left-0 opacity-10">
          <div className="w-[300px] h-[300px] border border-gold-500/20 rounded-full" />
        </ParallaxElement>

        <div className="max-w-6xl mx-auto">
          <SectionTitle title="Voyage Timeline" subtitle="Experience & Milestones" island="Marineford" />
          
          <div className="grid md:grid-cols-3 gap-6">
            {EXPERIENCE.map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, rotate: idx % 2 === 0 ? -3 : 3 }}
                whileInView={{ opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03, rotate: idx % 2 === 0 ? -1 : 1 }}
                className="parchment-card p-4 rounded-sm shadow-xl relative group"
              >
                <div className="border-2 border-[#8d6e63] p-3 h-full flex flex-col items-center text-center">
                  <div className="text-xl font-pirate text-wood-900 mb-0.5 uppercase tracking-tighter">Wanted</div>
                  <div className="text-[8px] font-bold text-red-800 mb-3 uppercase tracking-widest">Dead or Alive</div>
                  
                  <h4 className="text-lg font-pirate text-wood-900 mb-0.5 tracking-widest uppercase leading-tight">{item.title}</h4>
                  <div className="text-red-800 text-[9px] font-bold mb-2 uppercase tracking-wider">{item.organization} • {item.period}</div>
                  
                  <p className="text-wood-800/80 text-[9px] leading-tight font-medium mb-4 flex-1">
                    {item.description}
                  </p>

                  <div className="w-full pt-4 border-t border-[#8d6e63] border-dashed">
                    <div className="text-[10px] font-pirate text-wood-900 mb-1 tracking-widest">BOUNTY</div>
                    <div className="text-2xl font-pirate text-red-800 tracking-wider drop-shadow-sm group-hover:scale-110 transition-transform">
                      {formatBounty(item.bounty)} ฿
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <CodeforcesShowcase />
        </div>
      </section>

      <CertificationsSection />

      {/* Hobbies Section */}
      <section id="hobbies" className="py-24 px-6 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {showHobbies ? (
            <motion.div
              key="hobbies-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-7xl mx-auto"
            >
              <HobbiesPage isInline={true} onBack={() => {
                setShowHobbies(false);
                setTimeout(() => {
                  const element = document.getElementById('hobbies');
                  if (element) {
                    const y = element.getBoundingClientRect().top + window.scrollY - 100;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                  }
                }, 100);
              }} />
            </motion.div>
          ) : (
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <motion.div
                key="hobbies-cta"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="wood-panel p-12 rounded-3xl border-2 border-gold-500/20 shadow-[0_0_50px_rgba(245,158,11,0.1)]"
              >
                <Camera className="w-16 h-16 text-gold-500 mx-auto mb-6" />
                <h2 className="text-4xl font-pirate text-white mb-6 tracking-widest">Beyond the Digital Horizon</h2>
                <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
                  When I'm not coding, I'm capturing the world through my lens. Explore my collection of photography and other creative pursuits.
                </p>
                <button 
                  onClick={() => setShowHobbies(true)}
                  className="inline-flex items-center gap-3 px-10 py-4 bg-gold-500 hover:bg-gold-400 text-wood-900 rounded-xl font-bold text-lg shadow-lg transition-all hover:scale-105"
                >
                  Check out Hobbies <Sparkles className="w-6 h-6" />
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      <section id="contact" className="py-24 px-6 max-w-5xl mx-auto text-center">
        <SectionTitle title="Establish Communication" subtitle="Contact" island="Laugh Tale" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="wood-panel p-12 rounded-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
          
          <h3 className="text-3xl md:text-4xl font-pirate mb-6 text-gold-400 tracking-widest">Ready for the Next Mission?</h3>
          <p className="text-slate-300 max-w-2xl mx-auto mb-12 text-lg font-medium">
            I'm always open to new opportunities, collaborations, or just a friendly chat about technology and the Grand Line. 
            Let's build something extraordinary together.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <motion.a 
              whileHover={{ y: -5, scale: 1.05 }}
              href="mailto:pranavthawait02@gmail.com"
              className="flex items-center gap-3 px-6 py-3 bg-black/20 rounded-xl border border-white/10 hover:border-gold-500/40 hover:bg-gold-500/5 transition-all"
            >
              <Mail className="w-5 h-5 text-gold-400" />
              <span className="font-medium">Email Me</span>
            </motion.a>
            <motion.a 
              whileHover={{ y: -5, scale: 1.05 }}
              href="tel:+919399052987"
              className="flex items-center gap-3 px-6 py-3 bg-black/20 rounded-xl border border-white/10 hover:border-gold-500/40 hover:bg-gold-500/5 transition-all"
            >
              <Phone className="w-5 h-5 text-gold-400" />
              <span className="font-medium">+91 93990 52987</span>
            </motion.a>
            <motion.a 
              whileHover={{ y: -5, scale: 1.05 }}
              href="https://github.com/Pranav00076"
              target="_blank"
              className="flex items-center gap-3 px-6 py-3 bg-black/20 rounded-xl border border-white/10 hover:border-gold-500/40 hover:bg-gold-500/5 transition-all"
            >
              <Github className="w-5 h-5 text-gold-400" />
              <span className="font-medium">GitHub</span>
            </motion.a>
            <motion.a 
              whileHover={{ y: -5, scale: 1.05 }}
              href="https://linkedin.com"
              target="_blank"
              className="flex items-center gap-3 px-6 py-3 bg-black/20 rounded-xl border border-white/10 hover:border-gold-500/40 hover:bg-gold-500/5 transition-all"
            >
              <Linkedin className="w-5 h-5 text-gold-400" />
              <span className="font-medium">LinkedIn</span>
            </motion.a>
          </div>
          
          <ContactForm />
        </motion.div>
      </section>
    </motion.div>
  );
};

const LoadingScreen = ({ progress }: { progress: number }) => (
  <motion.div
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className="fixed inset-0 z-[100000] bg-ocean-950 flex flex-col items-center justify-center"
  >
    <motion.div
      animate={{ 
        y: [0, -15, 0],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      className="mb-8 relative"
    >
      <Skull className="w-24 h-24 text-gold-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
      <motion.div 
        className="absolute -inset-4 border-2 border-dashed border-gold-500/30 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
      />
    </motion.div>
    
    <h2 className="text-3xl font-pirate text-gold-500 mb-8 tracking-widest drop-shadow-md">
      Setting Sail...
    </h2>
    
    <div className="w-64 h-3 bg-ocean-900 rounded-full overflow-hidden border-2 border-gold-900/50 relative shadow-[0_0_15px_rgba(0,0,0,0.5)_inset]">
      <motion.div
        className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-gold-600 to-gold-400"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </div>
    <div className="mt-4 text-gold-500/60 font-mono text-sm font-bold">
      {Math.round(progress)}%
    </div>
  </motion.div>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    setLoadingProgress(0);
    
    const interval = setInterval(() => {
      setLoadingProgress(p => {
        if (p >= 90) return p;
        return p + Math.random() * 15;
      });
    }, 100);

    const timeout = setTimeout(() => {
      setLoadingProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        clearInterval(interval);
      }, 400);
    }, 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [location.pathname]);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', island: 'Foosha', id: 'about' },
    { name: 'Skills', island: 'Devil Fruit', id: 'skills' },
    { name: 'Projects', island: 'Enies Lobby', id: 'projects' },
    { name: 'Experience', island: 'Marineford', id: 'experience' },
    { name: 'Contact', island: 'Laugh Tale', id: 'contact' }
  ];

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not on home page, navigate home first
      window.location.hash = "/#" + id;
    }
  };

  // Handle hash change for cross-page navigation
  useEffect(() => {
    const currentHash = window.location.hash;
    if (location.pathname === '/' && currentHash.indexOf('#') !== -1) {
      const id = currentHash.split('#').pop();
      if (id) {
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const [gear5Active, setGear5Active] = useState(false);

  useEffect(() => {
    let typedKeys = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      typedKeys = (typedKeys + e.key).slice(-5).toLowerCase();
      if (typedKeys === 'luffy') {
        setGear5Active(true);
        setTimeout(() => setGear5Active(false), 5000); // Reset after 5s
        typedKeys = ''; // Reset so it can be triggered again
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <div className="relative min-h-screen selection:bg-gold-500/30 bg-ocean-950 text-slate-200">
      
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && <LoadingScreen progress={loadingProgress} />}
      </AnimatePresence>

      {/* Gear 5 Easter Egg Animation */}
      <AnimatePresence>
        {gear5Active && (
          <motion.div 
            key="gear5-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[10000] pointer-events-none flex items-center justify-center bg-white/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring", bounce: 0.5 }}
              className="text-center"
            >
              <div className="text-6xl md:text-9xl font-pirate text-gold-500 drop-shadow-[0_0_30px_rgba(245,158,11,1)] mb-8">
                GEAR 5
              </div>
              <div className="text-2xl md:text-4xl font-pirate text-wood-900 tracking-widest">
                Sun God Nika
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <DynamicBackgrounds />
      <StarBackground />
      <OceanWaves />
      <MysteryFog />
      <SeaPath />
      
      {/* Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
          isScrolled ? 'backdrop-blur-xl bg-ocean-950/80 border-b border-white/10 py-3 shadow-2xl' : 'bg-transparent'
        }`}>
          {/* Scroll Progress Bar */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-500 origin-left z-50"
            style={{ scaleX }}
          />
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-pirate tracking-widest flex items-center gap-2 group"
              >
                <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.5)] group-hover:rotate-12 transition-transform">
                  <Anchor className="w-6 h-6 text-wood-900" />
                </div>
                <span className="hidden sm:block text-gold-500 group-hover:text-gold-400 transition-colors">GRAND LINE</span>
              </motion.div>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8 text-sm font-pirate tracking-widest text-slate-400">
              {navItems.map((item) => (
                <button 
                  key={item.name} 
                  onClick={() => scrollToSection(item.id)}
                  className="hover:text-gold-400 transition-colors relative group flex flex-col items-center"
                >
                  <span className="text-[8px] text-red-500/60 opacity-0 group-hover:opacity-100 transition-opacity mb-1">{item.island}</span>
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-400 transition-all group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-gold-500 p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-0 z-[60] bg-ocean-950 flex flex-col md:hidden"
              >
                <div className="p-6 flex justify-between items-center border-b border-white/10 bg-black/40 backdrop-blur-md">
                  <div className="text-xl font-pirate tracking-widest text-gold-500 flex items-center gap-2">
                    <Anchor className="w-6 h-6 animate-pulse" />
                    <span>LOG POSE</span>
                  </div>
                  <button 
                    onClick={() => setIsMenuOpen(false)} 
                    className="text-gold-500 p-2 hover:bg-white/5 rounded-full transition-colors active:scale-90"
                  >
                    <X className="w-8 h-8" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-10">
                  {navItems.map((item, idx) => (
                    <motion.button 
                      key={item.name} 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => scrollToSection(item.id)}
                      className="text-4xl font-pirate tracking-widest text-slate-300 hover:text-gold-400 text-left flex items-center justify-between group py-2"
                    >
                      <div className="flex flex-col">
                        <span className="text-[10px] text-red-500/60 font-mono mb-1 tracking-[0.5em]">{item.island}</span>
                        <span>{item.name}</span>
                      </div>
                      <ChevronDown className="w-6 h-6 -rotate-90 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                    </motion.button>
                  ))}
                </div>

                <div className="p-8 border-t border-white/10 bg-black/40 backdrop-blur-md">
                  <div className="text-gold-500/40 font-pirate text-xs uppercase tracking-[0.3em] mb-6">Connect with the Fleet</div>
                  <div className="flex gap-8">
                    <motion.a whileTap={{ scale: 0.9 }} href="https://github.com/Pranav00076" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-gold-400 transition-colors"><Github className="w-8 h-8" /></motion.a>
                    <motion.a whileTap={{ scale: 0.9 }} href="https://www.linkedin.com/in/pranav-thawait-140a092b2" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-gold-400 transition-colors"><Linkedin className="w-8 h-8" /></motion.a>
                    <motion.a whileTap={{ scale: 0.9 }} href="mailto:pranavthawait02@gmail.com" className="text-slate-400 hover:text-gold-400 transition-colors"><Mail className="w-8 h-8" /></motion.a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/hobbies" element={<HobbiesPage />} />
          </Routes>
        </AnimatePresence>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/5 text-center bg-wood-900 relative z-10">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-slate-500 text-sm font-medium">
              © 2026 Pranav Thawait. Built with passion and pirate spirit.
            </div>
            <div className="flex gap-6">
              <a href="https://github.com/Pranav00076" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-gold-400 transition-colors"><Github className="w-5 h-5" /></a>
              <a href="https://www.linkedin.com/in/pranav-thawait-140a092b2" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-gold-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="mailto:pranavthawait02@gmail.com" className="text-slate-400 hover:text-gold-400 transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
        </footer>
      </div>
  );
}
