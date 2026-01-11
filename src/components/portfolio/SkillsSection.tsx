import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import SkillRadarChart from './SkillRadarChart';
const skills = [{
  name: 'Flutter',
  level: 88,
  category: 'Mobile'
}, {
  name: 'TypeScript',
  level: 85,
  category: 'Languages'
}, {
  name: 'Node.js',
  level: 78,
  category: 'Backend'
}, {
  name: 'Python',
  level: 72,
  category: 'Languages'
}, {
  name: 'Docker',
  level: 65,
  category: 'DevOps'
}, {
  name: 'React',
  level: 55,
  category: 'Frontend'
}];
const education = {
  degree: 'BSc in Software Engineering',
  institution: 'Istanbul Nişantaşı University',
  duration: '2024 - 2027',
  focus: ['Software Engineering', 'Mobile Development', 'Backend Architecture'],
  certification: '5× DataCamp Certificates (Python/ML)'
};
const SkillBar = ({
  skill,
  index,
  isInView
}: {
  skill: typeof skills[0];
  index: number;
  isInView: boolean;
}) => {
  return <motion.div className="mb-6" initial={{
    opacity: 0,
    x: -20
  }} animate={isInView ? {
    opacity: 1,
    x: 0
  } : {}} transition={{
    duration: 0.5,
    delay: index * 0.1
  }}>
      <div className="flex justify-between mb-2">
        <span className="font-mono text-sm text-foreground">{skill.name}</span>
        <span className="font-mono text-sm text-primary">{skill.level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full relative" style={{
        background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))'
      }} initial={{
        width: 0
      }} animate={isInView ? {
        width: `${skill.level}%`
      } : {
        width: 0
      }} transition={{
        duration: 1,
        delay: 0.3 + index * 0.1,
        ease: 'easeOut'
      }}>
          {/* Glow effect */}
          <div className="absolute inset-0 blur-sm bg-inherit opacity-50" />
        </motion.div>
      </div>
    </motion.div>;
};
const TechCard = ({
  tech,
  index,
  isInView
}: {
  tech: string;
  index: number;
  isInView: boolean;
}) => {
  return <motion.div 
    className="px-4 py-2 rounded-sm border border-primary/40 font-mono text-sm cursor-default
               transition-all duration-300 hover:border-primary hover:bg-primary/10"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={isInView ? { opacity: 1, scale: 1 } : {}}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    whileHover={{ scale: 1.05, y: -2 }}
  >
    <span className="text-primary">
      {tech}
    </span>
  </motion.div>;
};
const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  const [showRadar, setShowRadar] = useState(true);
  const techStack = ['Flutter', 'Dart', 'Supabase', 'PostgreSQL', 'SQL', 'TypeScript', 'Node.js', 'Python', 'Docker', 'Git'];
  return <section id="skills" className="py-20 md:py-32 relative" ref={ref}>
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-primary font-mono">03.</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Skills & Education
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skills column with toggle */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6
        }}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display text-xl font-semibold text-primary">
                Technical Skills
              </h3>
              {/* View toggle */}
              <div className="flex items-center gap-2">
                <button onClick={() => setShowRadar(true)} className={`px-3 py-1 font-mono text-xs rounded-sm border transition-all duration-300
                             ${showRadar ? 'border-primary bg-primary/20 text-primary' : 'border-border text-muted-foreground hover:border-primary/50'}`}>
                  Chart
                </button>
                <button onClick={() => setShowRadar(false)} className={`px-3 py-1 font-mono text-xs rounded-sm border transition-all duration-300
                             ${!showRadar ? 'border-primary bg-primary/20 text-primary' : 'border-border text-muted-foreground hover:border-primary/50'}`}>
                  List
                </button>
              </div>
            </div>

            {showRadar ? <motion.div key="radar" initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} exit={{
            opacity: 0,
            scale: 0.9
          }} transition={{
            duration: 0.3
          }}>
                <SkillRadarChart />
              </motion.div> : <motion.div key="list" initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} exit={{
            opacity: 0,
            x: -20
          }} transition={{
            duration: 0.3
          }}>
                {skills.map((skill, index) => <SkillBar key={skill.name} skill={skill} index={index} isInView={isInView} />)}
              </motion.div>}
          </motion.div>

          {/* Education column */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6,
          delay: 0.2
        }}>
            <h3 className="font-display text-xl font-semibold text-secondary mb-8">
              Education
            </h3>
            
            {/* Education card */}
            <div className="glass p-6 rounded-lg border border-secondary/30 hover:border-secondary/60 
                          transition-all duration-300 relative overflow-hidden group">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-secondary/20 to-transparent" />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-display text-lg font-bold text-foreground">
                      {education.degree}
                    </h4>
                    <p className="font-mono text-sm text-muted-foreground mt-1">
                      {education.institution}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-secondary/20 text-secondary font-mono text-xs rounded-sm">
                    {education.duration}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {education.focus.map(item => <span key={item} className="px-3 py-1 border border-accent/30 font-mono text-xs rounded-sm text-primary">
                      {item}
                    </span>)}
                </div>
              </div>
            </div>

            {/* Certification */}
            <div className="mt-6 px-3 py-2 bg-chart-4/10 border border-chart-4/30 rounded-sm">
              <span className="font-mono text-xs text-chart-4">
                🏆 {education.certification}
              </span>
            </div>

            {/* Currently learning */}
            <div className="mt-8">
              <h4 className="font-mono text-sm text-muted-foreground mb-4">
                <span className="text-neon-green">●</span> Currently Exploring
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Python ML', 'scikit-learn', 'Advanced RLS', 'MVVM'].map(item => <span key={item} className="px-3 py-1 bg-neon-green/10 text-neon-green font-mono text-xs rounded-sm 
                             border border-neon-green/30">
                    {item}
                  </span>)}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tech stack floating cards */}
        <motion.div className="mt-16" initial={{
        opacity: 0
      }} animate={isInView ? {
        opacity: 1
      } : {}} transition={{
        duration: 0.6,
        delay: 0.4
      }}>
          <h3 className="font-mono text-sm text-muted-foreground mb-6 text-center">
            {'<'} Tech Stack {'/>'} 
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, index) => <TechCard key={tech} tech={tech} index={index} isInView={isInView} />)}
          </div>
        </motion.div>
      </div>
    </section>;
};
export default SkillsSection;