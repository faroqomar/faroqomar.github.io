import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { ChevronDown, Terminal, Folder, File, Code, Mail } from 'lucide-react';

interface TerminalLine {
  type: 'input' | 'output' | 'ascii' | 'info';
  content: string;
  delay?: number;
}

const asciiArt = `
███████╗ █████╗ ██████╗  ██████╗  ██████╗  ██████╗ 
██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔═══██╗██╔═══██╗
█████╗  ███████║██████╔╝██║   ██║██║   ██║██║   ██║
██╔══╝  ██╔══██║██╔══██╗██║   ██║██║   ██║██║   ██║
██║     ██║  ██║██║  ██║╚██████╔╝╚██████╔╝╚██████╔╝
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝  ╚═════╝ 
`;

const terminalSequence: TerminalLine[] = [
  { type: 'input', content: 'whoami', delay: 500 },
  { type: 'ascii', content: asciiArt, delay: 100 },
  { type: 'info', content: 'Software Engineer | AI Enthusiast', delay: 50 },
  { type: 'input', content: 'cat status.txt', delay: 800 },
  { type: 'output', content: '> I build real products end-to-end—Flutter frontends, Supabase/Postgres backends, and the architecture to scale.', delay: 50 },
  { type: 'input', content: 'ls -la', delay: 600 },
];

const navCommands = [
  { label: 'about/', icon: Folder, href: '#about', color: 'text-chart-4' },
  { label: 'skills.json', icon: File, href: '#skills', color: 'text-chart-1' },
  { label: 'projects/', icon: Folder, href: '#projects', color: 'text-chart-4' },
  { label: 'contact.sh', icon: File, href: '#contact', color: 'text-chart-2' },
];

const TerminalHero = () => {
  const [lines, setLines] = useState<{ type: string; content: string; visible: boolean }[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [showNav, setShowNav] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(interval);
  }, []);

  // Terminal sequence animation
  useEffect(() => {
    if (currentLineIndex >= terminalSequence.length) {
      setTimeout(() => setShowNav(true), 400);
      return;
    }

    const currentLine = terminalSequence[currentLineIndex];
    const delay = currentLine.delay || 0;

    const timer = setTimeout(() => {
      if (currentLine.type === 'input') {
        // Type out the command character by character
        let charIndex = 0;
        const typeInterval = setInterval(() => {
          if (charIndex <= currentLine.content.length) {
            setTypingText(currentLine.content.slice(0, charIndex));
            charIndex++;
          } else {
            clearInterval(typeInterval);
            // Add the completed line
            setLines(prev => [...prev, { type: 'input', content: currentLine.content, visible: true }]);
            setTypingText('');
            setCurrentLineIndex(prev => prev + 1);
          }
        }, 60);
      } else {
        // Instant display for output
        setLines(prev => [...prev, { type: currentLine.type, content: currentLine.content, visible: true }]);
        setCurrentLineIndex(prev => prev + 1);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [currentLineIndex]);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, typingText]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      {/* Terminal window */}
      <div className="glass rounded-lg border border-primary/30 overflow-hidden shadow-2xl shadow-primary/10">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-card/80 border-b border-border/50">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive/80" />
            <div className="w-3 h-3 rounded-full bg-chart-4/80" />
            <div className="w-3 h-3 rounded-full bg-chart-2/80" />
          </div>
          <div className="flex-1 flex items-center justify-center gap-2 text-muted-foreground font-mono text-sm">
            <Terminal className="w-4 h-4" />
            <span>farooq@engineer — bash</span>
          </div>
        </div>

        {/* Terminal content */}
        <div
          ref={terminalRef}
          className="p-3 md:p-4 font-mono text-xs md:text-sm bg-background/50"
        >

          {/* Rendered lines */}
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="mb-1"
            >
              {line.type === 'input' && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-primary">farooq@dev</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-secondary">~</span>
                  <span className="text-muted-foreground">$</span>
                  <span className="text-foreground ml-2">{line.content}</span>
                </div>
              )}
              {line.type === 'ascii' && (
                <pre className="text-primary text-[0.35rem] sm:text-[0.45rem] md:text-[0.55rem] leading-none my-2 whitespace-pre">
                  {line.content}
                </pre>
              )}
              {line.type === 'info' && (
                <div className="flex flex-wrap items-center gap-2 my-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/20 border border-primary/50 rounded text-primary text-xs md:text-sm font-mono">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Software Engineer
                  </span>
                  <span className="text-muted-foreground">|</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary/20 border border-secondary/50 rounded text-secondary text-xs md:text-sm font-mono">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    AI Enthusiast
                  </span>
                </div>
              )}
              {line.type === 'output' && (
                <div className="text-muted-foreground pl-4">{line.content}</div>
              )}
            </motion.div>
          ))}

          {/* Currently typing */}
          {typingText !== '' || currentLineIndex < terminalSequence.length ? (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-primary">farooq@dev</span>
              <span className="text-muted-foreground">:</span>
              <span className="text-secondary">~</span>
              <span className="text-muted-foreground">$</span>
              <span className="text-foreground ml-2">{typingText}</span>
              <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} text-primary transition-opacity`}>▋</span>
            </div>
          ) : null}

          {/* Navigation items appear after sequence */}
          <AnimatePresence>
            {showNav && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-3"
              >
                {/* ls output */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 text-xs">
                  {navCommands.map((item, index) => (
                    <motion.button
                      key={item.label}
                      onClick={() => handleNavClick(item.href)}
                      className={`flex items-center gap-2 ${item.color} hover:text-foreground transition-colors group text-left`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="group-hover:underline">{item.label}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Action prompt */}
                <motion.div
                  className="flex items-center gap-2 flex-wrap"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-primary">farooq@dev</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-secondary">~</span>
                  <span className="text-muted-foreground">$</span>
                  <span className="text-chart-2 ml-2">./explore.sh</span>
                  <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} text-primary transition-opacity`}>▋</span>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-3 mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <a
                    href="#projects"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground 
                               font-mono text-sm font-semibold rounded-sm border border-primary hover:bg-transparent 
                               hover:text-primary transition-all duration-300 neon-border-cyan group"
                  >
                    <Code className="w-3 h-3 group-hover:rotate-12 transition-transform" />
                    View Projects
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-transparent text-secondary 
                               font-mono text-sm font-semibold rounded-sm border border-secondary hover:bg-secondary 
                               hover:text-secondary-foreground transition-all duration-300 neon-border-pink group"
                  >
                    <Mail className="w-3 h-3 group-hover:scale-110 transition-transform" />
                    Contact Me
                  </a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Terminal Content */}
      <div className="relative z-20 w-full px-4">
        <TerminalHero />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 3 }, y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } }}
      >
        <ChevronDown className="w-8 h-8 text-primary animate-pulse" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
