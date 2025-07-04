import { Car, Lightbulb, Recycle, Droplets, TreePine, Leaf, Sun, Home } from 'lucide-react';

export const actionTypes = [
  { 
    id: 'walked', 
    label: 'Walked/Biked instead of driving', 
    icon: Car, 
    points: 10,
    description: 'Reduced carbon emissions by choosing active transport',
    category: 'Transport'
  },
  { 
    id: 'solar_used', 
    label: 'Used solar-powered device', 
    icon: Lightbulb, 
    points: 15,
    description: 'Utilized renewable energy for daily activities',
    category: 'Energy'
  },
  { 
    id: 'recycled', 
    label: 'Recycled something', 
    icon: Recycle, 
    points: 8,
    description: 'Properly disposed of recyclable materials',
    category: 'Waste'
  },
  { 
    id: 'water_saved', 
    label: 'Conserved water', 
    icon: Droplets, 
    points: 12,
    description: 'Reduced water consumption through mindful usage',
    category: 'Water'
  },
  { 
    id: 'tree_planted', 
    label: 'Planted a tree', 
    icon: TreePine, 
    points: 50,
    description: 'Contributed to reforestation and carbon sequestration',
    category: 'Nature'
  },
  { 
    id: 'composted', 
    label: 'Composted organic waste', 
    icon: Leaf, 
    points: 15,
    description: 'Turned organic waste into nutrient-rich soil',
    category: 'Waste'
  },
  { 
    id: 'energy_saved', 
    label: 'Saved electricity', 
    icon: Sun, 
    points: 10,
    description: 'Reduced energy consumption at home or work',
    category: 'Energy'
  },
  { 
    id: 'local_shopping', 
    label: 'Bought local produce', 
    icon: Home, 
    points: 12,
    description: 'Supported local farmers and reduced transport emissions',
    category: 'Community'
  }
];

export const getActionById = (id) => {
  return actionTypes.find(action => action.id === id);
};

export const getActionsByCategory = (category) => {
  return actionTypes.filter(action => action.category === category);
};