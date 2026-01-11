import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import ProfileAvatar from './ProfileAvatar';
import AnimatedCounter from './AnimatedCounter';

const codeContent = `const farooq = {
  name: "Farooq Omar",
  role: "Software Engineer",
  location: "Istanbul, Turkey",
  
  education: {
    degree: "BSc in Software Engineering",
    university: "Istanbul Nişantaşı University",
    graduation: 2027
  },
  
  interests: [
    "Flutter Development",
    "Backend Architecture",
    "Machine Learning",
    "Database Design"
  ],
  
  currentlyLearning: [
    "Python ML (scikit-learn)",
    "Advanced RLS Patterns",
    "MVVM Architecture"
  ],
  
  motto: "Building real products, end-to-end"
};`;

const SyntaxHighlighter = ({ code }: { code: string }) => {
  const highlightCode = (text: string) => {
    return text.split('\n').map((line, lineIndex) => {
      const highlightedLine = line
        // Keywords
        .replace(/\b(const|let|var|function|return|if|else|for|while)\b/g, '<span class="text-secondary">$1</span>')
        // Strings
        .replace(/"([^"]*)"/g, '<span class="text-neon-green">"$1"</span>')
        // Property names before colon
        .replace(/(\w+):/g, '<span class="text-primary">$1</span>:')
        // Brackets
        .replace(/([{}[\]])/g, '<span class="text-accent">$1</span>')
        // Comments
        .replace(/(\/\/.*$)/gm, '<span class="text-muted-foreground">$1</span>');

      return (
        <div key={lineIndex} className="flex">
          <span className="w-8 text-muted-foreground/50 select-none text-right pr-4">
            {lineIndex + 1}
          </span>
          <span dangerouslySetInnerHTML={{ __html: highlightedLine }} />
        </div>
      );
    });
  };

  return (
    <div className="font-mono text-sm md:text-base leading-relaxed text-neon-green">
      {highlightCode(code)}
    </div>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (isInView && !isTyping) {
      setIsTyping(true);
      let index = 0;
      const typeCode = () => {
        if (index < codeContent.length) {
          setDisplayedCode(codeContent.slice(0, index + 1));
          index++;
          setTimeout(typeCode, 15);
        }
      };
      typeCode();
    }
  }, [isInView, isTyping]);

  const stats = [
    { label: 'Years Coding', value: 2, suffix: '+', icon: '⚡' },
    { label: 'Projects Built', value: 6, suffix: '+', icon: '🚀' },
    { label: 'DataCamp Certs', value: 5, icon: '📜' },
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative" ref={ref}>
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="flex items-center gap-4 mb-12">
            <span className="text-primary font-mono">02.</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              About Me
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
          </div>

          {/* Profile and code editor layout */}
          <div className="grid lg:grid-cols-[auto_1fr] gap-8 items-start mb-12">
            {/* Profile avatar */}
            <motion.div
              className="flex justify-center lg:justify-start"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ProfileAvatar />
            </motion.div>

            {/* Code editor visual */}
            <motion.div
              className="relative rounded-lg overflow-hidden glass"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Editor header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-neon-green" />
                </div>
                <span className="ml-4 font-mono text-sm text-muted-foreground">
                  farooq.config.js
                </span>
              </div>

              {/* Code content */}
              <div className="p-6 overflow-x-auto">
                <SyntaxHighlighter code={displayedCode} />
                {displayedCode.length < codeContent.length && (
                  <span className="inline-block w-2 h-5 bg-primary animate-pulse ml-1" />
                )}
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-secondary/10 to-transparent" />
            </motion.div>
          </div>

          {/* Animated stats cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <AnimatedCounter
                  value={stat.value}
                  label={stat.label}
                  icon={stat.icon}
                  suffix={stat.suffix}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
