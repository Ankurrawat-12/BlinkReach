import React from 'react'
import { Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer: React.FC = () => {
  return (
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
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect Us</h4>
            <div className="flex space-x-4">
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
  )
}

export default Footer