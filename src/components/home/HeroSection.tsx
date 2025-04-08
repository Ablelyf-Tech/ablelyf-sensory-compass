
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-ablelyf-blue-900">
              Transforming care for neurodiverse individuals
            </h1>
            <p className="text-lg md:text-xl text-ablelyf-blue-700 max-w-xl">
              AbleLyf helps therapists, teachers, and caregivers support neurodiverse individuals through AI-driven progress tracking and personalized care plans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="bg-ablelyf-blue-600 hover:bg-ablelyf-blue-700 text-white">
                <Link to="/register">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="#features">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-ablelyf-blue-500/20 to-ablelyf-green-500/20 mix-blend-multiply"></div>
              <img 
                src="https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Therapist working with child" 
                className="w-full object-cover h-[400px]"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-ablelyf-green-500 rounded-full flex items-center justify-center text-white">
              <Brain size={36} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
