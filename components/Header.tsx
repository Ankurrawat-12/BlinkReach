import React from 'react'

interface HeaderProps {
  scrollToSection: (sectionId: string) => void
}

const Header: React.FC<HeaderProps> = ({ scrollToSection }) => {
  return (
    <header className="bg-white shadow-md fixed w-full z-50 transition-all duration-300">
      <nav className="w-screen px-4 sm:px-6 py-2 md:py-4">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <div className="text-xl sm:text-2xl font-bold text-gray-800 py-2 md:py-0 md:mb-0 transition-all duration-300 hover:text-gray-600 w-full text-center md:text-left md:w-auto truncate">TheEmailMafia</div>
          <div className="hidden md:flex space-x-4 lg:space-x-8">
            <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="hover:text-gray-600 transition-colors text-xs lg:text-sm uppercase tracking-wide px-3 py-1 font-medium">Services</a>
            <a href="#strategies" onClick={(e) => { e.preventDefault(); scrollToSection('strategies'); }} className="hover:text-gray-600 transition-colors text-xs lg:text-sm uppercase tracking-wide px-3 py-1 font-medium">Strategies</a>
            <a href="#faq" onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }} className="hover:text-gray-600 transition-colors text-xs lg:text-sm uppercase tracking-wide px-3 py-1 font-medium">FAQ</a>
            <a href="#newsletter" onClick={(e) => { e.preventDefault(); scrollToSection('newsletter'); }} className="hover:text-gray-600 transition-colors text-xs lg:text-sm uppercase tracking-wide px-3 py-1 font-medium">Newsletter</a>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header