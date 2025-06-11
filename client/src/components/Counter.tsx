import { useState, useEffect } from 'react';

const Counter: React.FC = () => {
  const [co2Emitted, setCo2Emitted] = useState(0);
  const [startTime] = useState(Date.now());

  // Estimation plus réaliste : environ 20 tonnes de CO₂ par seconde mondiale
  const CO2_PER_SECOND = 20.8;

  useEffect(() => {
    const interval = setInterval(() => {
      const millisecondsElapsed = Date.now() - startTime;
      const secondsElapsed = millisecondsElapsed / 1000;
      setCo2Emitted(secondsElapsed * CO2_PER_SECOND);
    }, 100); // Mise à jour toutes les 100ms pour plus de fluidité

    return () => clearInterval(interval);
  }, [startTime]);

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  return (
    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 shadow-lg">
      <div className="container mx-auto text-center">
        <h2 className="text-lg md:text-xl font-semibold mb-2 flex items-center justify-center">
          <span className="mr-2 animate-bounce-slow">🌍</span>
          Pollution mondiale depuis votre arrivée
        </h2>
        <div className="text-2xl md:text-4xl font-bold">
          <span className="animate-pulse-slow">{formatNumber(Math.round(co2Emitted * 10) / 10)}</span>
          <span className="text-lg md:text-xl ml-2">tonnes de CO₂</span>
        </div>
        <p className="text-sm md:text-base mt-2 opacity-90">
          Générées par la surconsommation de viande dans le monde
        </p>
        <div className="mt-2 text-xs opacity-75">
          (environ {Math.round(CO2_PER_SECOND * 60)} tonnes par minute)
        </div>
      </div>
    </div>
  );
};

export default Counter; 