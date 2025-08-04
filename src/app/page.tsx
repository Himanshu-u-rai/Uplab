import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import AdvancedHeroSection from '@/components/sections/advanced-hero-section'
import EnhancedServicesSection from '@/components/sections/enhanced-services-section'
import InteractivePortfolioSection from '@/components/sections/interactive-portfolio-section'
import EnhancedAboutSection from '@/components/sections/enhanced-about-section'
import BlogFeatured from '@/components/sections/blog-featured'
import EnhancedTestimonialsSection from '@/components/sections/enhanced-testimonials-section'
import FAQSection from '@/components/sections/faq-section'
import SimpleContactSection from '@/components/sections/simple-contact-section'
import { getFeaturedPosts } from '@/lib/blog'

export default function Home() {
  const featuredPosts = getFeaturedPosts()
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
      
      {/* 5. AUTHORITY: Establish expertise and thought leadership */}
      <section id="blog" className="relative bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 py-12 sm:py-16 md:py-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <BlogFeatured posts={featuredPosts} />
        </div>
      </section>
      
      {/* 6. CONNECTION: Personal story and company values */}
      <section id="about" className="relative">
        <EnhancedAboutSection />
      </section>
      
      {/* 7. OBJECTIONS: Address concerns before final ask */}
      <section id="faq" className="relative">
        <FAQSection />
      </section>
      
      {/* 8. ACTION: Strong call-to-action when trust is built */}
      <section id="contact" className="relative">
        <SimpleContactSection />
      </section>
      
      <Footer />
    </main>
  )
}
