
import type { ResumeData } from '@/types/resume';

export const resumeData: ResumeData = {
  name: "Milad",
  title: "Web Developer",
  bio: "A creative and detail-oriented web developer specializing in building immersive and user-friendly digital experiences. With a passion for clean code and cutting-edge technologies, I transform complex problems into elegant, performant solutions.",
  headshotUrl: "https://placehold.co/320x320.png",
  contact: {
    email: "milad.dev@example.com",
    linkedin: "https://linkedin.com/in/milad-dev",
    github: "https://github.com/milad-dev"
  },
  education: [],
  experience: [],
  skills: {
    "Languages": ["JavaScript (ES6+)", "TypeScript", "HTML", "CSS"],
    "Frameworks & Libraries": ["React", "Next.js", "Tailwind CSS", "GSAP"],
  },
  projects: [
    {
      name: "Project Alpha",
      description: [
        "A futuristic dashboard UI with real-time data visualization and complex interactions.",
      ],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
      link: "#",
    },
    {
      name: "Project Beta",
      description: [
        "An innovative e-commerce platform with a focus on immersive 3D product previews.",
      ],
      technologies: ["React", "Spline", "Stripe", "Firebase"],
      link: "#",
    },
    {
      name: "Project Gamma",
      description: [
        "A crypto trading interface designed for speed, clarity, and advanced charting.",
      ],
      technologies: ["React", "WebSockets", "Canvas API"],
      link: "#",
    },
    {
      name: "Project Delta",
      description: [
        "An AI-powered content generation application with a sleek, minimalist user interface.",
      ],
      technologies: ["Next.js", "OpenAI API", "Vercel"],
      link: "#",
    },
    {
      name: "Project Epsilon",
      description: [
        "An interactive data visualization tool for analyzing large datasets with custom filters.",
      ],
      technologies: ["D3.js", "React", "Node.js"],
      link: "#",
    },
    {
      name: "Project Zeta",
      description: [
        "A personal portfolio showcasing advanced animations and a unique design aesthetic.",
      ],
      technologies: ["Next.js", "Tailwind CSS", "Spline"],
      link: "#",
    }
  ],
  certificates: []
};
