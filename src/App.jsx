import React, { useState, useEffect } from 'react';
import { User, Plus, Award, MessageCircle, TreePine, Recycle, Car, Lightbulb, Droplets, X, Check, Star, Gift } from 'lucide-react';

const EcoBuddy = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('landing');
  const [showActionModal, setShowActionModal] = useState(false);
  const [showTipsModal, setShowTipsModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [ecoActions, setEcoActions] = useState([]);
  const [currentTip, setCurrentTip] = useState('');

  // Sample eco tips for Kenya
  const ecoTips = [
    "Switch off appliances at the wall to save 15% on power bills in Nairobi!",
    "Use a solar lamp instead of kerosene - it's safer and saves money long-term.",
    "Carry a reusable water bottle to reduce plastic waste in our beautiful Kenya.",
    "Plant indigenous trees like Mukau or Meru Oak - they thrive in our climate!",
    "Walk or cycle for short trips - it's great exercise and reduces pollution.",
    "Use natural light during the day instead of electric bulbs.",
    "Collect rainwater during rainy seasons for your garden.",
    "Buy from local farmers to reduce transport emissions and support community."
  ];

  const actionTypes = [
    { id: 'walked', label: 'Walked/Biked instead of driving', icon: Car, points: 10 },
    { id: 'solar_used', label: 'Used solar-powered device', icon: Lightbulb, points: 15 },
    { id: 'recycled', label: 'Recycled something', icon: Recycle, points: 8 },
    { id: 'water_saved', label: 'Conserved water', icon: Droplets, points: 12 },
    { id: 'tree_planted', label: 'Planted a tree', icon: TreePine, points: 50 }
  ];

  const rewards = [
    { id: 1, title: 'Plant 1 tree in your name', description: 'We\'ll plant a tree through Kenya Forest Service', points: 100, icon: TreePine },
    { id: 2, title: '10% off D-Light Solar', description: 'Discount on solar lamps and chargers', points: 150, icon: Lightbulb },
    { id: 3, title: 'Eco-friendly shopping bag', description: 'Reusable bag made from recycled materials', points: 80, icon: Gift },
    { id: 4, title: 'Water filter voucher', description: '20% off household water filters', points: 120, icon: Droplets }
  ];

  // Initialize with sample user
  useEffect(() => {
    const sampleUser = {
      id: 1,
      name: 'Leah',
      email: 'leah@example.com',
      points: 0,
      created_at: new Date().toISOString()
    };
    setUsers([sampleUser]);
  }, []);

  const handleLogin = (email, password) => {
    // Simulate login
    const user = users.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      setCurrentPage('dashboard');
    }
  };

  const handleSignup = (name, email, password) => {
    // Simulate signup
    const newUser = {
      id: users.length + 1,
      name,
      email,
      points: 0,
      created_at: new Date().toISOString()
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    setCurrentPage('dashboard');
  };

  const logEcoAction = (actionType, description = '') => {
    const action = actionTypes.find(a => a.id === actionType);
    const newAction = {
      id: ecoActions.length + 1,
      user_id: currentUser.id,
      action_type: actionType,
      action_description: description,
      points_awarded: action.points,
      date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString()
    };

    setEcoActions([...ecoActions, newAction]);
    
    // Update user points
    const updatedUser = { ...currentUser, points: currentUser.points + action.points };
    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === currentUser.id ? updatedUser : u));
    setShowActionModal(false);
  };

  const generateTip = () => {
    const randomTip = ecoTips[Math.floor(Math.random() * ecoTips.length)];
    setCurrentTip(randomTip);
  };

  const LandingPage = () => (
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
              onClick={() => setCurrentPage('signup')}
              className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              Sign Up
            </button>
            <button
              onClick={() => setCurrentPage('login')}
              className="bg-white text-green-500 px-8 py-3 rounded-lg font-semibold border-2 border-green-500 hover:bg-green-50 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Plus className="w-8 h-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Log Actions</h3>
            <p className="text-gray-600">Track your daily eco-friendly activities</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Earn Points</h3>
            <p className="text-gray-600">Get rewarded for sustainable choices</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Gift className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Redeem Rewards</h3>
            <p className="text-gray-600">Use points for eco-friendly rewards</p>
          </div>
        </div>
      </div>
    </div>
  );

  const AuthForm = ({ isLogin }) => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleSubmit = () => {
      if (isLogin) {
        handleLogin(formData.email, formData.password);
      } else {
        handleSignup(formData.name, formData.email, formData.password);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center mb-6">
            <TreePine className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-gray-800">{isLogin ? 'Login' : 'Sign Up'}</h2>
          </div>
          
          <div className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <button
              onClick={() => setCurrentPage(isLogin ? 'signup' : 'login')}
              className="text-green-500 hover:underline"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <button
              onClick={() => setCurrentPage('landing')}
              className="text-gray-500 hover:underline"
            >
              Back to home
            </button>
          </div>
        </div>
      </div>
    );
  };

  const Dashboard = () => {
    const userActions = ecoActions.filter(action => action.user_id === currentUser.id);
    
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm p-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <TreePine className="w-8 h-8 text-green-500" />
              <h1 className="text-xl font-bold text-green-800">EcoBuddy</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage('rewards')}
                className="flex items-center space-x-2 text-gray-600 hover:text-green-500"
              >
                <Award className="w-5 h-5" />
                <span>Rewards</span>
              </button>
              <button
                onClick={() => { generateTip(); setShowTipsModal(true); }}
                className="flex items-center space-x-2 text-gray-600 hover:text-green-500"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Tips</span>
              </button>
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{currentUser.name}</span>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto p-6">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Welcome back, {currentUser.name}! 🌿</h3>
              <div className="text-3xl font-bold text-green-600">{currentUser.points}</div>
              <div className="text-gray-600">Green Points</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Actions This Week</h3>
              <div className="text-3xl font-bold text-blue-600">{userActions.length}</div>
              <div className="text-gray-600">Eco Activities</div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <button
                onClick={() => setShowActionModal(true)}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Log New Action</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Actions</h3>
            {userActions.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No actions logged yet. Start tracking your eco-friendly activities!</p>
            ) : (
              <div className="space-y-3">
                {userActions.slice(-5).reverse().map((action) => {
                  const actionType = actionTypes.find(a => a.id === action.action_type);
                  const IconComponent = actionType.icon;
                  return (
                    <div key={action.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="w-6 h-6 text-green-500" />
                        <div>
                          <div className="font-medium">{actionType.label}</div>
                          <div className="text-sm text-gray-500">{action.date}</div>
                        </div>
                      </div>
                      <div className="text-green-600 font-semibold">+{action.points_awarded} pts</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const RewardsPage = () => (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <TreePine className="w-8 h-8 text-green-500" />
            <h1 className="text-xl font-bold text-green-800">EcoBuddy</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className="text-gray-600 hover:text-green-500"
            >
              Dashboard
            </button>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold">{currentUser.points} points</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Redeem Your Points</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => {
            const IconComponent = reward.icon;
            const canRedeem = currentUser.points >= reward.points;
            
            return (
              <div key={reward.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center mb-4">
                  <div className={`inline-flex p-3 rounded-full ${canRedeem ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <IconComponent className={`w-8 h-8 ${canRedeem ? 'text-green-500' : 'text-gray-400'}`} />
                  </div>
                </div>
                
                <h3 className="font-semibold text-center mb-2">{reward.title}</h3>
                <p className="text-gray-600 text-center text-sm mb-4">{reward.description}</p>
                
                <div className="text-center mb-4">
                  <span className="text-2xl font-bold text-green-600">{reward.points}</span>
                  <span className="text-gray-500 ml-1">points</span>
                </div>
                
                <button
                  className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                    canRedeem
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!canRedeem}
                >
                  {canRedeem ? 'Redeem' : 'Not enough points'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const ActionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Log Eco Action</h3>
          <button
            onClick={() => setShowActionModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-4">What eco-friendly thing did you do today?</p>
        
        <div className="space-y-3">
          {actionTypes.map((action) => {
            const IconComponent = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => logEcoAction(action.id)}
                className="w-full p-3 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <IconComponent className="w-6 h-6 text-green-500" />
                  <span>{action.label}</span>
                </div>
                <span className="text-green-600 font-semibold">+{action.points} pts</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const TipsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">EcoBuddy Tips</h3>
          <button
            onClick={() => setShowTipsModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="text-center">
          <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-green-500" />
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-gray-700">{currentTip}</p>
          </div>
          
          <button
            onClick={generateTip}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Get Another Tip
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="font-sans">
      {currentPage === 'landing' && <LandingPage />}
      {currentPage === 'login' && <AuthForm isLogin={true} />}
      {currentPage === 'signup' && <AuthForm isLogin={false} />}
      {currentPage === 'dashboard' && currentUser && <Dashboard />}
      {currentPage === 'rewards' && currentUser && <RewardsPage />}
      
      {showActionModal && <ActionModal />}
      {showTipsModal && <TipsModal />}
    </div>
  );
};

export default EcoBuddy;