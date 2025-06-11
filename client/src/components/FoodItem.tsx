import type { Food } from '../types';

interface FoodItemProps {
  food: Food;
  onDragStart?: (food: Food) => void;
  isInPlate?: boolean;
  onRemove?: (foodId: string) => void;
}

const FoodItem: React.FC<FoodItemProps> = ({
  food,
  onDragStart,
  isInPlate = false,
  onRemove
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify(food));
    if (onDragStart) {
      onDragStart(food);
    }
  };

  const handleClick = () => {
    if (isInPlate && onRemove) {
      onRemove(food.id);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'meat': return 'border-red-400 bg-red-50';
      case 'poultry': return 'border-orange-400 bg-orange-50';
      case 'vegetable': return 'border-green-400 bg-green-50';
      case 'dairy': return 'border-blue-400 bg-blue-50';
      case 'legume': return 'border-purple-400 bg-purple-50';
      default: return 'border-gray-400 bg-gray-50';
    }
  };

  return (
    <div
      className={`
        relative p-3 rounded-lg border-2 cursor-pointer transition-all duration-200
        ${getCategoryColor(food.category)}
        ${isInPlate ? 'hover:bg-red-100 hover:border-red-500' : 'hover:shadow-lg hover:scale-105'}
        ${isInPlate ? 'w-16 h-16' : 'w-24 h-32'}
      `}
      draggable={!isInPlate}
      onDragStart={handleDragStart}
      onClick={handleClick}
      title={isInPlate ? 'Cliquer pour retirer' : food.name}
    >
      <div className="text-center">
        <div className={`text-2xl mb-1 ${isInPlate ? 'text-lg' : ''}`}>
          {food.image}
        </div>
        {!isInPlate && (
          <>
            <h3 className="font-semibold text-sm text-gray-800 mb-2">{food.name}</h3>
            <div className="text-xs text-gray-600 space-y-1">
              <div>🌍 {food.co2} kg CO₂</div>
              <div>💧 {food.water}L</div>
              <div>🌾 {food.surface}m²</div>
            </div>
          </>
        )}
      </div>
      {isInPlate && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
          ×
        </div>
      )}
    </div>
  );
};

export default FoodItem; 