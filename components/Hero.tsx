import React, { useState } from 'react'
import Image from 'next/image'
import { Mail } from 'lucide-react'
import { isValidEmail } from '@/utils/validation'

const Hero: React.FC = () => {
  const [showAuditInput, setShowAuditInput] = useState(false)
  const [auditEmail, setAuditEmail] = useState('')
  const [isAuditRequested, setIsAuditRequested] = useState(false)
  const [isRequestingAudit, setIsRequestingAudit] = useState(false)
  const [auditRequestError, setAuditRequestError] = useState('')

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
        console.error('Audit request error:', error)
        setAuditRequestError('An error occurred. Please try again later.')
      } finally {
        setIsRequestingAudit(false)
      }
    } else {
      setAuditRequestError('Please enter a valid email address')
    }
  }

  return (
    <section id="hero" className="min-h-screen py-16 md:py-24 flex items-center bg-gray-900 text-white relative overflow-hidden">
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
            <p className="text-lg mt-8 max-w-2xl mx-auto md:mx-0 text-gray-400">Boost conversions with TheEmailMafia&apos;s expert strategies!</p>
          </div>
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] mt-8 md:mt-0 order-first md:order-last absolute inset-0 overflow-hidden">
            <Image
              src="/hero.jpg?height=500&width=600"
              alt="Business professionals in discussion"
              layout="fill"
              objectFit="cover"
              className="opacity-20"
              sizes="100vw"
              draggable="false"
              style={{
                maskImage: 'radial-gradient(circle at center, black 50%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 100%)',
                background: 'linear-gradient(to right, rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.4))',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero