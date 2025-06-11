import { useState, useEffect } from 'react';

const Counter: React.FC = () => {
  const [co2Emitted, setCo2Emitted] = useState(0);
  const [startTime] = useState(Date.now());

  // Données FAO 2023 : 6.2 Gt/an = 11 800 tonnes/minute
  const CO2_PER_SECOND = 11800 / 60; // tonnes par seconde

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
          Émissions liées à la production animale depuis votre arrivée
        </h2>
        <div className="text-2xl md:text-4xl font-bold">
          <span className="animate-pulse-slow">{formatNumber(Math.round(co2Emitted * 10) / 10)}</span>
          <span className="text-lg md:text-xl ml-2">tonnes de CO₂</span>
        </div>
        <div className="mt-2 text-xs opacity-75">
          (11 800 tonnes par minute)
        </div>
      </div>
    </div>
  );
};

export default Counter; 