export const ecoTips = [
  {
    id: 1,
    tip: "Switch off appliances at the wall to save 15% on power bills in Nairobi!",
    category: "Energy",
    impact: "High",
    location: "Urban"
  },
  {
    id: 2,
    tip: "Use a solar lamp instead of kerosene - it's safer and saves money long-term.",
    category: "Energy",
    impact: "High",
    location: "Rural"
  },
  {
    id: 3,
    tip: "Carry a reusable water bottle to reduce plastic waste in our beautiful Kenya.",
    category: "Waste",
    impact: "Medium",
    location: "All"
  },
  {
    id: 4,
    tip: "Plant indigenous trees like Mukau or Meru Oak - they thrive in our climate!",
    category: "Nature",
    impact: "High",
    location: "All"
  },
  {
    id: 5,
    tip: "Walk or cycle for short trips - it's great exercise and reduces pollution.",
    category: "Transport",
    impact: "Medium",
    location: "Urban"
  },
  {
    id: 6,
    tip: "Use natural light during the day instead of electric bulbs.",
    category: "Energy",
    impact: "Low",
    location: "All"
  },
  {
    id: 7,
    tip: "Collect rainwater during rainy seasons for your garden.",
    category: "Water",
    impact: "Medium",
    location: "All"
  },
  {
    id: 8,
    tip: "Buy from local farmers to reduce transport emissions and support community.",
    category: "Community",
    impact: "High",
    location: "All"
  },
  {
    id: 9,
    tip: "Compost your kitchen scraps to create nutrient-rich soil for plants.",
    category: "Waste",
    impact: "Medium",
    location: "All"
  },
  {
    id: 10,
    tip: "Use a clothesline instead of a dryer when the weather is sunny.",
    category: "Energy",
    impact: "Low",
    location: "All"
  },
  {
    id: 11,
    tip: "Choose matatu or bus over private car for longer trips in the city.",
    category: "Transport",
    impact: "Medium",
    location: "Urban"
  },
  {
    id: 12,
    tip: "Start a small kitchen garden with sukuma wiki and tomatoes.",
    category: "Food",
    impact: "Medium",
    location: "All"
  }
];

export const getTipsByCategory = (category) => {
  return ecoTips.filter(tip => tip.category === category);
};

export const getRandomTip = () => {
  return ecoTips[Math.floor(Math.random() * ecoTips.length)];
};

export const getTipsByLocation = (location) => {
  return ecoTips.filter(tip => tip.location === location || tip.location === "All");
};