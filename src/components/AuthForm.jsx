import React, { useState } from 'react';
import { TreePine } from 'lucide-react';

const AuthForm = ({ isLogin, onAuth, onNavigate }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAuth(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-6">
          <TreePine className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-gray-800">{isLogin ? 'Welcome Back' : 'Join EcoBuddy'}</h2>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'Continue your eco journey' : 'Start your sustainable journey today'}
          </p>
        </div>
        
        <div className="space-y-4">
          {!isLogin && (
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
          )}
          
          <div>
            <input
              type="email"
              placeholder="Email Address"
              className={`input-field ${errors.email ? 'border-red-500' : ''}`}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              className={`input-field ${errors.password ? 'border-red-500' : ''}`}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          
          <button
            onClick={handleSubmit}
            className="btn-primary w-full"
          >
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </div>
        
        <div className="mt-4 text-center">
          <button
            onClick={() => onNavigate(isLogin ? 'signup' : 'login')}
            className="text-green-500 hover:underline"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </button>
        </div>
        
        <div className="mt-4 text-center">
          <button
            onClick={() => onNavigate('landing')}
            className="text-gray-500 hover:underline"
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;