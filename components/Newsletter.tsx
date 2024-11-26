import React, { useState } from 'react'
import { Send } from 'lucide-react'
import { isValidEmail } from '@/utils/validation'

const Newsletter: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState(false)
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscriptionError, setSubscriptionError] = useState('')

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
        console.error('Newsletter subscription error:', error)
        setSubscriptionError('An error occurred. Please try again later.')
      } finally {
        setIsSubscribing(false)
      }
    } else {
      setSubscriptionError('Please enter a valid email address')
    }
  }

  return (
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
  )
}

export default Newsletter