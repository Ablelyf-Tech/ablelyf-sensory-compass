
import React from 'react';

interface TestimonialCardProps {
  name: string;
  role: string;
  quote: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, quote }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
      <p className="italic text-gray-700">
        {quote}
      </p>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-ablelyf-blue-900 mb-4">What our users say</h2>
          <p className="text-lg text-ablelyf-blue-700">
            Hear from professionals using AbleLyf to transform care
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard 
            name="Dr. Sarah Johnson"
            role="Occupational Therapist"
            quote="AbleLyf has revolutionized how I track and analyze patient progress. The AI insights help me make more informed therapy decisions."
          />
          
          <TestimonialCard 
            name="Michael Chen"
            role="Special Education Teacher"
            quote="The classroom tools have made it so much easier to implement accommodations and track IEP goals in real-time."
          />
          
          <TestimonialCard 
            name="Lisa Rodriguez"
            role="HR Director"
            quote="AbleLyf has helped us create a more inclusive workplace with better accommodations for our neurodiverse team members."
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
