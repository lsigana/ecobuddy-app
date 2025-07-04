import { TreePine, Lightbulb, Gift, Droplets, Recycle, Heart, Award, ShoppingBag } from 'lucide-react';

export const rewards = [
  { 
    id: 1, 
    title: 'Plant 1 tree in your name', 
    description: 'We\'ll plant a native tree through Kenya Forest Service partnership', 
    points: 100, 
    icon: TreePine,
    category: 'Environmental',
    availability: 'Available',
    partner: 'Kenya Forest Service'
  },
  { 
    id: 2, 
    title: '10% off D-Light Solar', 
    description: 'Discount on solar lamps, chargers, and home systems', 
    points: 150, 
    icon: Lightbulb,
    category: 'Energy',
    availability: 'Available',
    partner: 'D-Light'
  },
  { 
    id: 3, 
    title: 'Eco-friendly shopping bag', 
    description: 'Reusable bag made from recycled materials', 
    points: 80, 
    icon: ShoppingBag,
    category: 'Lifestyle',
    availability: 'Available',
    partner: 'EcoBuddy Store'
  },
  { 
    id: 4, 
    title: 'Water filter voucher', 
    description: '20% off household water filters and purification systems', 
    points: 120, 
    icon: Droplets,
    category: 'Health',
    availability: 'Available',
    partner: 'LifeStraw Kenya'
  },
  { 
    id: 5, 
    title: 'Recycling bin set', 
    description: 'Complete home recycling system with sorting bins', 
    points: 200, 
    icon: Recycle,
    category: 'Waste',
    availability: 'Limited',
    partner: 'Green Cycle'
  },
  { 
    id: 6, 
    title: 'Eco-hero badge', 
    description: 'Digital badge for social media and professional profiles', 
    points: 50, 
    icon: Award,
    category: 'Recognition',
    availability: 'Available',
    partner: 'EcoBuddy'
  },
  { 
    id: 7, 
    title: 'Carbon offset certificate', 
    description: 'Official certificate for 1 ton of CO2 offset', 
    points: 300, 
    icon: Heart,
    category: 'Environmental',
    availability: 'Available',
    partner: 'Kenya Carbon Credit'
  },
  { 
    id: 8, 
    title: 'Organic seeds package', 
    description: 'Indigenous vegetable seeds for home gardening', 
    points: 75, 
    icon: Gift,
    category: 'Gardening',
    availability: 'Available',
    partner: 'Simlaw Seeds'
  }
];

export const getRewardById = (id) => {
  return rewards.find(reward => reward.id === id);
};

export const getRewardsByCategory = (category) => {
  return rewards.filter(reward => reward.category === category);
};

export const getAffordableRewards = (userPoints) => {
  return rewards.filter(reward => reward.points <= userPoints);
};