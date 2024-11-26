import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Lightbulb, Target, Smartphone, Brain } from 'lucide-react'

interface StrategiesProps {
  isVisible: boolean
}

const Strategies: React.FC<StrategiesProps> = ({ isVisible }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const strategies = [
    { icon: Lightbulb, text: 'Craft irresistible subject lines that boost open rates' },
    { icon: Smartphone, text: 'Design mobile-responsive emails for on-the-go engagement' },
    { icon: Target, text: 'Implement advanced segmentation for laser-focused targeting' },
    { icon: Brain, text: 'Leverage AI-powered personalization to connect with your audience' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  }

  return (
    <section id="strategies" className={`py-24 md:py-32 bg-gradient-to-b from-gray-100 to-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 md:mb-24 font-serif">Email Marketing Mastery</h2>
        <div className="flex flex-col md:flex-row items-center justify-between md:space-x-12">
          <motion.div
            className="md:w-1/2 mb-8 md:mb-0 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/strategies.png?height=400&width=600"
                alt="Email Marketing Strategies"
                layout="fill"
                objectFit="cover"
                className="rounded-lg transition-all duration-300 hover:scale-105 filter brightness-90 hover:brightness-100"
                draggable="false"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/30 to-purple-500/30 mix-blend-overlay" />
            </div>
          </motion.div>
          <motion.div
            ref={ref}
            className="md:w-1/2 md:pl-12"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <ul className="space-y-6">
              {strategies.map((strategy, index) => (
                <motion.li key={index} className="flex items-start" variants={itemVariants}>
                  <div className="mr-4 p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full text-white">
                    <strategy.icon size={24} />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{strategy.text}</p>
                    <p className="text-gray-600 mt-1">
                      {index === 0 && "Increase engagement with compelling headlines."}
                      {index === 1 && "Reach your audience wherever they are."}
                      {index === 2 && "Deliver relevant content to the right subscribers."}
                      {index === 3 && "Create unique experiences for each recipient."}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Strategies