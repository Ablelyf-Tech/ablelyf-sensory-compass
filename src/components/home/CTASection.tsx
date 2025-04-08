
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-ablelyf-blue-600 to-ablelyf-blue-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to transform care for neurodiverse individuals?</h2>
          <p className="text-xl mb-8">
            Join thousands of professionals using AbleLyf to provide personalized, data-driven support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-ablelyf-blue-700 hover:bg-gray-100">
              <Link to="/register">Get Started For Free</Link>
            </Button>
            <Button size="lg" asChild variant="outline" className="border-white text-white hover:bg-ablelyf-blue-700">
              <Link to="#contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
