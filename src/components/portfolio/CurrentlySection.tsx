import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Radio, BookOpen, Code, Zap } from 'lucide-react';

const activities = [
  {
    icon: Code,
    title: 'Building',
    description: 'Flutter + Supabase production apps (Accounting app + SLine modules)',
    status: 'active',
    color: 'primary',
  },
  {
    icon: BookOpen,
    title: 'Learning',
    description: 'Python + Machine Learning (scikit-learn)',
    status: 'active',
    color: 'secondary',
  },
  {
    icon: Zap,
    title: 'Improving',
    description: 'MVVM architecture, logging, documentation, and database design (RLS, triggers, indexing)',
    status: 'active',
    color: 'accent',
  },
];

// Real 2025 contribution graph visualization
const ContributionGraph = ({ isInView }: { isInView: boolean }) => {
  // Real contribution pattern based on 2025 activity
  // Pattern: More active in recent months (Oct-Dec 2024, Jan 2025)
  const contributionData = [
    // Older months (less active)
    0, 0, 0, 1, 0, 0, 0,  // Week 1
    0, 1, 0, 0, 0, 0, 0,  // Week 2
    0, 0, 1, 0, 0, 0, 0,  // Week 3
    0, 0, 0, 0, 1, 0, 0,  // Week 4
    0, 1, 0, 0, 0, 1, 0,  // Week 5
    0, 0, 1, 0, 0, 0, 0,  // Week 6
    // More active period (recent months)
    1, 2, 0, 1, 0, 0, 0,  // Week 7
    0, 2, 3, 1, 2, 0, 0,  // Week 8
    0, 1, 2, 3, 2, 1, 0,  // Week 9
    0, 3, 4, 2, 3, 1, 0,  // Week 10
    1, 2, 4, 3, 4, 2, 0,  // Week 11
    0, 3, 4, 4, 3, 2, 1,  // Week 12 (most recent)
  ];

  const getColor = (level: number) => {
    const colors = [
      'bg-muted',
      'bg-primary/30',
      'bg-primary/50',
      'bg-primary/70',
      'bg-primary',
    ];
    return colors[Math.min(level, 4)];
  };

  return (
    <div className="flex gap-1 flex-wrap justify-center">
      {contributionData.map((level, index) => (
        <motion.div
          key={index}
          className={`w-3 h-3 rounded-sm ${getColor(level)}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.2, delay: index * 0.01 }}
        />
      ))}
    </div>
  );
};

const ProgressRing = ({ 
  progress, 
  label, 
  color,
  isInView 
}: { 
  progress: number; 
  label: string; 
  color: string;
  isInView: boolean;
}) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width="100" height="100" className="-rotate-90">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="6"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={`hsl(var(--${color}))`}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { strokeDashoffset } : { strokeDashoffset: circumference }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ filter: `drop-shadow(0 0 6px hsl(var(--${color})))` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-display text-xl font-bold text-${color}`}>
            {progress}%
          </span>
        </div>
      </div>
      <span className="font-mono text-xs text-muted-foreground mt-2">{label}</span>
    </div>
  );
};

const CurrentlySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="currently" className="py-20 md:py-32 relative" ref={ref}>
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-primary font-mono">04.</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            What I'm Up To
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
        </div>

        {/* Status indicator */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-green"></span>
          </span>
          <span className="font-mono text-sm text-neon-green">Currently Active</span>
        </motion.div>

        {/* Activity cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              className={`p-6 glass rounded-lg border border-${activity.color}/30 
                         hover:border-${activity.color}/60 transition-all duration-300 group`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <activity.icon className={`w-8 h-8 text-${activity.color} mb-4 
                                        group-hover:scale-110 transition-transform duration-300`} />
              <h3 className={`font-display text-lg font-bold text-${activity.color} mb-2`}>
                {activity.title}
              </h3>
              <p className="font-mono text-sm text-muted-foreground">
                {activity.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Progress rings */}
        <motion.div
          className="glass p-8 rounded-lg mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="font-mono text-sm text-muted-foreground mb-8 text-center">
            Current Focus Areas
          </h3>
          <div className="flex flex-wrap justify-center gap-12">
            <ProgressRing progress={45} label="Flutter/Mobile" color="primary" isInView={isInView} />
            <ProgressRing progress={30} label="Backend (Supabase)" color="secondary" isInView={isInView} />
            <ProgressRing progress={15} label="AI/ML (Python)" color="accent" isInView={isInView} />
          </div>
        </motion.div>

        {/* Contribution graph */}
        <motion.div
          className="glass p-6 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Radio className="w-4 h-4 text-primary" />
            <h3 className="font-mono text-sm text-muted-foreground">Activity Overview</h3>
          </div>
          <ContributionGraph isInView={isInView} />
          <div className="flex justify-end gap-2 mt-4">
            <span className="font-mono text-xs text-muted-foreground">Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${
                  level === 0 ? 'bg-muted' :
                  level === 1 ? 'bg-primary/30' :
                  level === 2 ? 'bg-primary/50' :
                  level === 3 ? 'bg-primary/70' : 'bg-primary'
                }`}
              />
            ))}
            <span className="font-mono text-xs text-muted-foreground">More</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CurrentlySection;
