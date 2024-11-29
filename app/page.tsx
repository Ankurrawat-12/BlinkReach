'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Stats from '@/components/Stats'
import Strategies from '@/components/Strategies'
import FAQ from '@/components/FAQ'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState({
    services: false,
    stats: false,
    strategies: false,
    faq: false,
    caseStudies: false,
  })
  const [showFloatingCTA, setShowFloatingCTA] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['services', 'stats', 'strategies', 'faq']
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

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
      <Header scrollToSection={scrollToSection} />
      <main>
        <Hero />
        <Services isVisible={isVisible.services} />
        <Stats isVisible={isVisible.stats} />
        <Strategies isVisible={isVisible.strategies} />
        <FAQ isVisible={isVisible.faq} />

        <Newsletter />
      </main>
      <Footer />
      {showFloatingCTA && <FloatingCTA scrollToSection={scrollToSection} />}
    </div>
  )
}