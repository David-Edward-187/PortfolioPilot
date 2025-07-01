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
  education: [
    {
      degree: "Master of Science in Computer Science",
      institution: "University of Technology",
      years: "2020 - 2022",
      details: "Focused on Human-Computer Interaction and Advanced Web Technologies."
    },
    {
      degree: "Bachelor of Science in Software Engineering",
      institution: "State University",
      years: "2016 - 2020",
      details: "Graduated with honors, specializing in full-stack application development."
    }
  ],
  experience: [
    {
      role: "Senior Frontend Developer",
      company: "Innovate Inc.",
      years: "2022 - Present",
      description: [
        "Lead the development of a new design system using React and Storybook, improving component consistency by 90%.",
        "Architected and built a new customer-facing dashboard with Next.js, resulting in a 40% improvement in page load times.",
        "Mentored junior developers on best practices for clean code, testing, and accessibility."
      ]
    },
    {
      role: "Web Developer",
      company: "Tech Solutions LLC",
      years: "2020 - 2022",
      description: [
        "Developed and maintained responsive websites for various clients using HTML, CSS, and JavaScript.",
        "Collaborated with designers to implement pixel-perfect user interfaces.",
        "Integrated third-party APIs for e-commerce and content management systems."
      ]
    }
  ],
  skills: {
    "Languages": ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3", "Python"],
    "Frameworks & Libraries": ["React", "Next.js", "Node.js", "Express", "Tailwind CSS", "GSAP", "Three.js"],
    "Datastores": ["PostgreSQL", "MongoDB", "Redis", "Firebase"],
    "Cloud & DevOps": ["Docker", "Vercel", "AWS (S3, EC2)", "CI/CD", "Git"],
    "Other": ["Figma", "REST APIs", "GraphQL", "Agile/Scrum"]
  },
  projects: [
    {
      name: "Project Alpha",
      description: ["A futuristic dashboard UI with real-time data visualization and complex interactions."],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts"],
      link: "#",
      githubUrl: "#",
    },
    {
      name: "Project Beta",
      description: ["An innovative e-commerce platform with a focus on immersive 3D product previews."],
      technologies: ["React", "Spline", "Stripe", "Firebase"],
      link: "#",
      githubUrl: "#",
    },
    {
      name: "Project Gamma",
      description: ["A crypto trading interface designed for speed, clarity, and advanced charting."],
      technologies: ["React", "WebSockets", "Canvas API"],
      link: "#",
      githubUrl: "#",
    },
    {
      name: "Project Delta",
      description: ["An AI-powered content generation application with a sleek, minimalist user interface."],
      technologies: ["Next.js", "OpenAI API", "Vercel"],
      link: "#",
      githubUrl: "#",
    },
    {
      name: "Project Epsilon",
      description: ["An interactive data visualization tool for analyzing large datasets with custom filters."],
      technologies: ["D3.js", "React", "Node.js"],
      link: "#",
      githubUrl: "#",
    },
    {
      name: "Project Zeta",
      description: ["A personal portfolio showcasing advanced animations and a unique design aesthetic."],
      technologies: ["Next.js", "Tailwind CSS", "Spline"],
      link: "#",
      githubUrl: "#",
    }
  ],
  certificates: [
    {
        name: "Advanced TypeScript",
        issuingOrganization: "Udemy",
        issueDate: "June 2023",
        credentialUrl: "https://www.udemy.com/certificate/UC-EXAMPLE-1234/",
        description: "Mastered advanced TypeScript features including decorators, mixins, and advanced type-level programming."
    },
    {
        name: "AWS Certified Cloud Practitioner",
        issuingOrganization: "Amazon Web Services",
        issueDate: "March 2023",
        credentialUrl: "https://www.credly.com/badges/EXAMPLE-BADGE-ID",
        description: "Validated foundational, high-level understanding of AWS Cloud, services, and terminology."
    }
  ]
};
