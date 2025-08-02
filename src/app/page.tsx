import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import AdvancedHeroSection from '@/components/sections/advanced-hero-section'
import EnhancedServicesSection from '@/components/sections/enhanced-services-section'
import InteractivePortfolioSection from '@/components/sections/interactive-portfolio-section'
import EnhancedAboutSection from '@/components/sections/enhanced-about-section'
import EnhancedTestimonialsSection from '@/components/sections/enhanced-testimonials-section'
import SimpleContactSection from '@/components/sections/simple-contact-section'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section id="home">
        <AdvancedHeroSection />
      </section>
      
      <section id="services">
        <EnhancedServicesSection />
      </section>
      
      <section id="portfolio">
        <InteractivePortfolioSection />
      </section>
      
      <section id="about">
        <EnhancedAboutSection />
      </section>
      
      <section id="testimonials">
        <EnhancedTestimonialsSection />
      </section>
      
      <section id="contact">
        <SimpleContactSection />
      </section>
      
      <Footer />
    </main>
  )
}
