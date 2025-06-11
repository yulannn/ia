import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import type { Food, PlateFood } from './types'
import { foods } from './data/foods'
import Counter from './components/Counter'
import FoodCard from './components/FoodCard'
import Plate from './components/Plate'


function App() {
  const [standardPlateFoods, setStandardPlateFoods] = useState<PlateFood[]>([]);
  const [balancedPlateFoods, setBalancedPlateFoods] = useState<PlateFood[]>([]);

  const handleFoodAdded = (food: Food, plateType: 'standard' | 'balanced') => {
    const plateFood: PlateFood = {
      ...food,
      plateId: `${food.id}-${Date.now()}-${Math.random()}`
    };

    if (plateType === 'standard') {
      setStandardPlateFoods(prev => [...prev, plateFood]);
    } else {
      setBalancedPlateFoods(prev => [...prev, plateFood]);
    }
  };

  const handleFoodRemoved = (plateId: string, plateType: 'standard' | 'balanced') => {
    if (plateType === 'standard') {
      setStandardPlateFoods(prev => prev.filter(food => food.plateId !== plateId));
    } else {
      setBalancedPlateFoods(prev => prev.filter(food => food.plateId !== plateId));
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-orange-50">
        {/* Compteur dynamique en haut */}
        <Counter />

        {/* Contenu principal */}
        <div className="container mx-auto px-4 py-8">
          {/* En-tête */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
              <span className="mr-3 animate-bounce-slow">🌱</span>
              Impact Environnemental de Notre Alimentation
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comparez l'impact environnemental entre une assiette standard et une assiette équilibrée.
              Glissez-déposez les aliments pour voir leur empreinte carbone, leur consommation d'eau
              et l'espace agricole nécessaire.
            </p>
          </div>

          {/* Interface principale */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Carte des aliments à gauche */}
            <div className="order-2 lg:order-1">
              <FoodCard
                foods={foods}
                onFoodDragStart={(food) => console.log('Début du drag:', food.name)}
              />
            </div>

            {/* Deux assiettes côte à côte */}
            <div className="order-1 lg:order-2 lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Assiette standard */}
                <div>
                  <Plate
                    plateFoods={standardPlateFoods}
                    onFoodAdded={(food) => handleFoodAdded(food, 'standard')}
                    onFoodRemoved={(foodId) => handleFoodRemoved(foodId, 'standard')}
                    title="Assiette Standard"
                    description="Repas typique avec viande"
                    plateType="standard"
                  />
                </div>

                {/* Assiette équilibrée */}
                <div>
                  <Plate
                    plateFoods={balancedPlateFoods}
                    onFoodAdded={(food) => handleFoodAdded(food, 'balanced')}
                    onFoodRemoved={(foodId) => handleFoodRemoved(foodId, 'balanced')}
                    title="Assiette Équilibrée"
                    description="Repas végétarien ou flexitarien"
                    plateType="balanced"
                  />
                </div>
              </div>

              {/* Comparaison des impacts */}
              {standardPlateFoods.length > 0 && balancedPlateFoods.length > 0 && (
                <div className="mt-8 bg-white rounded-xl shadow-lg p-6 animate-fade-in">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
                    Comparaison des impacts environnementaux
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-100">
                      <h4 className="font-semibold text-orange-800 mb-2">Économie de CO₂</h4>
                      <div className="text-2xl font-bold text-orange-600">
                        {Math.abs(
                          standardPlateFoods.reduce((sum, food) => sum + food.co2, 0) -
                          balancedPlateFoods.reduce((sum, food) => sum + food.co2, 0)
                        ).toFixed(1)} kg
                      </div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <h4 className="font-semibold text-blue-800 mb-2">Économie d'eau</h4>
                      <div className="text-2xl font-bold text-blue-600">
                        {Math.abs(
                          standardPlateFoods.reduce((sum, food) => sum + food.water, 0) -
                          balancedPlateFoods.reduce((sum, food) => sum + food.water, 0)
                        ).toFixed(0)} L
                      </div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
                      <h4 className="font-semibold text-green-800 mb-2">Économie de surface</h4>
                      <div className="text-2xl font-bold text-green-600">
                        {Math.abs(
                          standardPlateFoods.reduce((sum, food) => sum + food.surface, 0) -
                          balancedPlateFoods.reduce((sum, food) => sum + food.surface, 0)
                        ).toFixed(1)} m²
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Informations supplémentaires */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
                <span className="mr-2 animate-pulse-slow">💡</span>
                Le saviez-vous ?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-red-50 rounded-lg border border-red-100">
                  <div className="text-3xl mb-2">🥩</div>
                  <h3 className="font-semibold text-red-800 mb-2">Viande rouge</h3>
                  <p className="text-sm text-red-700">
                    La production de viande de bœuf génère en moyenne 27 kg de CO₂
                    et nécessite plus de 15 000 litres d'eau par kg de viande.
                  </p>
                </div>

                <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                  <div className="text-3xl mb-2">🍗</div>
                  <h3 className="font-semibold text-yellow-800 mb-2">Volaille</h3>
                  <p className="text-sm text-yellow-700">
                    Le poulet a un impact environnemental 4 fois moindre que le bœuf,
                    avec environ 7 kg de CO₂ par kg de viande.
                  </p>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="text-3xl mb-2">🌱</div>
                  <h3 className="font-semibold text-green-800 mb-2">Végétaux</h3>
                  <p className="text-sm text-green-700">
                    Les protéines végétales comme les lentilles ou le tofu ont
                    l'impact environnemental le plus faible.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-16 text-center text-gray-600">
            <p className="text-sm">
              Données basées sur des études scientifiques. L'impact peut varier selon les méthodes de production.
            </p>
          </footer>
        </div>
      </div>
    </DndProvider>
  )
}

export default App
