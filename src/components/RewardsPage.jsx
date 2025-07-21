// src/components/RewardsPage.jsx

import { useState } from 'react'
import { supabase } from '../services/supabaseClient' // Ensure this exists in your services folder
import rewards from '../data/rewards'
import toast from 'react-hot-toast'

export default function RewardsPage({ onBack, userData, refreshUserData }) {
  const [loading, setLoading] = useState(false)

  const handleRedeem = async (rewardId, cost) => {
    if (userData.points < cost) {
      toast.error('Not enough points to redeem this reward.')
      return
    }

    setLoading(true)

    try {
      // Insert redemption record
      const { error } = await supabase.from('redemptions').insert([
        {
          user_id: userData.id,
          reward_id: rewardId,
          points_spent: cost,
          status: 'pending'
        }
      ])

      if (error) throw new Error(error.message)

      toast.success('Reward redeemed! Our team will contact you.')

      // Deduct points in database
      const { error: updateError } = await supabase
        .from('users')
        .update({ points: userData.points - cost })
        .eq('id', userData.id)

      if (updateError) throw new Error(updateError.message)

      refreshUserData()

    } catch (err) {
      toast.error('Redemption failed. Please try again.')
    }

    setLoading(false)
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-2xl shadow-lg">
      <button onClick={onBack} className="text-green-600 mb-4 hover:underline">← Back</button>
      <h2 className="text-2xl font-bold mb-6">Available Rewards</h2>

      {rewards.map((reward) => (
        <div key={reward.id} className="border rounded-lg p-4 mb-4">
          <h3 className="font-semibold">{reward.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{reward.cost} points</p>
          <button
            disabled={loading}
            onClick={() => handleRedeem(reward.id, reward.cost)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Redeem'}
          </button>
        </div>
      ))}
    </div>
  )
}
