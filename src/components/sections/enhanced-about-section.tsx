'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Users, Award, Target, Lightbulb, Heart, Code, Palette, Rocket, Calendar, MapPin, Coffee, Github, Linkedin, Twitter } from 'lucide-react'

const teamMembers = [
  {
    id: 1,
    name: 'Alex Chen',
    role: 'Founder & CEO',
    bio: 'Visionary leader with 10+ years in digital innovation. Passionate about creating transformative digital experiences.',
    image: '/api/placeholder/300/300',
    skills: ['Strategic Planning', 'Product Vision', 'Team Leadership'],
    social: { linkedin: '#', twitter: '#', github: '#' },
    gradient: 'from-purple-500 to-pink-500',
    experience: '10+ years',
    projects: '200+',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Lead Developer',
    bio: 'Full-stack wizard who brings ideas to life with clean, scalable code. Loves solving complex technical challenges.',
    image: '/api/placeholder/300/300',
    skills: ['React/Next.js', 'Node.js', 'Cloud Architecture'],
    social: { linkedin: '#', twitter: '#', github: '#' },
    gradient: 'from-blue-500 to-cyan-500',
    experience: '8+ years',
    projects: '150+',
  },
  {
    id: 3,
    name: 'Marcus Williams',
    role: 'Creative Director',
    bio: 'Design thinking expert who crafts beautiful, user-centric experiences. Every pixel has a purpose.',
    image: '/api/placeholder/300/300',
    skills: ['UI/UX Design', 'Brand Strategy', 'Design Systems'],
    social: { linkedin: '#', twitter: '#', github: '#' },
    gradient: 'from-green-500 to-emerald-500',
    experience: '9+ years',
    projects: '180+',
  },
  {
    id: 4,
    name: 'Emily Davis',
    role: 'Marketing Strategist',
    bio: 'Growth hacker who turns data into results. Specializes in digital campaigns that drive real business impact.',
    image: '/api/placeholder/300/300',
    skills: ['Digital Marketing', 'Analytics', 'Growth Strategy'],
    social: { linkedin: '#', twitter: '#', github: '#' },
    gradient: 'from-orange-500 to-red-500',
    experience: '7+ years',
    projects: '120+',
  },
]

const timeline = [
  {
    year: '2022',
    title: 'The Beginning',
    description: 'Started our digital agency with a passion for creating exceptional web experiences for businesses.',
    icon: Rocket,
    stats: 'First projects, 2 team members',
  },
  {
    year: '2023',
    title: 'Growth & Learning',
    description: 'Expanded our skills in mobile development and built our first mobile applications.',
    icon: Code,
    stats: '5+ websites, mobile apps',
  },
  {
    year: '2024',
    title: 'Innovation Focus',
    description: 'Focused on modern technologies and user-centric design approaches for better client results.',
    icon: Lightbulb,
    stats: '10+ websites, 5+ mobile apps',
  },
  {
    year: '2025',
    title: 'Future Forward',
    description: 'Continuing to deliver exceptional digital solutions with cutting-edge technologies and design.',
    icon: Heart,
    stats: 'Growing portfolio, satisfied clients',
  },
]

const values = [
  {
    icon: Heart,
    title: 'Passion First',
    description: 'We pour our hearts into every project, treating your success as our own.',
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Great things happen when brilliant minds work together towards a common goal.',
    color: 'from-blue-500 to-purple-500',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We stay ahead of the curve, embracing new technologies and creative solutions.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Target,
    title: 'Results Driven',
    description: 'Every decision we make is focused on delivering measurable, impactful results.',
    color: 'from-green-500 to-cyan-500',
  },
]

export default function EnhancedAboutSection() {
  const [activeTeamMember, setActiveTeamMember] = useState<number | null>(null)
  const [selectedTimelineItem, setSelectedTimelineItem] = useState(0)
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const timelineInView = useInView(timelineRef, { once: true, amount: 0.2 })

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  })

  const timelineProgress = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-white via-gray-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements - Mobile Optimized */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-purple-500/5 rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute top-1/2 right-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-cyan-500/5 rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute bottom-0 left-1/2 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-pink-500/5 rounded-full blur-2xl sm:blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-purple-100 to-cyan-100 text-purple-700 text-xs sm:text-sm font-semibold mb-4 sm:mb-6"
          >
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">About Uplab</span>
            <span className="xs:hidden">About</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 sm:mb-8 leading-tight"
          >
            <span className="block">We Are</span>
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
              Digital Craftsmen
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-2 sm:px-4"
          >
            Passionate creators, innovative thinkers, and dedicated partners in your digital journey. 
            We don't just build websites and apps – we craft digital experiences that inspire and convert.
          </motion.p>
        </motion.div>

        {/* Company Values - Mobile Carousel & Desktop Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16 sm:mb-20 md:mb-24 lg:mb-32"
        >
          {/* Mobile Carousel */}
          <div className="block sm:hidden">
            <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide snap-x snap-mandatory px-4">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="group flex-shrink-0 w-[calc(100vw-4rem)] max-w-sm snap-center"
                >
                  <div className="relative p-4 bg-white/80 backdrop-blur-xl rounded-xl border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-56">
                    <div className={`w-12 h-12 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <value.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm line-clamp-4">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Mobile Scroll Indicator */}
            <div className="flex justify-center mt-6 space-x-2 px-4">
              {values.map((_, index) => (
                <div key={index} className="w-2 h-2 rounded-full bg-gray-300"></div>
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="group"
              >
                <div className="relative p-4 sm:p-6 md:p-8 bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl border border-gray-200 hover:border-purple-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 min-h-[200px] sm:min-h-[220px] md:min-h-[240px]">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br ${value.color} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base line-clamp-3">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Section - Mobile Optimized */}
        <motion.div
          ref={timelineRef}
          initial={{ opacity: 0, y: 50 }}
          animate={timelineInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h3 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 sm:mb-6">
              Our <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Journey</span>
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl sm:max-w-3xl mx-auto px-2 sm:px-4">
              From humble beginnings to industry leadership – here's how we've grown together.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line - Mobile Optimized */}
            <div className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gray-200">
              <motion.div
                className="w-full bg-gradient-to-b from-purple-500 to-pink-500 origin-top"
                style={{ scaleY: useTransform(scrollYProgress, [0, 0.8], [0, 1]) }}
              />
            </div>

            {/* Timeline Items - Mobile Optimized */}
            <div className="space-y-8 sm:space-y-10 md:space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={timelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  onClick={() => setSelectedTimelineItem(index)}
                  className="relative flex items-start gap-8 cursor-pointer group"
                >
                  {/* Timeline Marker */}
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        selectedTimelineItem === index
                          ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg'
                          : 'bg-white border-2 border-gray-200 text-gray-600 group-hover:border-purple-300'
                      }`}
                    >
                      <item.icon className="w-8 h-8" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 p-6 rounded-2xl transition-all duration-300 ${
                    selectedTimelineItem === index
                      ? 'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200'
                      : 'bg-white/80 border border-gray-200 group-hover:border-purple-200'
                  }`}>
                    <div className="flex items-center gap-4 mb-3">
                      <span className={`text-lg font-bold ${
                        selectedTimelineItem === index ? 'text-purple-600' : 'text-gray-900'
                      }`}>
                        {item.year}
                      </span>
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{item.stats}</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Fun Stats - Mobile Carousel & Desktop Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-6 sm:p-8 md:p-12 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Fun Facts About Uplab</h3>
            
            {/* Mobile Carousel */}
            <div className="block md:hidden">
              <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide snap-x snap-mandatory px-4">
                <div className="flex items-center justify-center gap-3 flex-shrink-0 w-[calc(100vw-6rem)] max-w-xs snap-center">
                  <Coffee className="w-8 h-8 flex-shrink-0" />
                  <div>
                    <div className="text-2xl font-bold">10,847</div>
                    <div className="text-sm opacity-90">Cups of Coffee</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3 flex-shrink-0 w-[calc(100vw-6rem)] max-w-xs snap-center">
                  <Code className="w-8 h-8 flex-shrink-0" />
                  <div>
                    <div className="text-2xl font-bold">2.3M+</div>
                    <div className="text-sm opacity-90">Lines of Code</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3 flex-shrink-0 w-[calc(100vw-6rem)] max-w-xs snap-center">
                  <Heart className="w-8 h-8 flex-shrink-0" />
                  <div>
                    <div className="text-2xl font-bold">∞</div>
                    <div className="text-sm opacity-90">Passion & Love</div>
                  </div>
                </div>
              </div>
              {/* Mobile Scroll Indicator */}
              <div className="flex justify-center mt-6 space-x-2 px-4">
                <div className="w-2 h-2 rounded-full bg-white/50"></div>
                <div className="w-2 h-2 rounded-full bg-white/50"></div>
                <div className="w-2 h-2 rounded-full bg-white/50"></div>
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-3 gap-8">
              <div className="flex items-center justify-center gap-3">
                <Coffee className="w-8 h-8" />
                <div>
                  <div className="text-2xl font-bold">10,847</div>
                  <div className="text-sm opacity-90">Cups of Coffee</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Code className="w-8 h-8" />
                <div>
                  <div className="text-2xl font-bold">2.3M+</div>
                  <div className="text-sm opacity-90">Lines of Code</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Heart className="w-8 h-8" />
                <div>
                  <div className="text-2xl font-bold">∞</div>
                  <div className="text-sm opacity-90">Passion & Love</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
