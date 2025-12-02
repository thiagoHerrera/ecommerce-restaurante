import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Users } from 'lucide-react';

const DinersSelector = () => {
  const { dinersCount, setDiners, getMaxItems, getTotalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleDinersChange = (count) => {
    setDiners(count);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
      >
        <Users size={20} />
        <span>{dinersCount} {dinersCount === 1 ? 'Comensal' : 'Comensales'}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 bg-white rounded-lg shadow-lg border p-4 z-50 min-w-[200px]">
          <h3 className="font-semibold mb-3">Número de comensales</h3>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4, 5, 6].map(count => (
              <button
                key={count}
                onClick={() => handleDinersChange(count)}
                className={`p-2 rounded border text-center hover:bg-orange-50 ${
                  dinersCount === count ? 'bg-orange-100 border-orange-500' : 'border-gray-300'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
          <div className="mt-3 text-sm text-gray-600">
            <p>Límite: {getMaxItems()} artículos</p>
            <p>Actual: {getTotalItems()} artículos</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DinersSelector;