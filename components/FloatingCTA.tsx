import React from 'react'
import { ChevronUp } from 'lucide-react'

interface FloatingCTAProps {
  scrollToSection: (sectionId: string) => void
}

const FloatingCTA: React.FC<FloatingCTAProps> = ({ scrollToSection }) => {
  return (
    <button
      onClick={() => scrollToSection('hero')}
      className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 z-50"
    >
      <ChevronUp />
    </button>
  )
}

export default FloatingCTA