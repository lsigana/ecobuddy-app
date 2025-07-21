import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

export class KenyaPartnersService {
  // M-Pesa Integration (Simulated)
  static async processReward(rewardType, pointsCost, userPhone) {
    try {
      // In real implementation, this would integrate with M-Pesa API
      const mpesaCode = 'MPZ' + Math.random().toString(36).substr(2, 9).toUpperCase()
      
      // Log reward redemption
      const { data, error } = await supabase
        .from('rewards')
        .insert({
          user_id: (await supabase.auth.getUser()).data.user.id,
          reward_type: rewardType,
          points_cost: pointsCost,
          mpesa_code: mpesaCode,
          status: 'completed'
        })

      if (error) throw error

      toast.success(`Reward sent! M-Pesa code: ${mpesaCode}`)
      return { success: true, mpesaCode }
    } catch (error) {
      console.error('M-Pesa processing error:', error)
      toast.error('Failed to process reward')
      return { success: false, error }
    }
  }

  // Kenya Forest Service Integration (Simulated)
  static async verifyTreePlanting(actionId, location, photoUrl) {
    try {
      const kfsCode = 'KFS' + Math.random().toString(36).substr(2, 8).toUpperCase()
      
      const { data, error } = await supabase
        .from('tree_verifications')
        .insert({
          user_id: (await supabase.auth.getUser()).data.user.id,
          action_id: actionId,
          location_lat: location.lat,
          location_lng: location.lng,
          photo_url: photoUrl,
          kfs_verification_code: kfsCode,
          verification_status: 'verified'
        })

      if (error) throw error

      // Update original action as verified
      await supabase
        .from('actions')
        .update({ verified: true })
        .eq('id', actionId)

      toast.success(`Tree verified by KFS! Code: ${kfsCode}`)
      return { success: true, kfsCode }
    } catch (error) {
      console.error('KFS verification error:', error)
      toast.error('Failed to verify tree planting')
      return { success: false, error }
    }
  }

  // Get Kenya-specific environmental challenges
  static getEnvironmentalChallenges() {
    return [
      {
        id: 1,
        title: 'Lake Victoria Pollution',
        description: 'Help reduce water pollution in Lake Victoria',
        actionType: 'water_conservation',
        bonusPoints: 20,
        region: 'Nyanza'
      },
      {
        id: 2,
        title: 'Mau Forest Restoration',
        description: 'Participate in Mau Forest rehabilitation',
        actionType: 'tree_planting',
        bonusPoints: 30,
        region: 'Rift Valley'
      },
      {
        id: 3,
        title: 'Nairobi Air Quality',
        description: 'Reduce emissions in Nairobi',
        actionType: 'clean_transport',
        bonusPoints: 15,
        region: 'Nairobi'
      },
      {
        id: 4,
        title: 'Coastal Mangrove Protection',
        description: 'Protect coastal mangroves',
        actionType: 'coastal_protection',
        bonusPoints: 25,
        region: 'Coast'
      }
    ]
  }
}
