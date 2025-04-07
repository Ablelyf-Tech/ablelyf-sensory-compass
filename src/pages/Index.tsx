
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Brain, Users, Activity, BarChart, School, Building } from 'lucide-react';

const Index: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-ablelyf-blue-50 to-white">
      {/* Header/Navigation */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-ablelyf-blue-500 w-10 h-10 flex items-center justify-center text-white">
              <Brain size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-ablelyf-blue-900">AbleLyf</h1>
              <p className="text-xs text-ablelyf-blue-700">Sensory Care</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {currentUser ? (
              <Button asChild>
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link to="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Sign up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-ablelyf-blue-900 mb-6">
            Digital Therapy Platform for Neurodiverse Individuals
          </h1>
          <p className="text-xl text-ablelyf-blue-700 mb-10 max-w-3xl mx-auto">
            AbleLyf helps therapists, teachers, caregivers, and HR professionals
            support neurodiverse individuals through AI-driven progress tracking and
            adaptive care plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-ablelyf-blue-600 hover:bg-ablelyf-blue-700">
              <Link to="/register">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl font-bold text-center mb-16">Tailored for Different Roles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-ablelyf-neutral-200 transition-all hover:shadow-md">
            <div className="rounded-full bg-ablelyf-blue-100 w-12 h-12 flex items-center justify-center text-ablelyf-blue-600 mb-4">
              <Activity size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">For Therapists</h3>
            <p className="text-ablelyf-neutral-700 mb-4">
              Track patient progress, manage intervention plans, and receive real-time alerts
              about behavioral and sensory changes.
            </p>
            <ul className="space-y-2 text-sm text-ablelyf-neutral-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-ablelyf-blue-500"></div>
                <span>Patient progress dashboards</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-ablelyf-blue-500"></div>
                <span>AI-driven intervention suggestions</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-ablelyf-blue-500"></div>
                <span>Therapy plan management</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-ablelyf-neutral-200 transition-all hover:shadow-md">
            <div className="rounded-full bg-ablelyf-green-100 w-12 h-12 flex items-center justify-center text-ablelyf-green-600 mb-4">
              <School size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">For Teachers</h3>
            <p className="text-ablelyf-neutral-700 mb-4">
              Monitor classroom dynamics, track IEP milestones, and coordinate with therapists
              for consistent support.
            </p>
            <ul className="space-y-2 text-sm text-ablelyf-neutral-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-ablelyf-green-500"></div>
                <span>Classroom heatmaps</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-ablelyf-green-500"></div>
                <span>Student alerts and notifications</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-ablelyf-green-500"></div>
                <span>IEP milestone tracking</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-ablelyf-neutral-200 transition-all hover:shadow-md">
            <div className="rounded-full bg-amber-100 w-12 h-12 flex items-center justify-center text-amber-600 mb-4">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">For Caregivers</h3>
            <p className="text-ablelyf-neutral-700 mb-4">
              Log daily activities, monitor health and cognitive trends, and respond quickly
              to alerts and notifications.
            </p>
            <ul className="space-y-2 text-sm text-ablelyf-neutral-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                <span>Daily activity logging</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                <span>Health and cognitive trends</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                <span>Emergency alert system</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-ablelyf-neutral-200 transition-all hover:shadow-md">
            <div className="rounded-full bg-ablelyf-blue-100 w-12 h-12 flex items-center justify-center text-ablelyf-blue-600 mb-4">
              <Building size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">For HR Professionals</h3>
            <p className="text-ablelyf-neutral-700 mb-4">
              Manage workplace inclusivity, track accommodation effectiveness, and schedule
              training workshops.
            </p>
            <ul className="space-y-2 text-sm text-ablelyf-neutral-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-ablelyf-blue-500"></div>
                <span>Inclusivity metrics</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-ablelyf-blue-500"></div>
                <span>Accommodation tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-ablelyf-blue-500"></div>
                <span>Workshop scheduling</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-ablelyf-neutral-200 transition-all hover:shadow-md">
            <div className="rounded-full bg-ablelyf-green-100 w-12 h-12 flex items-center justify-center text-ablelyf-green-600 mb-4">
              <BarChart size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Data Analytics</h3>
            <p className="text-ablelyf-neutral-700 mb-4">
              Gain insights from comprehensive data visualization and AI-powered trend analysis.
            </p>
            <ul className="space-y-2 text-sm text-ablelyf-neutral-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-ablelyf-green-500"></div>
                <span>Cognitive trend graphs</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-ablelyf-green-500"></div>
                <span>Behavioral pattern recognition</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-ablelyf-green-500"></div>
                <span>Progress comparison tools</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-ablelyf-neutral-200 transition-all hover:shadow-md">
            <div className="rounded-full bg-amber-100 w-12 h-12 flex items-center justify-center text-amber-600 mb-4">
              <Brain size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Learning Modules</h3>
            <p className="text-ablelyf-neutral-700 mb-4">
              Access gesture-based learning modules and interactive tools designed specifically
              for neurodiverse individuals.
            </p>
            <ul className="space-y-2 text-sm text-ablelyf-neutral-600">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                <span>Gesture-based ABA learning</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                <span>Sensory integration activities</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                <span>Adaptive skill building exercises</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-ablelyf-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Care for Neurodiverse Individuals?</h2>
          <p className="text-ablelyf-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals using AbleLyf to provide data-driven, personalized support.
          </p>
          <Button size="lg" asChild className="bg-white text-ablelyf-blue-600 hover:bg-ablelyf-blue-50">
            <Link to="/register">Get Started For Free</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-ablelyf-neutral-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="rounded-full bg-ablelyf-blue-500 w-8 h-8 flex items-center justify-center text-white">
                <Brain size={16} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-ablelyf-blue-900">AbleLyf</h1>
                <p className="text-xs text-ablelyf-blue-700">Sensory Care</p>
              </div>
            </div>
            <div className="text-sm text-ablelyf-neutral-600">
              &copy; {new Date().getFullYear()} AbleLyf Sensory Care. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
