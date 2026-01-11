import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
}

const GlitchText = ({ children, className = '', as: Component = 'span' }: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false);

  const handleHover = useCallback(() => {
    if (!isGlitching) {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 500);
    }
  }, [isGlitching]);

  return (
    <motion.span
      className={`relative inline-block ${className}`}
      onMouseEnter={handleHover}
    >
      {/* Main text */}
      <Component className="relative z-10">{children}</Component>
      
      {/* Glitch layers */}
      {isGlitching && (
        <>
          <motion.span
            className="absolute inset-0 text-secondary opacity-80"
            initial={{ x: 0, opacity: 0 }}
            animate={{
              x: [-2, 2, -1, 1, 0],
              opacity: [0, 0.8, 0.8, 0.8, 0],
            }}
            transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.6, 1] }}
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}
            aria-hidden
          >
            {children}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-primary opacity-80"
            initial={{ x: 0, opacity: 0 }}
            animate={{
              x: [2, -2, 1, -1, 0],
              opacity: [0, 0.8, 0.8, 0.8, 0],
            }}
            transition={{ duration: 0.5, times: [0, 0.2, 0.4, 0.6, 1] }}
            style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)' }}
            aria-hidden
          >
            {children}
          </motion.span>
        </>
      )}
    </motion.span>
  );
};

export default GlitchText;
