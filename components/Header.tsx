import React from 'react'

interface HeaderProps {
  scrollToSection: (sectionId: string) => void
}

const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
  return (
    <header className="bg-white shadow-md fixed w-full z-50 transition-all duration-300">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <div className="text-2xl font-bold text-gray-800 mb-4 md:mb-0 transition-all duration-300 hover:text-gray-600">TheEmailMafia</div>
          <div className="hidden md:flex space-x-4 lg:space-x-8">
            <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="hover:text-gray-600 transition-colors text-xs lg:text-sm uppercase tracking-wide px-3 py-1">Services</a>
            <a href="#strategies" onClick={(e) => { e.preventDefault(); scrollToSection('strategies'); }} className="hover:text-gray-600 transition-colors text-xs lg:text-sm uppercase tracking-wide px-3 py-1">Strategies</a>
            <a href="#caseStudies" onClick={(e) => { e.preventDefault(); scrollToSection('caseStudies'); }} className="hover:text-gray-600 transition-colors text-xs lg:text-sm uppercase tracking-wide px-3 py-1">Case Studies</a>
            <a href="#newsletter" onClick={(e) => { e.preventDefault(); scrollToSection('newsletter'); }} className="hover:text-gray-600 transition-colors text-xs lg:text-sm uppercase tracking-wide px-3 py-1">Newsletter</a>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header