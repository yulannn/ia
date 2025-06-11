import { useState, useEffect } from 'react';

const Counter: React.FC = () => {
  const [co2Emitted, setCo2Emitted] = useState(0);
  const [startTime] = useState(Date.now());

  // 18 000 tonnes de CO₂ par minute = 300 tonnes par seconde
  const CO2_PER_SECOND = 300;

  useEffect(() => {
    const interval = setInterval(() => {
      const secondsElapsed = Math.floor((Date.now() - startTime) / 1000);
      setCo2Emitted(secondsElapsed * CO2_PER_SECOND);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  return (
    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 shadow-lg">
      <div className="container mx-auto text-center">
        <h2 className="text-lg md:text-xl font-semibold mb-2">
          🌍 Pollution mondiale depuis votre arrivée
        </h2>
        <div className="text-2xl md:text-4xl font-bold">
          <span className="animate-pulse">{formatNumber(co2Emitted)}</span>
          <span className="text-lg md:text-xl ml-2">tonnes de CO₂</span>
        </div>
        <p className="text-sm md:text-base mt-2 opacity-90">
          Générées par la surconsommation de viande dans le monde
        </p>
      </div>
    </div>
  );
};

export default Counter; 