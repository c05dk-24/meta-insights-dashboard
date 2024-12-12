import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Login = () => {
  const [email, setEmail] = useState(import.meta.env.DEV ? 'admin@example.com' : '');
  const [password, setPassword] = useState(import.meta.env.DEV ? 'admin123' : '');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Meta Insights</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full bg-blue-500 text-white py-2 sm:py-3 px-4 rounded-lg text-sm sm:text-base
              transition-colors duration-200
              ${isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'hover:bg-blue-600 active:bg-blue-700'
              }
            `}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          {import.meta.env.DEV && (
            <div className="text-xs text-gray-500 text-center">
              <p>Development Mode</p>
              <p>Email: admin@example.com</p>
              <p>Password: admin123</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};