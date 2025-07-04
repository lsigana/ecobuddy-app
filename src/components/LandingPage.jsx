import React from 'react';
import { TreePine, Plus, Star, Gift } from 'lucide-react';

const LandingPage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-green-500 p-4 rounded-full">
              <TreePine className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-green-800 mb-4">EcoBuddy</h1>
          <p className="text-xl text-gray-600 mb-8">Track your eco-actions. Earn points. Save the planet.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('signup')}
              className="btn-primary"
            >
              Sign Up
            </button>
            <button
              onClick={() => onNavigate('login')}
              className="btn-secondary"
            >
              Login
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="card text-center">
            <Plus className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Log Actions</h3>
            <p className="text-gray-600">Track your daily eco-friendly activities</p>
          </div>
          <div className="card text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Earn Points</h3>
            <p className="text-gray-600">Get rewarded for sustainable choices</p>
          </div>
          <div className="card text-center">
            <Gift className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Redeem Rewards</h3>
            <p className="text-gray-600">Use points for eco-friendly rewards</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;