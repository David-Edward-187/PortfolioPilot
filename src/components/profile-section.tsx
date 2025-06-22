"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download, ArrowRight, Linkedin, Github, Mail } from 'lucide-react'; 
import { resumeData } from '@/data/resume';

export function ProfileSection() {
  const profile = resumeData;
  const shortBio = profile.bio.split('.')[0] + '.';
  const titleWords = profile.title.split(' ');
  
  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const resumeFileName = `${profile.name.replace(/\s+/g, '_')}_Resume.pdf`;

  const socialLinks = [
    { name: "Email", href: `mailto:${profile.contact.email}`, icon: Mail },
    { name: "LinkedIn", href: profile.contact.linkedin, icon: Linkedin },
    { name: "GitHub", href: profile.contact.github, icon: Github },
  ];

  return (
    <section 
      id="profile" 
      className="min-h-screen w-full flex items-center bg-background text-foreground relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(hsl(var(--muted)/0.2)_1px,transparent_1px)]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          
          <div className="md:order-2 flex justify-center animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <Image
                src={profile.headshotUrl}
                alt={profile.name}
                width={384} 
                height={384}
                className="relative rounded-full object-cover border-4 border-background shadow-xl" 
                data-ai-hint={profile.dataAiHint || "professional headshot tech abstract"}
                priority
              />
            </div>
          </div>
          
          <div className="md:order-1 text-center md:text-left space-y-6">
            <h1 className="text-h1 text-foreground font-extrabold animate-fadeIn" style={{ opacity: 0 }}>{profile.name}</h1>

            <h2 className="text-2xl md:text-4xl text-primary font-semibold tracking-tight flex flex-wrap justify-center md:justify-start gap-x-2.5">
              {titleWords.map((word, i) => (
                <span key={i} className="animate-fadeIn" style={{ animationDelay: `${0.1 + i * 0.1}s`, opacity: 0 }}>
                  {word}
                </span>
              ))}
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto md:mx-0 animate-fadeIn" style={{ animationDelay: `${0.1 + titleWords.length * 0.1}s`, opacity: 0 }}>
              {shortBio}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-5 md:gap-6 pt-4 animate-fadeIn" style={{ animationDelay: `${0.2 + titleWords.length * 0.1}s`, opacity: 0 }}>
              <Button
                size="lg"
                onClick={handleContactClick}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-3.5 text-base font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 group active:scale-95 w-full sm:w-auto" 
                aria-label="Let's Connect"
              >
                Let's Connect <ArrowRight className="ml-2.5 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground px-10 py-3.5 text-base font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 group active:scale-95 w-full sm:w-auto" 
              >
                <a href="/mycv.pdf" download={resumeFileName}>
                  <Download className="mr-2.5 h-5 w-5 group-hover:animate-pulse-once" /> Download Resume
                </a>
              </Button>
            </div>

            <div className="flex justify-center md:justify-start space-x-5 pt-6 animate-fadeIn" style={{ animationDelay: `${0.3 + titleWords.length * 0.1}s`, opacity: 0 }}>
              {socialLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={`Connect on ${link.name}`}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
                >
                  <link.icon className="w-7 h-7" />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
