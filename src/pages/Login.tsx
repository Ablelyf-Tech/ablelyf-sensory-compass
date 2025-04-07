
import React from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { Brain } from 'lucide-react';

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
    </div>
  );
};

export default Login;
