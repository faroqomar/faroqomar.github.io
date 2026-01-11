import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface AnimatedCounterProps {
  value: number | string;
  label: string;
  icon: string;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter = ({ value, label, icon, suffix = '', duration = 2 }: AnimatedCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);
  
  const isNumeric = typeof value === 'number';
  const numericValue = isNumeric ? value : 0;

  useEffect(() => {
    if (isInView && isNumeric) {
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        setDisplayValue(Math.floor(progress * numericValue));
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, isNumeric, numericValue, duration]);

  return (
    <motion.div
      ref={ref}
      className="p-6 glass rounded-lg border border-primary/20 hover:border-primary/50 
                 transition-all duration-300 group cursor-default relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ scale: 1.02 }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 
                   group-hover:opacity-100 transition-opacity duration-500"
      />
      
      {/* Icon */}
      <motion.span 
        className="text-3xl mb-4 block relative z-10"
        animate={isInView ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {icon}
      </motion.span>
      
      {/* Value */}
      <div className="relative z-10">
        {isNumeric ? (
          <span className="font-display text-4xl font-bold text-primary 
                          group-hover:neon-text-cyan transition-all duration-300">
            {displayValue}
            {suffix}
          </span>
        ) : (
          <span className="font-display text-4xl font-bold text-primary 
                          group-hover:neon-text-cyan transition-all duration-300">
            {value}
          </span>
        )}
      </div>
      
      {/* Label */}
      <p className="font-mono text-sm text-muted-foreground mt-2 relative z-10">
        {label}
      </p>
      
      {/* Trend indicator */}
      <motion.div
        className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ y: 10 }}
        animate={{ y: 0 }}
      >
        <span className="text-neon-green text-xs font-mono">↑</span>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedCounter;
