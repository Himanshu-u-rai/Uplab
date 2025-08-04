import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import AdvancedHeroSection from '@/components/sections/advanced-hero-section'
import EnhancedServicesSection from '@/components/sections/enhanced-services-section'
import InteractivePortfolioSection from '@/components/sections/interactive-portfolio-section'
import EnhancedAboutSection from '@/components/sections/enhanced-about-section'
import EnhancedTestimonialsSection from '@/components/sections/enhanced-testimonials-section'
import FAQSection from '@/components/sections/faq-section'
import SimpleContactSection from '@/components/sections/simple-contact-section'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section id="home" className="relative">
        <AdvancedHeroSection />
      </section>
      
      <section id="services" className="relative">
        <EnhancedServicesSection />
      </section>
      
      <section id="portfolio" className="relative">
        <InteractivePortfolioSection />
      </section>
      
      <section id="about" className="relative">
        <EnhancedAboutSection />
      </section>
      
      <section id="testimonials" className="relative">
        <EnhancedTestimonialsSection />
      </section>
      
      <section id="faq" className="relative">
        <FAQSection />
      </section>
      
      <section id="contact" className="relative">
        <SimpleContactSection />
      </section>
      
      <Footer />
    </main>
  )
}
