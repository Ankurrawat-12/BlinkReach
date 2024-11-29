import React from 'react'
import Image from 'next/image'
import { Lightbulb, Target, Smartphone, Brain } from 'lucide-react'

interface StrategiesProps {
  isVisible: boolean
}

const Strategies: React.FC<StrategiesProps> = ({ isVisible }) => {
  const strategies = [
    { icon: Lightbulb, text: 'Craft irresistible subject lines that boost open rates' },
    { icon: Smartphone, text: 'Design mobile-responsive emails for on-the-go engagement' },
    { icon: Target, text: 'Implement advanced segmentation for laser-focused targeting' },
    { icon: Brain, text: 'Leverage AI-powered personalization to connect with your audience' },
  ]

  return (
    <section id="strategies" className={`py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-gray-100 to-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16 lg:mb-24 font-serif">Email Marketing Mastery</h2>
        <div className="flex flex-col lg:flex-row items-center justify-between lg:space-x-12">
          <div className={`w-full lg:w-1/2 mb-8 lg:mb-0 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative w-full aspect-[4/3] max-w-[500px] mx-auto lg:mx-0 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent mix-blend-overlay z-10" />
              <Image
                src="/strategies.png"
                alt="Email Marketing Strategies"
                layout="fill"
                objectFit="contain"
                className="transition-all duration-500"
                draggable="false"
                priority
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:pl-12">
            <ul className="space-y-6">
              {strategies.map((strategy, index) => (
                <li 
                  key={index} 
                  className={`flex items-start transition-all duration-500 transform ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`} 
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="mr-4 p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white flex-shrink-0">
                    <strategy.icon size={24} />
                  </div>
                  <div>
                    <p className="text-base sm:text-lg font-semibold">{strategy.text}</p>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">
                      {index === 0 && "Increase engagement with compelling headlines."}
                      {index === 1 && "Reach your audience wherever they are."}
                      {index === 2 && "Deliver relevant content to the right subscribers."}
                      {index === 3 && "Create unique experiences for each recipient."}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Strategies