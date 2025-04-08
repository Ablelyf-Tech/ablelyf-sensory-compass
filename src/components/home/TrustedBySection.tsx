
import React from 'react';

const TrustedBySection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-lg font-medium text-gray-600 mb-8">Trusted by leading organizations</h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
          <div className="h-8 w-32 bg-gray-300 rounded flex items-center justify-center">Partner 1</div>
          <div className="h-8 w-32 bg-gray-300 rounded flex items-center justify-center">Partner 2</div>
          <div className="h-8 w-32 bg-gray-300 rounded flex items-center justify-center">Partner 3</div>
          <div className="h-8 w-32 bg-gray-300 rounded flex items-center justify-center">Partner 4</div>
          <div className="h-8 w-32 bg-gray-300 rounded flex items-center justify-center">Partner 5</div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
