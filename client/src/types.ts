export interface Food {
  id: string;
  name: string;
  image: string;
  co2: number; // kg CO₂
  water: number; // litres
  surface: number; // m²
  category: 'meat' | 'poultry' | 'vegetable' | 'dairy' | 'legume';
}

export interface PlateFood extends Food {
  plateId: string;
}

export interface EnvironmentalImpact {
  co2: number;
  water: number;
  surface: number;
} 