
import type { ResumeData } from '@/types/resume';

export const resumeData: ResumeData = {
  name: "Alex Johnson",
  title: "Full Stack Developer",
  bio: "A passionate and results-oriented Full Stack Developer with 5+ years of experience in designing, developing, and deploying web applications. Proficient in JavaScript, React, Node.js, and cloud technologies. Committed to continuous learning and building innovative solutions.",
  headshotUrl: "https://placehold.co/240x240.png", 
  dataAiHint: "professional headshot tech abstract", 
  contact: {
    email: "alex.johnson.dev@example.com",
    linkedin: "https://linkedin.com/in/alexjohnsondev",
    github: "https://github.com/alexjohnsondev"
  },
  education: [
    {
      degree: "Master of Science in Computer Science",
      institution: "Tech University",
      years: "Aug 2018 - May 2020",
      details: "Specialized in Web Development and Cloud Computing. Thesis on scalable microservices."
    },
    {
      degree: "Bachelor of Science in Software Engineering",
      institution: "State College of Engineering",
      years: "Sep 2014 - May 2018",
      details: "Graduated with Honors. Capstone project: A real-time collaborative coding platform."
    }
  ],
  experience: [
    {
      role: "Senior Software Engineer",
      company: "Innovate Solutions Ltd.",
      years: "Jan 2021 - Present",
      description: [
        "Led a team of 5 developers in building and maintaining a high-traffic e-commerce platform, successfully handling over 10,000 daily active users.",
        "Architected and implemented new features using React, Node.js, and AWS services, resulting in a 15% increase in user engagement.",
        "Optimized application performance by 30% through targeted code enhancements and infrastructure upgrades on AWS.",
        "Mentored 3 junior developers, fostering skill growth and conducting rigorous code reviews to maintain high-quality standards."
      ]
    },
    {
      role: "Software Developer",
      company: "Web Wizards Inc.",
      years: "Jun 2019 - Dec 2020",
      description: [
        "Developed responsive and pixel-perfect user interfaces for 5+ diverse client projects using React and Next.js, consistently meeting project deadlines.",
        "Collaborated effectively with cross-functional teams of designers and backend developers in an agile environment to deliver high-quality web applications.",
        "Contributed to API development for 3 major client projects using Express.js and MongoDB, enhancing backend functionality and data management.",
        "Engineered a new client-side rendering strategy for a key project, reducing initial page load time by 25% and improving user experience.",
        "Utilized Jest and React Testing Library to write unit and integration tests, increasing code coverage by 20% for assigned modules."
      ]
    },
    {
      role: "Junior Developer Intern",
      company: "Code Crafters Co.",
      years: "Jun 2018 - Aug 2018",
      description: [
        "Assisted senior developers in testing and debugging web applications, contributing to a 10% reduction in pre-release bugs for two projects by implementing automated test scripts with Jest, which reduced manual QA time by approximately 15%."
      ]
    }
  ],
  skills: {
    "Languages": ["JavaScript (ES6+)", "TypeScript", "Python"],
    "Frameworks & Libraries": ["React", "Next.js", "Node.js", "Express.js", "Django"],
    "Datastores": ["PostgreSQL", "MySQL", "MongoDB", "Firebase"],
    "Cloud & DevOps": ["AWS (EC2, S3, Lambda, RDS)", "Docker", "Kubernetes", "Git & GitHub"],
    "Methodologies & APIs": ["Agile Methodologies", "RESTful APIs", "GraphQL"],
    "Other": ["Problem Solving", "Team Collaboration", "Continuous Learning"]
  },
  projects: [
    {
      name: "E-commerce Platform X",
      description: [
        "Built a full-featured e-commerce site with product listings, shopping cart, user authentication, and payment integration using Next.js and Stripe.",
        "Successfully processed over $50,000 in transactions within the first 6 months of launch.",
        "Engineered to support up to 1,000 concurrent users during peak shopping times, maintaining an average response time under 200ms."
      ],
      technologies: ["Next.js", "React", "Stripe", "PostgreSQL", "Tailwind CSS", "AWS"],
      link: "https://github.com/alexjohnsondev/ecommerce-platform",
      imageUrl: "https://placehold.co/600x338.png",
      dataAiHint: "ecommerce ui modern tech"
    },
    {
      name: "TaskForce Zero",
      description: [
        "Developed a collaborative task management tool with real-time updates, drag-and-drop functionality, and an intuitive notification system using React and Firebase.",
        "Users reported a 20% average reduction in task completion time due to real-time collaboration features and streamlined UI.",
        "Achieved 99.9% uptime through robust Firebase backend infrastructure and Firestore data persistence."
      ],
      technologies: ["React", "Firebase", "Material UI", "Node.js"],
      link: "https://github.com/alexjohnsondev/task-manager",
      imageUrl: "https://placehold.co/600x338.png",
      dataAiHint: "task manager app professional clean"
    },
    {
      name: "PortfolioPilot (This Site)",
      description: [
        "Designed and developed this portfolio to showcase skills and projects effectively with a professional tech aesthetic.",
        "Built with Next.js for optimal performance and SEO, and styled with Tailwind CSS for a modern, responsive design.",
        "Features dynamically rendered resume content from a TypeScript data file, ensuring easy updates and maintenance."
      ],
      technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel"],
      link: "#", 
      imageUrl: "https://placehold.co/600x338.png",
      dataAiHint: "portfolio website code screen tech"
    }
  ],
  certificates: [
    {
      name: "Node.js Master Course",
      issuingOrganization: "Udemy",
      issueDate: "Mar 2022",
      credentialUrl: "https://www.udemy.com/certificate/UC-EXAMPLE-1/",
      imageUrl: "https://placehold.co/400x300.png",
      dataAiHint: "nodejs certificate tech document",
      description: "Covered Node.js fundamentals, Express, MongoDB, Mongoose, and building RESTful APIs. Completed all modules and projects."
    },
    {
      name: "Advanced React & Redux",
      issuingOrganization: "Udemy",
      issueDate: "Jul 2021",
      credentialUrl: "https://www.udemy.com/certificate/UC-EXAMPLE-2/",
      imageUrl: "https://placehold.co/400x300.png",
      dataAiHint: "react course modern tech abstract",
      description: "In-depth exploration of React, including hooks, context API, Redux, and React Router. Built multiple complex applications."
    },
    {
      name: "AWS Cloud Architect Pro",
      issuingOrganization: "Amazon Web Services",
      issueDate: "Nov 2022",
      credentialUrl: "https://www.credly.com/badges/example-aws-badge",
      imageUrl: "https://placehold.co/400x300.png",
      dataAiHint: "aws certification professional design",
      description: "Validated ability to design and deploy scalable, highly available, and fault-tolerant systems on AWS. Passed with a score of 850/1000."
    }
  ]
};
