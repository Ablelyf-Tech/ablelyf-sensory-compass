
import React from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-ablelyf-blue-50">
      <div className="flex flex-col items-center mb-6">
        <div className="rounded-full bg-ablelyf-blue-500 w-16 h-16 flex items-center justify-center text-white mb-4">
          <Brain size={32} />
        </div>
        <h1 className="text-3xl font-bold text-ablelyf-blue-900">AbleLyf</h1>
        <p className="text-ablelyf-blue-700">Sensory Care Platform</p>
      </div>
      <LoginForm />
      <div className="mt-4 text-sm text-ablelyf-blue-700">
        <p>Don't have an account? <Link to="/register" className="text-ablelyf-blue-600 hover:underline">Register</Link></p>
        <p className="mt-2 text-center text-xs text-ablelyf-blue-500">
          © {new Date().getFullYear()} AbleLyf Sensory Care. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
