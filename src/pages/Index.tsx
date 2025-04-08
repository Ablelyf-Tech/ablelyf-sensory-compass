
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';
import { Brain, Users, Activity, School, Headphones, Building } from 'lucide-react';

const Index: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
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
            
            <div className="hidden md:flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                        <Link to="#therapist-solutions" className="flex gap-2 p-3 hover:bg-muted rounded-md">
                          <Activity className="h-5 w-5 text-ablelyf-blue-500" />
                          <div>
                            <div className="font-medium">For Therapists</div>
                            <div className="text-sm text-muted-foreground">Track progress and manage interventions</div>
                          </div>
                        </Link>
                        <Link to="#teacher-solutions" className="flex gap-2 p-3 hover:bg-muted rounded-md">
                          <School className="h-5 w-5 text-ablelyf-green-500" />
                          <div>
                            <div className="font-medium">For Teachers</div>
                            <div className="text-sm text-muted-foreground">Classroom tools and IEP tracking</div>
                          </div>
                        </Link>
                        <Link to="#caregiver-solutions" className="flex gap-2 p-3 hover:bg-muted rounded-md">
                          <Headphones className="h-5 w-5 text-amber-500" />
                          <div>
                            <div className="font-medium">For Caregivers</div>
                            <div className="text-sm text-muted-foreground">Daily logs and health monitoring</div>
                          </div>
                        </Link>
                        <Link to="#hr-solutions" className="flex gap-2 p-3 hover:bg-muted rounded-md">
                          <Building className="h-5 w-5 text-ablelyf-blue-600" />
                          <div>
                            <div className="font-medium">For HR Professionals</div>
                            <div className="text-sm text-muted-foreground">Workplace inclusivity and accommodations</div>
                          </div>
                        </Link>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <Link to="#features" className={navigationMenuTriggerStyle()}>
                      Features
                    </Link>
                  </NavigationMenuItem>
                  
                  <NavigationMenuItem>
                    <Link to="#about" className={navigationMenuTriggerStyle()}>
                      About
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            
            <div className="flex items-center gap-4">
              {currentUser ? (
                <Button asChild>
                  <Link to="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button asChild variant="outline" className="hidden sm:flex">
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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

      {/* Trusted By Section */}
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

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-ablelyf-blue-900 mb-4">Comprehensive care platform</h2>
            <p className="text-lg text-ablelyf-blue-700">
              Designed to support every aspect of care for neurodiverse individuals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-full bg-ablelyf-blue-100 w-12 h-12 flex items-center justify-center text-ablelyf-blue-600 mb-4">
                <Activity size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Powered Progress Tracking</h3>
              <p className="text-gray-600">
                Real-time monitoring and analytics to track cognitive and behavioral progress.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-full bg-ablelyf-green-100 w-12 h-12 flex items-center justify-center text-ablelyf-green-600 mb-4">
                <School size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Integrated Learning Modules</h3>
              <p className="text-gray-600">
                Customizable activities designed for different sensory needs and learning styles.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-full bg-amber-100 w-12 h-12 flex items-center justify-center text-amber-600 mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Collaborative Care System</h3>
              <p className="text-gray-600">
                Connect therapists, teachers, and caregivers for coordinated support.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-full bg-ablelyf-blue-100 w-12 h-12 flex items-center justify-center text-ablelyf-blue-600 mb-4">
                <Brain size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Therapy Plans</h3>
              <p className="text-gray-600">
                Tailored interventions based on individual needs and preferences.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-full bg-ablelyf-green-100 w-12 h-12 flex items-center justify-center text-ablelyf-green-600 mb-4">
                <Building size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Workplace Accommodation Tools</h3>
              <p className="text-gray-600">
                Resources for creating inclusive work environments for neurodiverse individuals.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="rounded-full bg-amber-100 w-12 h-12 flex items-center justify-center text-amber-600 mb-4">
                <Headphones size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Virtual Support Sessions</h3>
              <p className="text-gray-600">
                Secure video consultations with data capture and analysis capabilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
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
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 text-center md:text-right">
                  <h3 className="text-xl font-bold text-ablelyf-blue-800 mb-2">Assessment & Profiling</h3>
                  <p className="text-gray-600">Comprehensive evaluation of sensory, cognitive, and behavioral patterns</p>
                </div>
                <div className="rounded-full bg-ablelyf-blue-500 w-10 h-10 flex items-center justify-center text-white z-10 my-3 md:my-0">1</div>
                <div className="md:w-1/2 md:pl-12 text-center md:text-left">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1565843714144-d5a3292ae82d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                      alt="Assessment" 
                      className="rounded-md w-full h-48 object-cover mb-3"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 text-center md:text-right order-1 md:order-2">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1516534775068-ba3e7458af70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                      alt="Personalized Plan" 
                      className="rounded-md w-full h-48 object-cover mb-3"
                    />
                  </div>
                </div>
                <div className="rounded-full bg-ablelyf-blue-500 w-10 h-10 flex items-center justify-center text-white z-10 my-3 md:my-0 order-2 md:order-1">2</div>
                <div className="md:w-1/2 md:pl-12 text-center md:text-left order-3">
                  <h3 className="text-xl font-bold text-ablelyf-blue-800 mb-2">Personalized Care Plan</h3>
                  <p className="text-gray-600">AI-generated recommendations tailored to individual needs</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 text-center md:text-right">
                  <h3 className="text-xl font-bold text-ablelyf-blue-800 mb-2">Integrated Implementation</h3>
                  <p className="text-gray-600">Coordinated intervention across home, school, and therapy settings</p>
                </div>
                <div className="rounded-full bg-ablelyf-blue-500 w-10 h-10 flex items-center justify-center text-white z-10 my-3 md:my-0">3</div>
                <div className="md:w-1/2 md:pl-12 text-center md:text-left">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                      alt="Implementation" 
                      className="rounded-md w-full h-48 object-cover mb-3"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 text-center md:text-right order-1 md:order-2">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" 
                      alt="Progress Tracking" 
                      className="rounded-md w-full h-48 object-cover mb-3"
                    />
                  </div>
                </div>
                <div className="rounded-full bg-ablelyf-blue-500 w-10 h-10 flex items-center justify-center text-white z-10 my-3 md:my-0 order-2 md:order-1">4</div>
                <div className="md:w-1/2 md:pl-12 text-center md:text-left order-3">
                  <h3 className="text-xl font-bold text-ablelyf-blue-800 mb-2">Continuous Monitoring</h3>
                  <p className="text-gray-600">Real-time tracking and adjustments based on progress data</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-ablelyf-blue-900 mb-4">What our users say</h2>
            <p className="text-lg text-ablelyf-blue-700">
              Hear from professionals using AbleLyf to transform care
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Dr. Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Occupational Therapist</p>
                </div>
              </div>
              <p className="italic text-gray-700">
                "AbleLyf has revolutionized how I track and analyze patient progress. The AI insights help me make more informed therapy decisions."
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Michael Chen</h4>
                  <p className="text-sm text-gray-600">Special Education Teacher</p>
                </div>
              </div>
              <p className="italic text-gray-700">
                "The classroom tools have made it so much easier to implement accommodations and track IEP goals in real-time."
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
                <div>
                  <h4 className="font-semibold">Lisa Rodriguez</h4>
                  <p className="text-sm text-gray-600">HR Director</p>
                </div>
              </div>
              <p className="italic text-gray-700">
                "AbleLyf has helped us create a more inclusive workplace with better accommodations for our neurodiverse team members."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="rounded-full bg-white w-8 h-8 flex items-center justify-center text-ablelyf-blue-500">
                  <Brain size={16} />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">AbleLyf</h1>
                  <p className="text-xs text-gray-400">Sensory Care</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Transforming care for neurodiverse individuals through technology and collaboration.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="hover:text-white">For Therapists</Link></li>
                <li><Link to="#" className="hover:text-white">For Teachers</Link></li>
                <li><Link to="#" className="hover:text-white">For Caregivers</Link></li>
                <li><Link to="#" className="hover:text-white">For HR Professionals</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="hover:text-white">About Us</Link></li>
                <li><Link to="#" className="hover:text-white">Careers</Link></li>
                <li><Link to="#" className="hover:text-white">Blog</Link></li>
                <li><Link to="#" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="#" className="hover:text-white">Accessibility</Link></li>
                <li><Link to="#" className="hover:text-white">HIPAA Compliance</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} AbleLyf Sensory Care. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="sr-only">Twitter</span>
                  {/* Twitter icon would go here */}
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="sr-only">LinkedIn</span>
                  {/* LinkedIn icon would go here */}
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="sr-only">Facebook</span>
                  {/* Facebook icon would go here */}
                </div>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
