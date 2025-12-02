import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const ProductSort = ({ onSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('default');

  const sortOptions = [
    { value: 'default', label: 'Ordenar por' },
    { value: 'price-asc', label: 'Precio: Menor a Mayor' },
    { value: 'price-desc', label: 'Precio: Mayor a Menor' }
  ];

  const handleSort = (value) => {
    setSelectedSort(value);
    setIsOpen(false);
    onSort(value);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50"
      >
        <span>{sortOptions.find(opt => opt.value === selectedSort)?.label}</span>
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-full">
          {sortOptions.map(option => (
            <button
              key={option.value}
              onClick={() => handleSort(option.value)}
              className="block w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductSort;