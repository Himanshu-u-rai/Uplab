import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import AdvancedHeroSection from '@/components/sections/advanced-hero-section'
import EnhancedServicesSection from '@/components/sections/enhanced-services-section'
import InteractivePortfolioSection from '@/components/sections/interactive-portfolio-section'
import EnhancedAboutSection from '@/components/sections/enhanced-about-section'
import EnhancedTestimonialsSection from '@/components/sections/enhanced-testimonials-section'
import FAQSection from '@/components/sections/faq-section'
// import removed: getFeaturedPosts from '@/lib/blog'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* 1. HOOK: Grab attention with compelling value proposition */}
      <section id="home" className="relative">
        <AdvancedHeroSection />
      </section>
      
      {/* 2. VALUE: Show what you do and how it benefits them */}
      <section id="services" className="relative">
        <EnhancedServicesSection />
      </section>
      
      {/* 3. PROOF: Demonstrate capabilities with real work */}
      <section id="portfolio" className="relative">
        <InteractivePortfolioSection />
      </section>
      
      {/* 4. TRUST: Build credibility with client testimonials */}
      <section id="testimonials" className="relative">
        <EnhancedTestimonialsSection />
      </section>
      
  {/* Blog section completely removed */}
      
      {/* 6. CONNECTION: Personal story and company values */}
      <section id="about" className="relative">
        <EnhancedAboutSection />
      </section>
      
      {/* 7. OBJECTIONS: Address concerns before final ask */}
      <section id="faq" className="relative">
        <FAQSection />
      </section>
      
      
      <Footer />
    </main>
  )
}
