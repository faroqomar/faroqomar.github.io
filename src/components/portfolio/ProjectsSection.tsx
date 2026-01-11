import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Code2 } from 'lucide-react';
import HolographicCard from '@/components/effects/HolographicCard';
import GlitchText from '@/components/effects/GlitchText';

const projects = [
  {
    id: 1,
    title: 'SLine',
    description: 'Upwork/Fiverr-style freelance marketplace platform with task posting, requests, chat, and wallet/escrow—built with strong architecture and backend policies.',
    tech: ['Flutter', 'Supabase', 'Postgres', 'MVVM'],
    image: null,
    github: '#',
    live: '#',
    color: 'cyan' as const,
    isPrivate: true,
  },
  {
    id: 2,
    title: 'Smart Route Optimization',
    description: 'Optimizes routes from start → multiple stores → end to minimize time/distance. Supports saving locations/routes and importing from Maps.',
    tech: ['Flutter', 'Python', 'FastAPI', 'Algorithms'],
    image: null,
    github: '#',
    live: '#',
    color: 'pink' as const,
    isPrivate: true,
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description: 'The very website you\'re looking at! Built with modern technologies and a cyberpunk aesthetic.',
    tech: ['React', 'TypeScript', 'Three.js', 'Tailwind'],
    image: null,
    github: 'https://github.com/faroqomar',
    live: '#',
    color: 'purple' as const,
    isPrivate: false,
  },
];

const ProjectCard = ({ project, index, isInView }: { project: typeof projects[0]; index: number; isInView: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const colorClasses = {
    cyan: {
      border: 'border-primary/30 hover:border-primary',
      glow: 'hover:neon-border-cyan',
      text: 'text-primary',
      bg: 'bg-primary/10',
      neonText: 'neon-text-cyan',
    },
    pink: {
      border: 'border-secondary/30 hover:border-secondary',
      glow: 'hover:neon-border-pink',
      text: 'text-secondary',
      bg: 'bg-secondary/10',
      neonText: 'neon-text-pink',
    },
    purple: {
      border: 'border-accent/30 hover:border-accent',
      glow: 'hover:neon-border-purple',
      text: 'text-accent',
      bg: 'bg-accent/10',
      neonText: 'neon-text-purple',
    },
  };

  const colors = colorClasses[project.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <HolographicCard
        className={`glass rounded-lg overflow-hidden border ${colors.border} ${colors.glow}
                    transition-all duration-500 group cursor-pointer`}
        glowColor={project.color}
      >
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Project image/placeholder */}
          <div className={`h-48 ${colors.bg} relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ 
                  rotateY: isHovered ? 360 : 0,
                  scale: isHovered ? 1.2 : 1,
                }}
                transition={{ duration: 0.6 }}
              >
                <Code2 className={`w-16 h-16 ${colors.text} opacity-50`} />
              </motion.div>
            </div>
            
            {/* Animated grid overlay */}
            <div className="absolute inset-0 cyber-grid opacity-20" />
            
            {/* Hover overlay with scan effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent to-background"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
            />

            {/* Scan line animation on hover */}
            {isHovered && (
              <motion.div
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                initial={{ top: 0 }}
                animate={{ top: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}

            {/* Floating number */}
            <motion.span 
              className={`absolute top-4 right-4 font-display text-6xl font-bold ${colors.text} opacity-20`}
              animate={{ 
                opacity: isHovered ? 0.5 : 0.2,
                scale: isHovered ? 1.1 : 1,
              }}
            >
              0{project.id}
            </motion.span>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className={`font-display text-xl font-bold mb-3 ${colors.text} ${isHovered ? colors.neonText : ''} transition-all duration-300`}>
              <GlitchText>{project.title}</GlitchText>
            </h3>
            
            <p className="font-mono text-sm text-muted-foreground mb-4 line-clamp-3">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((tech, i) => (
                <motion.span
                  key={tech}
                  className={`px-2 py-1 text-xs font-mono ${colors.bg} ${colors.text} rounded-sm border border-current/20`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.15 + i * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-4">
              {project.isPrivate ? (
                <span className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
                  <Github className="w-4 h-4" />
                  Private
                </span>
              ) : (
                <motion.a
                  href={project.github}
                  className={`flex items-center gap-2 font-mono text-sm ${colors.text} 
                             hover:underline underline-offset-4`}
                  whileHover={{ x: 5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-4 h-4" />
                  Code
                </motion.a>
              )}
            </div>
          </div>

          {/* Corner accent with animation */}
          <motion.div 
            className={`absolute top-0 left-0 w-16 h-16 ${colors.bg} 
                        -translate-x-8 -translate-y-8 rotate-45`}
            animate={{ scale: isHovered ? 1.5 : 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </HolographicCard>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-20 md:py-32 relative" ref={ref}>
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-primary font-mono">01.</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            More Projects
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} isInView={isInView} />
          ))}
        </div>

        {/* View more link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a
            href="https://github.com/faroqomar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-muted-foreground 
                     hover:text-primary transition-colors duration-300"
          >
            <span>View All Projects on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
