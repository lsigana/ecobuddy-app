import React from 'react';
import { TreePine, User, Award, MessageCircle, Star, LogOut } from 'lucide-react';

const Navigation = ({ currentUser, onNavigate, onLogout, showTips }) => {
  return (
    <nav className="bg-white shadow-sm p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <TreePine className="w-8 h-8 text-green-500" />
          <h1 className="text-xl font-bold text-green-800">EcoBuddy</h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors"
          >
            <User className="w-5 h-5" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>
          
          <button
            onClick={() => onNavigate('rewards')}
            className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors"
          >
            <Award className="w-5 h-5" />
            <span className="hidden sm:inline">Rewards</span>
          </button>
          
          <button
            onClick={showTips}
            className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="hidden sm:inline">Tips</span>
          </button>
          
          <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="font-semibold text-green-700">{currentUser.points}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {currentUser.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="hidden sm:inline font-medium">{currentUser.name}</span>
          </div>
          
          <button
            onClick={onLogout}
            className="text-gray-500 hover:text-red-500 transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;