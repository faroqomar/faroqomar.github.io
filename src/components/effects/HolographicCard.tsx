import { useRef, useState, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'pink' | 'purple';
}

const HolographicCard = ({ children, className = '', glowColor = 'cyan' }: HolographicCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const glowColors = {
    cyan: 'from-primary/20 via-transparent to-primary/10',
    pink: 'from-secondary/20 via-transparent to-secondary/10',
    purple: 'from-accent/20 via-transparent to-accent/10',
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateXValue = (mouseY / (rect.height / 2)) * -10;
    const rotateYValue = (mouseX / (rect.width / 2)) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);

    // Calculate glare position
    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Holographic gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-radial ${glowColors[glowColor]} opacity-0 
                   group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10`}
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, 
                       hsl(var(--${glowColor === 'cyan' ? 'primary' : glowColor === 'pink' ? 'secondary' : 'accent'}) / 0.3) 0%, 
                       transparent 50%)`,
        }}
      />

      {/* Prismatic effect */}
      <div
        className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-30 transition-opacity"
        style={{
          background: `linear-gradient(
            ${45 + rotateY * 2}deg,
            transparent 0%,
            hsl(180 100% 50% / 0.1) 25%,
            hsl(320 100% 60% / 0.1) 50%,
            hsl(280 100% 65% / 0.1) 75%,
            transparent 100%
          )`,
        }}
      />

      {/* Scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-20"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)',
        }}
      />

      {/* Content */}
      <div style={{ transform: 'translateZ(20px)' }}>{children}</div>
    </motion.div>
  );
};

export default HolographicCard;
