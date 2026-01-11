import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalTextProps {
  text: string;
  onComplete?: () => void;
  className?: string;
  prefix?: string;
}

const TerminalText = ({ text, onComplete, className = '', prefix = '>' }: TerminalTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayText('');
    setIsComplete(false);
    setShowCursor(true);

    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsComplete(true);
        setTimeout(() => {
          setShowCursor(false);
          onComplete?.();
        }, 500);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [text, onComplete]);

  return (
    <span className={`font-mono ${className}`}>
      <span className="text-secondary">{prefix} </span>
      <span className="text-foreground">{displayText}</span>
      <AnimatePresence>
        {showCursor && (
          <motion.span
            className="text-primary"
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            exit={{ opacity: 0 }}
          >
            █
          </motion.span>
        )}
      </AnimatePresence>
      {isComplete && (
        <motion.span
          className="text-neon-green ml-2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          ✓
        </motion.span>
      )}
    </span>
  );
};

export default TerminalText;
