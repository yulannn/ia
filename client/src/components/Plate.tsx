import { useState } from 'react';
import type { Food, PlateFood, EnvironmentalImpact } from '../types';
import FoodItem from './FoodItem';

interface PlateProps {
  plateFoods: PlateFood[];
  onFoodAdded: (food: Food) => void;
  onFoodRemoved: (foodId: string) => void;
}

const Plate: React.FC<PlateProps> = ({ plateFoods, onFoodAdded, onFoodRemoved }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovering(false);

    try {
      const foodData = e.dataTransfer.getData('application/json');
      const food: Food = JSON.parse(foodData);
      onFoodAdded(food);
    } catch (error) {
      console.error('Erreur lors du drop:', error);
    }
  };

  const calculateTotalImpact = (): EnvironmentalImpact => {
    return plateFoods.reduce(
      (total, food) => ({
        co2: total.co2 + food.co2,
        water: total.water + food.water,
        surface: total.surface + food.surface,
      }),
      { co2: 0, water: 0, surface: 0 }
    );
  };

  const totalImpact = calculateTotalImpact();

  const getImpactLevel = (co2: number): { color: string; message: string } => {
    if (co2 <= 5) return { color: 'text-green-600', message: 'Excellent choix!' };
    if (co2 <= 15) return { color: 'text-yellow-600', message: 'Impact modéré' };
    if (co2 <= 30) return { color: 'text-orange-600', message: 'Impact élevé' };
    return { color: 'text-red-600', message: 'Impact très élevé!' };
  };

  const impactLevel = getImpactLevel(totalImpact.co2);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <span className="text-2xl mr-3">🍽️</span>
        <h2 className="text-xl font-bold text-gray-800">Mon assiette</h2>
      </div>

      {/* Zone de drop - assiette */}
      <div
        className={`
          relative w-80 h-80 mx-auto mb-6 rounded-full border-4 transition-all duration-300
          ${isHovering
            ? 'border-green-400 bg-green-50 scale-105'
            : 'border-gray-300 bg-gray-50'
          }
          ${plateFoods.length === 0 ? 'border-dashed' : 'border-solid'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Message d'indication */}
        {plateFoods.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-center p-8">
            <div>
              <div className="text-4xl mb-2">🍽️</div>
              <p className="text-sm">
                Glissez des aliments ici pour créer votre repas
              </p>
            </div>
          </div>
        )}

        {/* Aliments dans l'assiette */}
        <div className="absolute inset-4 flex flex-wrap items-center justify-center gap-2 p-4">
          {plateFoods.map((food) => (
            <FoodItem
              key={food.plateId}
              food={food}
              isInPlate={true}
              onRemove={onFoodRemoved}
            />
          ))}
        </div>
      </div>

      {/* Résumé de l'impact environnemental */}
      {plateFoods.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
            <span className="mr-2">📊</span>
            Impact environnemental total
          </h3>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {totalImpact.co2.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">kg CO₂</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {totalImpact.water.toFixed(0)}
              </div>
              <div className="text-sm text-gray-600">litres d'eau</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {totalImpact.surface.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">m² agricoles</div>
            </div>
          </div>

          <div className={`text-center font-medium ${impactLevel.color}`}>
            {impactLevel.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Plate; 