import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'

export const useUserData = () => {
  const { user } = useAuth()
  const [userData, setUserData] = useState(null)
  const [actions, setActions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchUserData()
      fetchUserActions()
    }
  }, [user])

  const fetchUserData = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error
      setUserData(data)
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUserActions = async () => {
    try {
      const { data, error } = await supabase
        .from('actions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

      if (error) throw error
      setActions(data)
    } catch (error) {
      console.error('Error fetching actions:', error)
    }
  }

  const addAction = async (actionType, points, description) => {
    try {
      const { data, error } = await supabase
        .from('actions')
        .insert({
          user_id: user.id,
          action_type: actionType,
          points,
          description
        })
        .select()

      if (error) throw error

      // Update user points
      await supabase
        .from('users')
        .update({ points: (userData.points || 0) + points })
        .eq('id', user.id)

      // Refresh data
      fetchUserData()
      fetchUserActions()

      return { data, error: null }
    } catch (error) {
      console.error('Error adding action:', error)
      return { data: null, error }
    }
  }

  return {
    userData,
    actions,
    loading,
    addAction,
    refreshData: () => {
      fetchUserData()
      fetchUserActions()
    }
  }
}