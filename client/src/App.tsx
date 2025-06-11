import { useState } from 'react'
import type { Food, PlateFood } from './types'
import { foods } from './data/foods'
import Counter from './components/Counter'
import FoodCard from './components/FoodCard'
import Plate from './components/Plate'


function App() {
  const [plateFoods, setPlateFoods] = useState<PlateFood[]>([])

  const handleFoodAdded = (food: Food) => {
    const plateFood: PlateFood = {
      ...food,
      plateId: `${food.id}-${Date.now()}-${Math.random()}`
    }
    setPlateFoods(prev => [...prev, plateFood])
  }

  const handleFoodRemoved = (plateId: string) => {
    setPlateFoods(prev => prev.filter(food => food.plateId !== plateId))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-amber-50 to-orange-50">
      {/* Compteur dynamique en haut */}
      <Counter />

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            🌱 Impact Environnemental de Notre Alimentation
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez l'impact environnemental de vos choix alimentaires en créant votre repas.
            Glissez-déposez les aliments pour voir leur empreinte carbone, leur consommation d'eau
            et l'espace agricole nécessaire.
          </p>
        </div>

        {/* Interface principale */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Carte des aliments à gauche */}
          <div className="order-2 lg:order-1">
            <FoodCard
              foods={foods}
              onFoodDragStart={(food) => console.log('Début du drag:', food.name)}
            />
          </div>

          {/* Assiette à droite */}
          <div className="order-1 lg:order-2">
            <Plate
              plateFoods={plateFoods}
              onFoodAdded={handleFoodAdded}
              onFoodRemoved={handleFoodRemoved}
            />
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              💡 Le saviez-vous ?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-3xl mb-2">🥩</div>
                <h3 className="font-semibold text-red-800 mb-2">Viande rouge</h3>
                <p className="text-sm text-red-700">
                  La production de viande de bœuf génère en moyenne 27 kg de CO₂
                  et nécessite plus de 15 000 litres d'eau par kg de viande.
                </p>
              </div>

              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-3xl mb-2">🍗</div>
                <h3 className="font-semibold text-yellow-800 mb-2">Volaille</h3>
                <p className="text-sm text-yellow-700">
                  Le poulet a un impact environnemental 4 fois moindre que le bœuf,
                  avec environ 7 kg de CO₂ par kg de viande.
                </p>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
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
  )
}

export default App
