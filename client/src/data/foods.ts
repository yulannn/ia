import type { Food } from '../types';

export const foods: Food[] = [
  {
    id: 'lamb',
    name: 'Agneau',
    emoji: '🍖',
    category: 'meat',
    co2: 39.2,
    water: 10400,
    surface: 25.0,
  },
  {
    id: 'beef',
    name: 'Bœuf',
    emoji: '🥩',
    category: 'meat',
    co2: 27.0, // kg CO₂ par kg de produit
    water: 15400, // litres par kg
    surface: 28.0, // m² par kg
  },
  {
    id: 'pork',
    name: 'Porc',
    emoji: '🐷',
    category: 'meat',
    co2: 12.1,
    water: 6000,
    surface: 12.0,
  },
  {
    id: 'chicken',
    name: 'Poulet',
    emoji: '🍗',
    category: 'poultry',
    co2: 6.9,
    water: 4300,
    surface: 8.0,
  },
  {
    id: 'fish',
    name: 'Poisson',
    emoji: '🐟',
    category: 'meat',
    co2: 6.1,
    water: 5000,
    surface: 3.0,
  },
  {
    id: 'salmon',
    name: 'Saumon',
    emoji: '🍣',
    category: 'meat',
    co2: 5.8,
    water: 4800,
    surface: 2.8,
  },
  {
    id: 'rabbit',
    name: 'Lapin',
    emoji: '🐰',
    category: 'meat',
    co2: 5.5,
    water: 3500,
    surface: 6.0,
  },
  {
    id: 'eggs',
    name: 'Œufs',
    emoji: '🥚',
    category: 'dairy',
    co2: 4.8,
    water: 3300,
    surface: 6.0,
  },
  {
    id: 'rice',
    name: 'Riz',
    emoji: '🍚',
    category: 'vegetable',
    co2: 2.7,
    water: 2500,
    surface: 3.0,
  },
  {
    id: 'potatoes',
    name: 'Pommes de terre',
    emoji: '🥔',
    category: 'vegetable',
    co2: 2.9,
    water: 290,
    surface: 1.0,
  },
  {
    id: 'beans',
    name: 'Haricots verts',
    emoji: '🫛',
    category: 'legume',
    co2: 2.1,
    water: 4055,
    surface: 2.5,
  },
  {
    id: 'tofu',
    name: 'Tofu',
    emoji: '🧊',
    category: 'legume',
    co2: 2.0,
    water: 2000,
    surface: 1.0,
  },
  {
    id: 'pasta',
    name: 'Pâtes',
    emoji: '🍝',
    category: 'vegetable',
    co2: 1.4,
    water: 1800,
    surface: 2.0,
  },
  {
    id: 'tomatoes',
    name: 'Tomates',
    emoji: '🍅',
    category: 'vegetable',
    co2: 1.4,
    water: 214,
    surface: 0.3,
  },
  {
    id: 'lentils',
    name: 'Lentilles',
    emoji: '🫘',
    category: 'legume',
    co2: 0.9,
    water: 1250,
    surface: 1.0,
  },
  {
    id: 'carrots',
    name: 'Carottes',
    emoji: '🥕',
    category: 'vegetable',
    co2: 0.4,
    water: 195,
    surface: 0.3,
  },
  {
    id: 'lettuce',
    name: 'Salade',
    emoji: '🥬',
    category: 'vegetable',
    co2: 0.4,
    water: 237,
    surface: 0.2,
  },
  {
    id: 'apples',
    name: 'Pommes',
    emoji: '🍎',
    category: 'vegetable',
    co2: 0.4,
    water: 822,
    surface: 0.3,
  },
]; 