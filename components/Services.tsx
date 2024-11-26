import React from 'react'
import { Star } from 'lucide-react'

interface ServicesProps {
  isVisible: boolean
}

const Services: React.FC<ServicesProps> = ({ isVisible }) => {
  const serviceDescriptions = {
    'Email Strategy': "Craft compelling email strategies tailored to your audience. We analyze your market, set clear goals, and design campaigns that resonate with your subscribers, driving engagement and conversions.",
    'Campaign Optimization': "Continuously refine your email campaigns for peak performance. Our data-driven approach identifies key metrics, A/B tests crucial elements, and implements best practices to maximize your email marketing ROI.",
    'List Management': "Maintain a healthy, engaged subscriber base. We implement advanced segmentation, regular list cleaning, and growth strategies to ensure your messages reach the right people at the right time.",
    'Automation & Integration': "Streamline your email marketing with powerful automation workflows. We integrate your email platform with your CRM and other tools, creating personalized customer journeys that nurture leads and boost sales."
  };

  return (
    <section id="services" className={`py-24 md:py-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Our Services</h2>
        <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">Elevate your email marketing with our comprehensive suite of services. From strategy to execution, we&apos;ve got you covered.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {Object.entries(serviceDescriptions).map(([service, description], index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Star className="text-gray-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">{service}</h3>
              <p className="text-gray-600 text-center">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services