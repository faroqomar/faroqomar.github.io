import { motion } from 'framer-motion';
import { Heart, Code } from 'lucide-react';

import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const socials = [
    { icon: Github, href: 'https://github.com/faroqomar', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/faroq0mar/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://x.com/eros_6_', label: 'Twitter' },
  ];

  return (
    <footer className="py-8 border-t border-border">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            className="font-mono text-sm text-muted-foreground flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Built with <Heart className="w-4 h-4 text-secondary inline" /> and{' '}
            <Code className="w-4 h-4 text-primary inline" /> by{' '}
            <span className="text-primary">Farooq Omar</span>
          </motion.p>

          {/* Social links */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>

          <motion.p
            className="font-mono text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            © {new Date().getFullYear()} Farooq Omar
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
