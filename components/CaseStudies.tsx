import React from 'react'
import { ArrowRight } from 'lucide-react'

interface CaseStudiesProps {
  isVisible: boolean
}

const CaseStudies: React.FC<CaseStudiesProps> = ({ isVisible }) => {
  const caseStudies = [
    { title: 'TechGrowth Expansion', description: 'Helped TechGrowth increase their customer base by 150% through targeted email campaigns.', link: 'https://www.techgrowth.com' },
    { title: 'EcoStart Launch', description: 'Supported EcoStart\'s product launch, achieving a 75% email open rate and 40% click-through rate.', link: 'https://www.ecostart.com' },
    { title: 'FashionForward Reengagement', description: 'Reengaged FashionForward\'s dormant customers, resulting in a 200% increase in repeat purchases.', link: 'https://www.fashionforward.com' },
  ];

  return (
    <section id="caseStudies" className={`bg-gray-900 text-white py-24 md:py-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 md:mb-24 font-serif">Case Studies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <h3 className="text-2xl font-semibold mb-4">{study.title}</h3>
              <p className="text-gray-300 mb-6">{study.description}</p>
              <a href={study.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 inline-flex items-center transition-colors duration-300">
                Read More <ArrowRight className="ml-2" size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CaseStudies