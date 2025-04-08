
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

const Footer: React.FC = () => {
  return (
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
  );
};

export default Footer;
