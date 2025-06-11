import { useDrop } from 'react-dnd'
import type { Food, PlateFood } from '../types'
import FoodItem from './FoodItem'
import { useRef } from 'react'

interface PlateProps {
  plateFoods: PlateFood[]
  onFoodAdded: (food: Food) => void
  onFoodRemoved: (plateId: string) => void
  title: string
  description: string
  plateType: 'standard' | 'balanced'
}

export default function Plate({ plateFoods, onFoodAdded, onFoodRemoved, title, description, plateType }: PlateProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'food',
    drop: (item: Food) => {
      onFoodAdded(item)
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  drop(ref)

  const totalCo2 = plateFoods.reduce((sum, food) => sum + food.co2, 0)
  const totalWater = plateFoods.reduce((sum, food) => sum + food.water, 0)
  const totalSurface = plateFoods.reduce((sum, food) => sum + food.surface, 0)

  const getImpactLevel = (totalCo2: number) => {
    if (totalCo2 < 10) return { level: 'faible', color: 'text-green-600' };
    if (totalCo2 < 18) return { level: 'modéré', color: 'text-yellow-600' };
    if (totalCo2 < 25) return { level: 'élevé', color: 'text-orange-600' };
    return { level: 'très élevé', color: 'text-red-600' };
  };

  const impactLevel = getImpactLevel(totalCo2)

  const getPlateColor = () => {
    const totalCo2 = plateFoods.reduce((sum, food) => sum + food.co2, 0);
    if (totalCo2 === 0) return 'bg-white';
    if (totalCo2 < 10) return 'bg-red-50';
    if (totalCo2 < 18) return 'bg-red-100';
    if (totalCo2 < 25) return 'bg-red-200';
    if (totalCo2 < 30) return 'bg-red-400';
    return 'bg-red-400';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Titre et description de l'assiette */}
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-3 animate-bounce-slow">🍽️</span>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
      <p className="text-sm text-gray-600 mb-6">{description}</p>

      {/* Zone de dépôt */}
      <div
        ref={ref}
        className={`
          relative aspect-square w-full max-w-[300px] mx-auto rounded-full border-2
          ${plateFoods.length === 0 ? 'border-dashed' : 'border-solid'}
          ${plateFoods.length === 0 ? 'border-gray-300' : 'border-gray-400'}
          ${plateFoods.length === 0 ? 'animate-pulse-slow' : ''}
          transition-all duration-300
          hover:shadow-lg hover:scale-[1.02]
          ${getPlateColor()}
        `}
      >
        {plateFoods.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 animate-pulse-slow">
            <span className="text-4xl mb-2 animate-bounce-slow">🍽️</span>
            <p className="text-center px-4">
              Glissez des aliments ici pour créer votre repas
            </p>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-wrap items-center justify-center p-4">
            {plateFoods.map((food) => (
              <FoodItem
                key={food.plateId}
                food={food}
                isInPlate={true}
                onRemove={() => onFoodRemoved(food.plateId)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Résumé de l'impact environnemental */}
      {plateFoods.length > 0 && (
        <div className="mt-6 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <span className="mr-2 animate-pulse-slow">📊</span>
              Impact environnemental
            </h3>
            <span className={`font-bold ${impactLevel.color}`}>
              {impactLevel.level}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-orange-50 rounded-lg animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-sm text-orange-600 mb-1">CO₂</div>
              <div className="text-xl font-bold text-orange-700">
                {totalCo2.toFixed(1)} kg
              </div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-sm text-blue-600 mb-1">Eau</div>
              <div className="text-xl font-bold text-blue-700">
                {totalWater.toFixed(0)} L
              </div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-sm text-green-600 mb-1">Surface</div>
              <div className="text-xl font-bold text-green-700">
                {totalSurface.toFixed(1)} m²
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 mt-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Impact {impactLevel.level.toLowerCase()}
          </div>
        </div>
      )}
    </div>
  )
} 