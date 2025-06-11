import { useDrag } from 'react-dnd'
import type { DragSourceMonitor } from 'react-dnd'
import type { Food } from '../types'
import { useRef } from 'react'

interface FoodItemProps {
  food: Food
  isInPlate?: boolean
  onRemove?: () => void
}

export default function FoodItem({ food, isInPlate = false, onRemove }: FoodItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [{ isDragging }, dragRef] = useDrag<Food, unknown, { isDragging: boolean }>(() => ({
    type: 'food',
    item: food,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  dragRef(ref)

  return (
    <div
      ref={ref}
      className={`
        relative group cursor-move
        ${isInPlate ? 'w-16 h-16' : 'w-24 h-32'}
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        transition-all duration-300
        ${isInPlate
          ? 'hover:bg-red-100 hover:border-red-500 hover:scale-110'
          : 'hover:shadow-lg hover:scale-105 hover:border-gray-400'
        }
      `}
    >
      <div className={`
        w-full h-full
        flex flex-col items-center justify-center
        rounded-lg border-2
        ${isInPlate ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'}
        p-2
        ${isInPlate ? 'animate-pulse-slow' : ''}
      `}>
        <span className="text-3xl mb-1">{food.emoji}</span>
        <span className="text-xs text-center font-medium text-gray-700">
          {food.name}
        </span>

        {isInPlate && onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            className="
              absolute -top-2 -right-2
              w-6 h-6
              bg-red-500 text-white
              rounded-full
              flex items-center justify-center
              opacity-0 group-hover:opacity-100
              transition-opacity duration-200
              hover:bg-red-600
              shadow-md
              animate-bounce-slow
            "
          >
            ×
          </button>
        )}

        {!isInPlate && (
          <div className="mt-1 text-xs text-gray-500">
            {food.co2.toFixed(1)} kg CO₂
          </div>
        )}
      </div>
    </div>
  )
} 