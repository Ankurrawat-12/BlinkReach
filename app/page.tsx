'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronRight, Mail, Send, Star, Facebook, Twitter, Instagram, Linkedin, ChevronUp, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState({
    services: false,
    stats: false,
    testimonials: false,
    strategies: false,
    caseStudies: false,
  })
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [showAuditInput, setShowAuditInput] = useState(false)
  const [auditEmail, setAuditEmail] = useState('')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState(false)
  const [isAuditRequested, setIsAuditRequested] = useState(false)
  const [animatedStats, setAnimatedStats] = useState({
    clients: 0,
    emailsSent: 0,
    openRate: 0,
    roi: 0
  })
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscriptionError, setSubscriptionError] = useState('')
  const [isRequestingAudit, setIsRequestingAudit] = useState(false)
  const [auditRequestError, setAuditRequestError] = useState('')

  const heroRef = useRef(null)
  const statsRef = useRef(null)

  const testimonials = [
    { name: 'Sarah Johnson', position: 'CMO, TechGrowth', comment: 'TheEmailMafia revolutionized our email campaigns. We saw a 250% increase in engagement within the first month!' },
    { name: 'Alex Chen', position: 'Founder, EcoStart', comment: 'Their strategies helped us connect with our audience on a deeper level. Our conversion rates have never been better.' },
    { name: 'Emily Rodriguez', position: 'Digital Marketing Lead, FashionForward', comment: 'The personalized approach and data-driven insights from TheEmailMafia transformed our email marketing ROI.' },
    { name: 'Michael Thompson', position: 'CEO, InnovateTech', comment: 'TheEmailMafia\'s expertise has been instrumental in scaling our outreach efforts. Our subscriber base has grown exponentially!' },
    { name: 'Sophia Lee', position: 'Marketing Director, GreenEats', comment: 'The personalized campaigns crafted by TheEmailMafia have significantly boosted our customer retention rates.' },
    { name: 'David Patel', position: 'Founder, FinTech Solutions', comment: 'Thanks to TheEmailMafia, our email open rates have doubled, and click-through rates have never been higher.' },
  ];

  const caseStudies = [
    { title: 'TechGrowth Expansion', description: 'Helped TechGrowth increase their customer base by 150% through targeted email campaigns.' },
    { title: 'EcoStart Launch', description: 'Supported EcoStart\'s product launch, achieving a 75% email open rate and 40% click-through rate.' },
    { title: 'FashionForward Reengagement', description: 'Reengaged FashionForward\'s dormant customers, resulting in a 200% increase in repeat purchases.' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['services', 'stats', 'testimonials', 'strategies', 'caseStudies']
      sections.forEach(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          setIsVisible(prev => ({ ...prev, [section]: rect.top < window.innerHeight && rect.bottom >= 0 }))
        }
      })

      setShowFloatingCTA(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isVisible.stats) {
      animateStats()
    }
  }, [isVisible.stats])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleAuditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isValidEmail(auditEmail)) {
      setIsRequestingAudit(true)
      setAuditRequestError('')

      try {
        const response = await fetch('/api/request-audit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: auditEmail }),
        })

        if (response.ok) {
          setAuditEmail('')
          setIsAuditRequested(true)
        } else {
          const data = await response.json()
          setAuditRequestError(data.error || 'Audit request failed. Please try again.')
        }
      } catch (error) {
        setAuditRequestError('An error occurred. Please try again later.')
      } finally {
        setIsRequestingAudit(false)
      }
    } else {
      setAuditRequestError('Please enter a valid email address')
    }
  }

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isValidEmail(newsletterEmail)) {
      setIsSubscribing(true)
      setSubscriptionError('')

      try {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: newsletterEmail }),
        })

        if (response.ok) {
          setNewsletterEmail('')
          setIsNewsletterSubscribed(true)
        } else {
          const data = await response.json()
          setSubscriptionError(data.error || 'Subscription failed. Please try again.')
        }
      } catch (error) {
        setSubscriptionError('An error occurred. Please try again later.')
      } finally {
        setIsSubscribing(false)
      }
    } else {
      setSubscriptionError('Please enter a valid email address')
    }
  }

  const isValidEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return re.test(String(email).toLowerCase())
  }

  const animateStats = () => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0

    const interval = setInterval(() => {
      setAnimatedStats(prev => ({
        clients: Math.min(Math.round((currentStep / steps) * 500), 500),
        emailsSent: Math.min(Math.round((currentStep / steps) * 10000000), 10000000),
        openRate: Math.min(Math.round((currentStep / steps) * 35), 35),
        roi: Math.min(Math.round((currentStep / steps) * 400), 400)
      }))

      currentStep++

      if (currentStep > steps) {
        clearInterval(interval)
      }
    }, stepDuration)
  }

  const serviceDescriptions = {
    'Email Strategy': "Craft compelling email strategies tailored to your audience. We analyze your market, set clear goals, and design campaigns that resonate with your subscribers, driving engagement and conversions.",
    'Campaign Optimization': "Continuously refine your email campaigns for peak performance. Our data-driven approach identifies key metrics, A/B tests crucial elements, and implements best practices to maximize your email marketing ROI.",
    'List Management': "Maintain a healthy, engaged subscriber base. We implement advanced segmentation, regular list cleaning, and growth strategies to ensure your messages reach the right people at the right time.",
    'Automation & Integration': "Streamline your email marketing with powerful automation workflows. We integrate your email platform with your CRM and other tools, creating personalized customer journeys that nurture leads and boost sales."
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <header className="bg-white shadow-md fixed w-full z-50 transition-all duration-300">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <div className="text-2xl font-bold text-gray-800 font-serif mb-4 md:mb-0 transition-all duration-300 hover:text-gray-600">TheEmailMafia</div>
            <div className="hidden md:flex space-x-4 lg:space-x-8">
              <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="hover:text-gray-600 transition-colors text-xs lg:text-sm uppercase tracking-wide px-3 py-1">Services</a>
              <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection('testimonials'); }} className="hover:text-gray-600 transition-colors text-xs lg:text-sm uppercase tracking-wide px-3 py-1">Testimonials</a>
              <a href="#strategies" onClick={(e) => { e.preventDefault(); scrollToSection('strategies'); }} className="hover:text-gray-600 transition-colors text-xs lg:text-sm uppercase tracking-wide px-3 py-1">Strategies</a>
              <a href="#caseStudies" onClick={(e) => { e.preventDefault(); scrollToSection('caseStudies'); }} className="hover:text-gray-600 transition-colors text-xs lg:text-sm uppercase tracking-wide px-3 py-1">Case Studies</a>
              <a href="#newsletter" onClick={(e) => { e.preventDefault(); scrollToSection('newsletter'); }} className="hover:text-gray-600 transition-colors text-xs lg:text-sm uppercase tracking-wide px-3 py-1">Newsletter</a>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-20">
        <section id="hero" ref={heroRef} className="min-h-screen py-16 md:py-24 flex items-center bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <Image
              src="/hero-image.jpg"
              alt="Email marketing network visualization"
              layout="fill"
              objectFit="cover"
              className="object-center"
              priority
            />
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="space-y-8 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight">Dominate the Inbox Game</h1>
                <p className="text-xl md:text-2xl text-gray-300">Unlock Your Business Potential with Elite Email Marketing</p>
                {!isAuditRequested ? (
                  !showAuditInput ? (
                    <button
                      onClick={() => setShowAuditInput(true)}
                      className="bg-white text-gray-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 inline-flex items-center"
                    >
                      Free Audit <Mail className="ml-2" />
                    </button>
                  ) : (
                    <form onSubmit={handleAuditSubmit} className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={auditEmail}
                        onChange={(e) => setAuditEmail(e.target.value)}
                        className="px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white text-gray-800 w-full sm:w-auto"
                        required
                        disabled={isRequestingAudit}
                      />
                      <button
                        type="submit"
                        className="bg-white text-gray-900 px-6 py-2 rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                        disabled={isRequestingAudit}
                      >
                        {isRequestingAudit ? 'Requesting...' : 'Let\'s Go'}
                      </button>
                    </form>
                  )
                ) : (
                  <p className="text-xl font-semibold">We will contact you within 24 hours.</p>
                )}
                {auditRequestError && (
                  <p className="mt-4 text-red-500">{auditRequestError}</p>
                )}
                <p className="text-lg mt-8 max-w-2xl mx-auto md:mx-0 text-gray-300">Boost conversions with TheEmailMafia's expert strategies!</p>
              </div>
              <div className="relative h-[300px] md:h-[400px] lg:h-[500px] mt-8 md:mt-0 order-first md:order-last">
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="Business professionals in discussion"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg shadow-2xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="services" className={`py-24 md:py-32 transition-all duration-1000 ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Our Services</h2>
            <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">Elevate your email marketing with our comprehensive suite of services. From strategy to execution, we've got you covered.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {Object.entries(serviceDescriptions).map(([service, description], index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Star className="text-gray-600" size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-center">{service}</h3>
                  <p className="text-gray-600 text-center">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="stats" ref={statsRef} className={`bg-gray-900 text-white py-24 md:py-32 transition-all duration-1000 ${isVisible.stats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Impact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              <div className="text-center">
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">{animatedStats.clients}+</p>
                <p className="text-base sm:text-lg md:text-xl">Happy Clients</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">{animatedStats.emailsSent.toLocaleString()}+</p>
                <p className="text-base sm:text-lg md:text-xl">Emails Sent</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">{animatedStats.openRate}%</p>
                <p className="text-base sm:text-lg md:text-xl">Average Open Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">{animatedStats.roi}%</p>
                <p className="text-base sm:text-lg md:text-xl">Average ROI</p>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className={`bg-gray-100 py-24 md:py-32 transition-all duration-1000 ${isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 md:mb-24 font-serif">What Our Clients Say</h2>
            <div className="relative">
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg max-w-4xl mx-auto h-full flex flex-col justify-between">
                        <p className="text-lg md:text-2xl mb-6 italic text-center">{testimonial.comment}</p>
                        <div className="flex items-center justify-center md:justify-start">
                          <Image src={`https://i.pravatar.cc/60?img=${index + 1}`} alt={testimonial.name} width={60} height={60} className="rounded-full mr-4" />
                          <div className="text-center md:text-left">
                            <h3 className="font-semibold">{testimonial.name}</h3>
                            <p className="text-gray-600 text-sm">{testimonial.position}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-300"
                onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              >
                <ChevronRight className="transform rotate-180 text-white" />
              </button>
              <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-300"
                onClick={() => setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              >
                <ChevronRight className="text-white" />
              </button>
            </div>
          </div>
        </section>

        <section id="strategies" className={`py-24 md:py-32 transition-all duration-1000 ${isVisible.strategies ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 md:mb-24 font-serif">Email Marketing Mastery</h2>
            <div className="flex flex-col md:flex-row items-center justify-between md:space-x-12">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <Image src="/placeholder.svg?height=400&width=600" alt="Email Marketing Strategies" width={600} height={400} className="rounded-lg shadow-lg" />
              </div>
              <div className="md:w-1/2 md:pl-12">
                <ul className="space-y-6">
                  {[
                    'Craft irresistible subject lines that boost open rates',
                    'Design mobile-responsive emails for on-the-go engagement',
                    'Implement advanced segmentation for laser-focused targeting',
                    'Leverage AI-powered personalization to connect with your audience',
                  ].map((strategy, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight className="text-black mt-1 mr-4 flex-shrink-0" />
                      <span className="text-lg">{strategy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="caseStudies" className={`bg-gray-900 text-white py-24 md:py-32 transition-all duration-1000 ${isVisible.caseStudies ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 md:mb-24 font-serif">Case Studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <h3 className="text-2xl font-semibold mb-4">{study.title}</h3>
                  <p className="text-gray-300 mb-6">{study.description}</p>
                  {index === 0 && (
                    <a href="https://www.techgrowth.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 inline-flex items-center transition-colors duration-300">
                      Read More <ArrowRight className="ml-2" size={16} />
                    </a>
                  )}
                  {index === 1 && (
                    <a href="https://www.ecostart.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 inline-flex items-center transition-colors duration-300">
                      Read More <ArrowRight className="ml-2" size={16} />
                    </a>
                  )}
                  {index === 2 && (
                    <a href="https://www.fashionforward.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 inline-flex items-center transition-colors duration-300">
                      Read More <ArrowRight className="ml-2" size={16} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="newsletter" className="bg-gray-100 text-gray-800 py-24 md:py-32">
          <div className="container mx-auto px-6 text-center">
            {!isNewsletterSubscribed ? (
              <>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Subscribe to Our Weekly Newsletter</h2>
                <p className="mb-10 max-w-2xl mx-auto">Get the latest email marketing tips and tricks delivered straight to your inbox.</p>
                <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row items-center">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full sm:w-auto mb-4 sm:mb-0 px-4 py-2 rounded-full sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-800"
                    required
                    disabled={isSubscribing}
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-black px-6 py-2 rounded-full sm:rounded-l-none hover:bg-gray-800 transition-colors flex items-center justify-center text-white disabled:opacity-50"
                    disabled={isSubscribing}
                  >
                    {isSubscribing ? 'Subscribing...' : 'Subscribe'} <Send className="ml-2" size={18} />
                  </button>
                </form>
                {subscriptionError && (
                  <p className="mt-4 text-red-500">{subscriptionError}</p>
                )}
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Newsletter Successfully Subscribed!</h2>
                <p className="text-xl">Look forward to awesome email marketing insights in your inbox!</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div className="mb-4">
              <h3 className="text-2xl font-bold mb-4">TheEmailMafia</h3>
              <p className="text-gray-400">Dominating the email marketing game since 2023</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-gray-300 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300 transition-colors"><Facebook /></a>
                <a href="#" className="hover:text-gray-300 transition-colors"><Twitter /></a>
                <a href="#" className="hover:text-gray-300 transition-colors"><Instagram /></a>
                <a href="#" className="hover:text-gray-300 transition-colors"><Linkedin /></a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} TheEmailMafia. All rights reserved.
          </div>
        </div>
      </footer>

      {showFloatingCTA && (
        <button
          onClick={() => scrollToSection('hero')}
          className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 z-50"
        >
          <ChevronUp />
        </button>
      )}
    </div>
  )
}