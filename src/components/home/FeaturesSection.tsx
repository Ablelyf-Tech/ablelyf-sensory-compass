
import React from 'react';
import { Activity, School, Users, Brain, Building, Headphones } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-ablelyf-blue-900 mb-4">Comprehensive care platform</h2>
          <p className="text-lg text-ablelyf-blue-700">
            Designed to support every aspect of care for neurodiverse individuals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Activity} 
            iconColor="bg-ablelyf-blue-100 text-ablelyf-blue-600" 
            title="AI-Powered Progress Tracking" 
            description="Real-time monitoring and analytics to track cognitive and behavioral progress."
          />
          
          <FeatureCard 
            icon={School} 
            iconColor="bg-ablelyf-green-100 text-ablelyf-green-600" 
            title="Integrated Learning Modules" 
            description="Customizable activities designed for different sensory needs and learning styles."
          />
          
          <FeatureCard 
            icon={Users} 
            iconColor="bg-amber-100 text-amber-600" 
            title="Collaborative Care System" 
            description="Connect therapists, teachers, and caregivers for coordinated support."
          />
          
          <FeatureCard 
            icon={Brain} 
            iconColor="bg-ablelyf-blue-100 text-ablelyf-blue-600" 
            title="Personalized Therapy Plans" 
            description="Tailored interventions based on individual needs and preferences."
          />
          
          <FeatureCard 
            icon={Building} 
            iconColor="bg-ablelyf-green-100 text-ablelyf-green-600" 
            title="Workplace Accommodation Tools" 
            description="Resources for creating inclusive work environments for neurodiverse individuals."
          />
          
          <FeatureCard 
            icon={Headphones} 
            iconColor="bg-amber-100 text-amber-600" 
            title="Virtual Support Sessions" 
            description="Secure video consultations with data capture and analysis capabilities."
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ElementType;
  iconColor: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, iconColor, title, description }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-4 ${iconColor}`}>
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default FeaturesSection;
