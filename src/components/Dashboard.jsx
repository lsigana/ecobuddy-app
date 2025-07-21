import { useState, useEffect } from 'react'
import { LogOut, Plus, Award, Lightbulb, Bell, MapPin } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useUserData } from '../hooks/useUserData'
import { KenyaPartnersService } from '../services/kenyaPartners'
import { NotificationService } from '../services/notifications'
import ActionModal from './ActionModal'
import TipsModal from './TipsModal'
import RewardsPage from './RewardsPage'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const { userData, actions, loading, addAction } = useUserData()
  const [showActionModal, setShowActionModal] = useState(false)
  const [showTipsModal, setShowTipsModal] = useState(false)
  const [showRewards, setShowRewards] = useState(false)
  const [challenges, setChallenges] = useState([])

  useEffect(() => {
    setChallenges(KenyaPartnersService.getEnvironmentalChallenges())
    NotificationService.requestPermission()
    NotificationService.scheduleReminder()
  }, [])

  const handleActionLogged = (actionType, points, description) => {
    addAction(actionType, points, description)
    setShowActionModal(false)
    NotificationService.sendNotification('Action Logged!', `You earned ${points} points for ${description}`)
    toast.success(`You earned ${points} points!`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your eco dashboard...</p>
        </div>
      </div>
    )
  }

  if (showRewards) {
    return (
        <RewardsPage
        onBack={() => setShowRewards(false)}
        userData={userData}
        // refreshUserData={refreshUserData}  // Removed undefined prop
        />
    )
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🌱</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">EcoBuddy</h1>
              <p className="text-sm text-gray-600">Kenya Eco Tracker</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => NotificationService.sendNotification('Test', 'Notifications working!')}
              className="p-2 text-gray-400 hover:text-green-600 transition-colors"
            >
              <Bell className="h-5 w-5" />
            </button>
            <button
              onClick={signOut}
              className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Welcome */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Welcome back, {userData?.name || 'Eco Warrior'}! 🌍
              </h2>
              <p className="text-gray-600 mt-2">Keep making a difference in Kenya's environment</p>
            </div>
            <div className="text-right">
            <div className="text-3xl font-bold text-green-600">
                {userData?.points || 0}
            </div>
            <div className="text-sm text-gray-500">Eco Points</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              onClick={() => setShowActionModal(true)}
              className="bg-green-600 text-white p-4 rounded-xl hover:bg-green-700 flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Log Action</span>
            </button>
            <button
              onClick={() => setShowRewards(true)}
              className="bg-blue-600 text-white p-4 rounded-xl hover:bg-blue-700 flex items-center space-x-2"
            >
              <Award className="h-5 w-5" />
              <span>Rewards</span>
            </button>
            <button
              onClick={() => setShowTipsModal(true)}
              className="bg-purple-600 text-white p-4 rounded-xl hover:bg-purple-700 flex items-center space-x-2"
            >
              <Lightbulb className="h-5 w-5" />
              <span>Eco Tips</span>
            </button>
            <button className="bg-orange-600 text-white p-4 rounded-xl hover:bg-orange-700 flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Challenges</span>
            </button>
          </div>
        </div>

        {/* Kenya Challenges */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">🇰🇪 Kenya Environmental Challenges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{challenge.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>
                    <p className="text-xs text-orange-600 mt-2">Region: {challenge.region}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">+{challenge.bonusPoints}</div>
                    <div className="text-xs text-gray-500">bonus points</div>
                  </div>
                </div>
                <button className="w-full bg-green-100 text-green-700 py-2 rounded-lg hover:bg-green-200">
                  Participate
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Feed */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Actions</h3>
          {actions.length === 0 ? (
            <div className="text-center py-8">
                <div className="text-gray-400 text-6xl mb-4">🌱</div>
                <p className="text-gray-600">No actions logged yet. Start your eco journey!</p>
            </div>
            ) : (
            <div className="space-y-4">
                {actions.map((action) => (
                <div
                    key={action.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                    <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold">
                        {action.action_type === 'walking' ? '🚶' :
                        action.action_type === 'solar' ? '☀️' :
                        action.action_type === 'recycling' ? '♻️' :
                        action.action_type === 'water_conservation' ? '💧' :
                        action.action_type === 'tree_planting' ? '🌳' : '🌱'}
                        </span>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">{action.description}</p>
                        <p className="text-xs text-gray-500">{new Date(action.timestamp).toLocaleString()}</p>
                    </div>
                    </div>
                    <div className="font-bold text-green-600">+{action.points}</div>
                </div>
                ))}
            </div>
            )}
        </div>
      </div>

      {/* Modals */}
      {showActionModal && (
        <ActionModal
          onClose={() => setShowActionModal(false)}
          onActionLogged={handleActionLogged}
        />
      )}
      {showTipsModal && (
        <TipsModal onClose={() => setShowTipsModal(false)} />
      )}
    </div>
  )
}
