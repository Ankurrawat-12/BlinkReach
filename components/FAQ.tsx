'use client'

import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'

interface FAQProps {
  isVisible: boolean
}

const FAQ: React.FC<FAQProps> = ({ isVisible }) => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)

  const faqs = [
    {
      question: "We guarantee a 5x ROI on our monthly fee within the first 3 months, or we will continue working with you for FREE until we hit this ROI.",
      answer: "We stand behind our services with this guarantee because we're confident in our ability to deliver results. Our track record shows consistent success in achieving and exceeding this ROI target for our clients."
    },
    {
      question: "Is it only one person that manages my account?",
      answer: "We have a dedicated, highly specialized and experienced in-house team that will be assigned on your account. This consists of our Head of Design, a Senior Email Designer, a Client Success Manager, an Email Marketing Specialist, a copywriter, and both Founders, Tarun and Huss.\n\nThat's 7 experienced team members that will be present in all communication and project management channels to service you on a daily basis."
    },
    {
      question: "Why should I hire an agency versus hiring someone in-house?",
      answer: "Hiring an agency like TheEmailMafia gives you access to an entire team of specialists for the cost of one in-house employee. You benefit from our combined expertise in design, copywriting, strategy, and optimization, plus our proven systems and processes. We also stay updated with the latest industry trends and best practices, ensuring your email marketing stays ahead of the curve."
    },
    {
      question: "I don't want to wait 30 days to see the first set of emails. How fast do you move?",
      answer: "We understand the importance of quick implementation. Our onboarding process is streamlined, and we typically begin sending your first optimized emails within the first week. We'll work at a pace that matches your business needs while ensuring quality and strategy aren't compromised."
    }
  ]

  return (
    <section id="faq" className={`py-24 md:py-32 bg-gray-900 text-white transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 md:mb-24 font-serif">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`transition-all duration-300 ${
                openQuestion === index ? 'bg-gray-800' : 'bg-gray-800/50'
              } rounded-lg overflow-hidden`}
            >
              <button
                onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                className="w-full px-6 py-4 flex justify-between items-center text-left"
              >
                <span className="text-lg font-medium pr-8">{faq.question}</span>
                {openQuestion === index ? (
                  <X className="flex-shrink-0 w-6 h-6" />
                ) : (
                  <Plus className="flex-shrink-0 w-6 h-6" />
                )}
              </button>
              <div
                className={`px-6 transition-all duration-300 ${
                  openQuestion === index ? 'max-h-[500px] py-4' : 'max-h-0'
                } overflow-hidden`}
              >
                <p className="text-gray-300 whitespace-pre-line">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ