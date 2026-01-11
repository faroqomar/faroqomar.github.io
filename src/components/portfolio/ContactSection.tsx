import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Github, Linkedin, Mail, Send, ExternalLink } from 'lucide-react';
const socials = [{
  name: 'GitHub',
  icon: Github,
  href: 'https://github.com/faroqomar',
  color: 'primary'
}, {
  name: 'LinkedIn',
  icon: Linkedin,
  href: 'https://www.linkedin.com/in/faroq0mar/',
  color: 'secondary'
}, {
  name: 'Email',
  icon: Mail,
  href: 'mailto:faroqomar97@gmail.com',
  color: 'accent'
}];
const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormState({
        name: '',
        email: '',
        message: ''
      });
      alert('Message sent! (This is a demo)');
    }, 1500);
  };
  return <section id="contact" className="py-20 md:py-32 relative" ref={ref}>
      <div className="container max-w-4xl mx-auto px-4">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-primary font-mono">05.</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Get In Touch
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
        </div>

        {/* Neon sign heading */}
        <motion.div className="text-center mb-12" initial={{
        opacity: 0,
        y: 20
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.6
      }}>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-secondary neon-flicker neon-text-pink">
            Let's Build Something
          </h3>
          <p className="font-mono text-muted-foreground mt-4 max-w-xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact form */}
          <motion.form className="space-y-6" initial={{
          opacity: 0,
          x: -20
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          duration: 0.6,
          delay: 0.2
        }} onSubmit={handleSubmit}>
            <div>
              <label className="block font-mono text-sm text-muted-foreground mb-2">
                Name
              </label>
              <input type="text" value={formState.name} onChange={e => setFormState({
              ...formState,
              name: e.target.value
            })} className="w-full px-4 py-3 bg-input border border-border rounded-sm font-mono text-foreground
                         focus:outline-none focus:border-primary focus:neon-border-cyan transition-all duration-300" placeholder="Your name" required />
            </div>
            
            <div>
              <label className="block font-mono text-sm text-muted-foreground mb-2">
                Email
              </label>
              <input type="email" value={formState.email} onChange={e => setFormState({
              ...formState,
              email: e.target.value
            })} className="w-full px-4 py-3 bg-input border border-border rounded-sm font-mono text-foreground
                         focus:outline-none focus:border-primary focus:neon-border-cyan transition-all duration-300" placeholder="your@email.com" required />
            </div>
            
            <div>
              <label className="block font-mono text-sm text-muted-foreground mb-2">
                Message
              </label>
              <textarea value={formState.message} onChange={e => setFormState({
              ...formState,
              message: e.target.value
            })} rows={5} className="w-full px-4 py-3 bg-input border border-border rounded-sm font-mono text-foreground
                         focus:outline-none focus:border-primary focus:neon-border-cyan transition-all duration-300 resize-none" placeholder="Your message..." required />
            </div>

            <motion.button type="submit" disabled={isSubmitting} className="w-full px-6 py-3 bg-primary text-primary-foreground font-mono font-semibold rounded-sm
                       border border-primary hover:bg-transparent hover:text-primary
                       transition-all duration-300 neon-border-cyan flex items-center justify-center gap-2
                       disabled:opacity-50 disabled:cursor-not-allowed" whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }}>
              {isSubmitting ? <span className="animate-pulse">Sending...</span> : <>
                  Send Message
                  <Send className="w-4 h-4" />
                </>}
            </motion.button>
          </motion.form>

          {/* Social links and info */}
          <motion.div className="space-y-8" initial={{
          opacity: 0,
          x: 20
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          duration: 0.6,
          delay: 0.4
        }}>
            <div className="glass p-6 rounded-lg">
              <h4 className="font-display text-lg font-bold text-foreground mb-4">
                Connect With Me
              </h4>
              <div className="space-y-4">
                {socials.map(social => <motion.a key={social.name} href={social.href} className={`flex items-center gap-4 p-4 rounded-sm border border-${social.color}/30
                               hover:border-${social.color} hover:bg-${social.color}/10 
                               transition-all duration-300 group`} whileHover={{
                x: 5
              }}>
                    <social.icon className="" />
                    <span className="font-mono text-foreground">{social.name}</span>
                    <ExternalLink className={`w-4 h-4 text-${social.color} ml-auto opacity-0 
                                            group-hover:opacity-100 transition-opacity duration-300`} />
                  </motion.a>)}
              </div>
            </div>

            {/* Additional info */}
            <div className="glass p-6 rounded-lg">
              <h4 className="font-display text-lg font-bold text-foreground mb-4">
                Location
              </h4>
              <p className="font-mono text-muted-foreground">
                Based in <span className="text-primary">Istanbul, Turkey</span>
              </p>
              <p className="font-mono text-sm text-muted-foreground mt-2">
                Open to remote opportunities worldwide
              </p>
              
              {/* Languages */}
              <div className="mt-4 pt-4 border-t border-border">
                <h5 className="font-mono text-xs text-muted-foreground mb-2">Languages</h5>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary font-mono text-xs rounded-sm">Arabic (Native)</span>
                  <span className="px-2 py-1 bg-secondary/10 text-secondary font-mono text-xs rounded-sm">English (B2)</span>
                  <span className="px-2 py-1 bg-accent/10 font-mono text-xs rounded-sm text-primary">Turkish (B1)</span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-3 px-4 py-3 bg-neon-green/10 border border-neon-green/30 rounded-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-green"></span>
              </span>
              <span className="font-mono text-sm text-neon-green">
                Open to internships / freelance / part-time
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default ContactSection;