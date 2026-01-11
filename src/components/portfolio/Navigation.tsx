import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Currently', href: '#currently' },
  { label: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10, 10, 20, 0)', 'rgba(10, 10, 20, 0.95)']
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.slice(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      setActiveSection(currentSection || '');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 hidden md:block backdrop-blur-sm"
        style={{ backgroundColor }}
      >
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-display text-xl font-bold text-primary hover:neon-text-cyan transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative">
                FO
                <motion.span
                  className="absolute -inset-1 bg-primary/20 rounded blur-sm"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </span>
            </motion.a>

            {/* Nav links */}
            <div className="flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={`relative px-4 py-2 font-mono text-sm transition-all duration-300 rounded-sm overflow-hidden
                            ${activeSection === item.href.slice(1) 
                              ? 'text-primary' 
                              : 'text-muted-foreground hover:text-primary'}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      className="absolute inset-0 bg-primary/10 border border-primary/30 rounded-sm"
                      layoutId="activeSection"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    <span className="text-primary mr-1">0{index + 1}.</span>
                    {item.label}
                  </span>
                </motion.a>
              ))}
              
              {/* Resume button */}
              <motion.a
                href="#"
                className="ml-4 px-4 py-2 border border-primary text-primary font-mono text-sm
                         hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-sm
                         relative overflow-hidden group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Resume</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile menu button */}
        <motion.button
          className="fixed top-4 right-4 z-50 p-3 glass rounded-sm border border-primary/30"
          onClick={() => setIsOpen(!isOpen)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </motion.div>
        </motion.button>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-40 bg-background/98 backdrop-blur-lg flex items-center justify-center"
              initial={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
              animate={{ opacity: 1, clipPath: 'circle(150% at 95% 5%)' }}
              exit={{ opacity: 0, clipPath: 'circle(0% at 95% 5%)' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <nav className="flex flex-col items-center gap-8">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href);
                    }}
                    className="font-mono text-xl text-foreground hover:text-primary transition-colors group"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <span className="text-primary mr-2">0{index + 1}.</span>
                    {item.label}
                  </motion.a>
                ))}
                
                <motion.a
                  href="#"
                  className="mt-8 px-8 py-3 border border-primary text-primary font-mono
                           hover:bg-primary hover:text-primary-foreground transition-all duration-300 rounded-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Resume
                </motion.a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navigation;
