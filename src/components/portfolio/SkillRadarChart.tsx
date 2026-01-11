import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SkillCategory {
  name: string;
  value: number;
  color: string;
}

const skillCategories: SkillCategory[] = [
  { name: 'Flutter', value: 88, color: 'hsl(var(--primary))' },
  { name: 'Backend', value: 78, color: 'hsl(var(--secondary))' },
  { name: 'AI/ML', value: 72, color: 'hsl(var(--accent))' },
  { name: 'DevOps', value: 65, color: 'hsl(180, 100%, 50%)' },
  { name: 'Databases', value: 80, color: 'hsl(140, 100%, 50%)' },
  { name: 'React', value: 55, color: 'hsl(45, 100%, 50%)' },
];

const SkillRadarChart = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const centerX = 150;
  const centerY = 150;
  const maxRadius = 120;
  const levels = 5;

  const getPointOnCircle = (angle: number, radius: number) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: centerX + radius * Math.cos(rad),
      y: centerY + radius * Math.sin(rad),
    };
  };

  const angleStep = 360 / skillCategories.length;

  // Generate polygon path for skill values
  const skillPath = skillCategories.map((skill, index) => {
    const angle = index * angleStep;
    const radius = (skill.value / 100) * maxRadius;
    const point = getPointOnCircle(angle, radius);
    return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
  }).join(' ') + ' Z';

  return (
    <div ref={ref} className="relative w-full max-w-xs mx-auto">
      <svg viewBox="0 0 300 300" className="w-full h-auto">
        <defs>
          <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary) / 0.3)" />
            <stop offset="100%" stopColor="hsl(var(--primary) / 0.05)" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background circles/levels */}
        {Array.from({ length: levels }).map((_, i) => {
          const radius = ((i + 1) / levels) * maxRadius;
          return (
            <circle
              key={i}
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="1"
              opacity={0.3}
            />
          );
        })}

        {/* Axis lines */}
        {skillCategories.map((_, index) => {
          const angle = index * angleStep;
          const endPoint = getPointOnCircle(angle, maxRadius);
          return (
            <line
              key={index}
              x1={centerX}
              y1={centerY}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="hsl(var(--border))"
              strokeWidth="1"
              opacity={0.3}
            />
          );
        })}

        {/* Skill polygon */}
        <motion.path
          d={skillPath}
          fill="url(#radarGradient)"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          filter="url(#glow)"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ transformOrigin: `${centerX}px ${centerY}px` }}
        />

        {/* Data points */}
        {skillCategories.map((skill, index) => {
          const angle = index * angleStep;
          const radius = (skill.value / 100) * maxRadius;
          const point = getPointOnCircle(angle, radius);
          
          return (
            <motion.circle
              key={skill.name}
              cx={point.x}
              cy={point.y}
              r="5"
              fill={skill.color}
              filter="url(#glow)"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
            />
          );
        })}

        {/* Labels */}
        {skillCategories.map((skill, index) => {
          const angle = index * angleStep;
          const labelRadius = maxRadius + 25;
          const point = getPointOnCircle(angle, labelRadius);
          
          return (
            <motion.g
              key={skill.name}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
            >
              <text
                x={point.x}
                y={point.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-foreground font-mono text-xs"
              >
                {skill.name}
              </text>
              <text
                x={point.x}
                y={point.y + 14}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-primary font-mono text-[10px]"
              >
                {skill.value}%
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
};

export default SkillRadarChart;
