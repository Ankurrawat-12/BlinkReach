import React, { useEffect, useState } from 'react'
import { animateValue } from '@/utils/animations'

interface StatsProps {
  isVisible: boolean
}

const Stats: React.FC<StatsProps> = ({ isVisible }) => {
  const [animatedStats, setAnimatedStats] = useState({
    clients: 0,
    emailsSent: 0,
    openRate: 0,
    roi: 0
  })

  useEffect(() => {
    if (isVisible) {
      animateValue(0, 50, 2000, (value) => setAnimatedStats(prev => ({ ...prev, clients: value })))
      animateValue(0, 100000, 2000, (value) => setAnimatedStats(prev => ({ ...prev, emailsSent: value })))
      animateValue(0, 35, 2000, (value) => setAnimatedStats(prev => ({ ...prev, openRate: value })))
      animateValue(0, 400, 2000, (value) => setAnimatedStats(prev => ({ ...prev, roi: value })))
    }
  }, [isVisible])

  return (
    <section id="stats" className={`bg-gray-900 text-white py-24 md:py-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
  )
}

export default Stats