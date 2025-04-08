
import React from 'react';
import { Building, BookOpen, Heart, Award, Network } from 'lucide-react';

const PartnerLogo: React.FC<{ icon: React.ElementType; name: string }> = ({ icon: Icon, name }) => {
  return (
    <div className="flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
      <Icon className="h-5 w-5 text-ablelyf-blue-500" />
      <span className="text-sm font-medium text-gray-700">{name}</span>
    </div>
  );
};

const TrustedBySection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-lg font-medium text-gray-600 mb-8">Trusted by leading organizations</h2>
        <div className="flex flex-wrap justify-center items-center gap-6">
          <PartnerLogo icon={Building} name="Mercy Hospital" />
          <PartnerLogo icon={BookOpen} name="National Education Alliance" />
          <PartnerLogo icon={Heart} name="Care Network" />
          <PartnerLogo icon={Award} name="Therapy Excellence" />
          <PartnerLogo icon={Network} name="Inclusive Workplaces" />
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
