import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Star, GitFork, Sparkles } from 'lucide-react';
import HolographicCard from '@/components/effects/HolographicCard';

const FeaturedProject = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  const featuredProject = {
    title: 'Accounting + Inventory App',
    description: 'Production-focused accounting + inventory system built with MVVM architecture. Includes sales/invoices, customers, expenses, reporting, logging, planned PDF exports, plus stock planning and audit flows.',
    longDescription: 'Designed to be clean, fast, and scalable. Features Supabase backend with RLS policies for security, and a comprehensive logging system for debugging and auditing.',
    tech: ['Flutter', 'Dart', 'Supabase', 'PostgreSQL', 'RLS', 'MVVM'],
    isPrivate: true,
    github: '#',
    live: '#',
  };

  return (
    <section className="py-16 md:py-24 relative" ref={ref}>
      <div className="container max-w-6xl mx-auto px-4">
        {/* Featured badge */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 
                       border border-primary/50 rounded-full"
            animate={{ 
              boxShadow: [
                '0 0 20px hsl(var(--primary) / 0.3)',
                '0 0 30px hsl(var(--secondary) / 0.3)',
                '0 0 20px hsl(var(--accent) / 0.3)',
                '0 0 20px hsl(var(--primary) / 0.3)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm text-primary">Featured Project</span>
          </motion.div>
        </motion.div>

        <HolographicCard 
          className="glass rounded-xl overflow-hidden border border-primary/30"
          glowColor="cyan"
        >
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Project visual area */}
            <div className="relative h-64 md:h-80 bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
              {/* Animated grid */}
              <div className="absolute inset-0 cyber-grid opacity-30" />
              
              {/* Floating shapes */}
              <motion.div
                className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary/30 rounded-lg"
                animate={{ 
                  rotate: isHovered ? 45 : 0,
                  scale: isHovered ? 1.1 : 1,
                }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-secondary/30 rounded-full"
                animate={{ 
                  rotate: isHovered ? -45 : 0,
                  scale: isHovered ? 1.2 : 1,
                }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-accent/20 rounded-lg rotate-45"
                animate={{ 
                  rotate: isHovered ? 90 : 45,
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Center icon */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <motion.div
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-primary via-secondary to-accent opacity-20 blur-xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-primary" />
                </div>
              </motion.div>

              {/* Scan line effect */}
              {isHovered && (
                <motion.div
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                  initial={{ top: 0 }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <motion.h3
                  className="font-display text-2xl md:text-3xl font-bold text-primary"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {featuredProject.title}
                </motion.h3>

                {/* Private badge */}
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <span className="px-3 py-1 bg-chart-4/20 text-chart-4 font-mono text-xs rounded-sm border border-chart-4/30">
                    🔒 Private Repository
                  </span>
                </motion.div>
              </div>

              <motion.p
                className="font-mono text-muted-foreground mb-4 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {featuredProject.description}
              </motion.p>

              <motion.p
                className="font-mono text-sm text-muted-foreground/80 mb-6"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {featuredProject.longDescription}
              </motion.p>

              {/* Tech stack */}
              <motion.div
                className="flex flex-wrap gap-2 mb-8"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {featuredProject.tech.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 text-sm font-mono bg-primary/10 text-primary rounded-sm 
                              border border-primary/30 hover:border-primary/60 transition-all duration-300"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>

              {/* Links */}
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <motion.div
                  className="flex items-center gap-2 px-6 py-3 bg-muted/50 border border-border text-muted-foreground 
                           font-mono text-sm rounded-sm cursor-not-allowed"
                >
                  <Github className="w-4 h-4" />
                  Private Repo
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 px-6 py-3 bg-secondary/10 border border-secondary text-secondary 
                           font-mono text-sm rounded-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Demo Coming Soon
                </motion.div>
              </motion.div>
            </div>
          </div>
        </HolographicCard>
      </div>
    </section>
  );
};

export default FeaturedProject;
