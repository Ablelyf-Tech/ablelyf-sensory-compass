
import React from 'react';

interface TimelineItemProps {
  step: number;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ 
  step, 
  title, 
  description, 
  imageSrc, 
  imageAlt, 
  reverse = false 
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center">
      <div className={`md:w-1/2 md:pr-12 mb-6 md:mb-0 text-center md:text-right ${reverse ? 'order-1 md:order-2' : ''}`}>
        {reverse ? (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <img 
              src={imageSrc} 
              alt={imageAlt} 
              className="rounded-md w-full h-48 object-cover mb-3"
            />
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-ablelyf-blue-800 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </>
        )}
      </div>
      <div className="rounded-full bg-ablelyf-blue-500 w-10 h-10 flex items-center justify-center text-white z-10 my-3 md:my-0 order-2 md:order-1">
        {step}
      </div>
      <div className={`md:w-1/2 md:pl-12 text-center md:text-left ${reverse ? 'order-3' : ''}`}>
        {reverse ? (
          <>
            <h3 className="text-xl font-bold text-ablelyf-blue-800 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </>
        ) : (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <img 
              src={imageSrc} 
              alt={imageAlt} 
              className="rounded-md w-full h-48 object-cover mb-3"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-ablelyf-blue-900 mb-4">How AbleLyf works</h2>
          <p className="text-lg text-ablelyf-blue-700">
            Our platform brings together all stakeholders to provide comprehensive care
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-ablelyf-blue-200 hidden md:block"></div>
          
          <div className="space-y-12 relative">
            <TimelineItem 
              step={1}
              title="Assessment & Profiling"
              description="Comprehensive evaluation of sensory, cognitive, and behavioral patterns"
              imageSrc="https://images.unsplash.com/photo-1565843714144-d5a3292ae82d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
              imageAlt="Assessment"
            />
            
            <TimelineItem 
              step={2}
              title="Personalized Care Plan"
              description="AI-generated recommendations tailored to individual needs"
              imageSrc="https://images.unsplash.com/photo-1516534775068-ba3e7458af70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
              imageAlt="Personalized Plan"
              reverse={true}
            />
            
            <TimelineItem 
              step={3}
              title="Integrated Implementation"
              description="Coordinated intervention across home, school, and therapy settings"
              imageSrc="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
              imageAlt="Implementation"
            />
            
            <TimelineItem 
              step={4}
              title="Continuous Monitoring"
              description="Real-time tracking and adjustments based on progress data"
              imageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
              imageAlt="Progress Tracking"
              reverse={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
