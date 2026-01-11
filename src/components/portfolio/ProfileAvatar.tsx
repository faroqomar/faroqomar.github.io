import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const ProfileAvatar = () => {
  return (
    <div className="relative">
      {/* Outer glow ring */}
      <motion.div
        className="absolute -inset-4 rounded-full opacity-60"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))',
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      
      {/* Main container */}
      <motion.div
        className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-primary/50
                   bg-gradient-to-br from-card to-background"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        {/* Scanlines effect on hover */}
        <motion.div
          className="absolute inset-0 scanlines opacity-20"
          whileHover={{ opacity: 0.4 }}
        />
        
        {/* Placeholder icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <User className="w-16 h-16 md:w-20 md:h-20 text-primary/50" />
        </div>
        
        {/* Glitch effect overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </motion.div>
      
      {/* Status indicator */}
      <motion.div
        className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-neon-green border-2 border-background"
        animate={{
          scale: [1, 1.2, 1],
          boxShadow: [
            '0 0 10px hsl(140, 100%, 50%)',
            '0 0 20px hsl(140, 100%, 50%)',
            '0 0 10px hsl(140, 100%, 50%)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />
    </div>
  );
};

export default ProfileAvatar;
