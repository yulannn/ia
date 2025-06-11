export interface Food {
  id: string;
  name: string;
  emoji: string;
  category: 'meat' | 'poultry' | 'vegetable' | 'dairy' | 'legume';
  co2: number; // kg CO₂
  water: number; // litres
  surface: number; // m²
}

export interface PlateFood extends Food {
  plateId: string;
}

export interface EnvironmentalImpact {
  co2: number;
  water: number;
  surface: number;
} 