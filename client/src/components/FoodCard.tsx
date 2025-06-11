import type { Food } from '../types';
import FoodItem from './FoodItem';

interface FoodCardProps {
  foods: Food[];
  onFoodDragStart?: (food: Food) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ foods, onFoodDragStart }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
      <div className="flex items-center mb-6">
        <span className="text-2xl mr-3">🥘</span>
        <h2 className="text-xl font-bold text-gray-800">Carte des aliments</h2>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Glissez les aliments vers l'assiette pour voir leur impact environnemental
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {foods.map((food) => (
          <FoodItem
            key={food.id}
            food={food}
            onDragStart={onFoodDragStart}
          />
        ))}
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <h4 className="font-semibold text-green-800 mb-2">💡 Astuce</h4>
        <p className="text-sm text-green-700">
          Les aliments végétaux ont généralement un impact environnemental plus faible
          que les produits d'origine animale.
        </p>
      </div>
    </div>
  );
};

export default FoodCard; 