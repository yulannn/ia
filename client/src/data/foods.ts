import type { Food } from '../types';

export const foods: Food[] = [
  {
    id: 'steak',
    name: 'Steak de bœuf',
    image: '🥩',
    co2: 27.0, // kg CO₂ par kg de produit
    water: 15400, // litres par kg
    surface: 164.0, // m² par kg
    category: 'meat'
  },
  {
    id: 'chicken',
    name: 'Filet de poulet',
    image: '🍗',
    co2: 6.9,
    water: 4325,
    surface: 7.5,
    category: 'poultry'
  },
  {
    id: 'tofu',
    name: 'Tofu',
    image: '🧈',
    co2: 3.2,
    water: 2857,
    surface: 2.2,
    category: 'legume'
  },
  {
    id: 'lentils',
    name: 'Lentilles',
    image: '🫘',
    co2: 0.9,
    water: 5874,
    surface: 3.4,
    category: 'legume'
  },
  {
    id: 'cheese',
    name: 'Fromage',
    image: '🧀',
    co2: 13.5,
    water: 3178,
    surface: 41.8,
    category: 'dairy'
  },
  {
    id: 'egg',
    name: 'Œuf',
    image: '🥚',
    co2: 4.2,
    water: 3265,
    surface: 5.7,
    category: 'poultry'
  },
  {
    id: 'vegetables',
    name: 'Légumes verts',
    image: '🥬',
    co2: 2.0,
    water: 287,
    surface: 0.7,
    category: 'vegetable'
  },
  {
    id: 'tomatoes',
    name: 'Tomates',
    image: '🍅',
    co2: 2.3,
    water: 214,
    surface: 1.4,
    category: 'vegetable'
  },
  {
    id: 'carrots',
    name: 'Carottes',
    image: '🥕',
    co2: 0.4,
    water: 131,
    surface: 0.3,
    category: 'vegetable'
  },
  {
    id: 'milk',
    name: 'Lait',
    image: '🥛',
    co2: 3.2,
    water: 1050,
    surface: 8.9,
    category: 'dairy'
  },
  {
    id: 'rice',
    name: 'Riz',
    image: '🍚',
    co2: 4.0,
    water: 2497,
    surface: 2.8,
    category: 'vegetable'
  },
  {
    id: 'beans',
    name: 'Haricots verts',
    image: '🫛',
    co2: 2.1,
    water: 4055,
    surface: 2.5,
    category: 'legume'
  }
]; 