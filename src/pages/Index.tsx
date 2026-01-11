import Navigation from '@/components/portfolio/Navigation';
import HeroSection from '@/components/portfolio/HeroSection';
import FeaturedProject from '@/components/portfolio/FeaturedProject';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import AboutSection from '@/components/portfolio/AboutSection';
import SkillsSection from '@/components/portfolio/SkillsSection';
import CurrentlySection from '@/components/portfolio/CurrentlySection';
import ContactSection from '@/components/portfolio/ContactSection';
import Footer from '@/components/portfolio/Footer';
import ScrollProgress from '@/components/portfolio/ScrollProgress';
import ScrollReactive3DBackground from '@/components/effects/ScrollReactive3DBackground';

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent relative">
      {/* Global scroll-reactive 3D background */}
      <ScrollReactive3DBackground />
      {/* Scroll progress indicator */}
      <ScrollProgress />
      
      {/* Scanlines overlay */}
      <div className="fixed inset-0 pointer-events-none scanlines z-50 opacity-10" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative z-[1]">
        <HeroSection />
        <FeaturedProject />
        <ProjectsSection />
        <AboutSection />
        <SkillsSection />
        <CurrentlySection />
        <ContactSection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
