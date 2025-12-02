import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

// tarjeta de producto del menu
const MenuCard = ({ item }) => {
  const { addItem, canAddMore, getTotalItems, getMaxItems } = useCart();

  // agregar producto al carrito
  const handleAddToCart = () => {
    if (canAddMore()) {
      addItem(item);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={item.image || '/placeholder-food.jpg'} 
        alt={item.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-orange-600">${item.price}</span>
          <button 
            onClick={handleAddToCart} 
            disabled={!canAddMore()}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              canAddMore() 
                ? 'bg-orange-500 text-white hover:bg-orange-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            title={!canAddMore() ? `Limite alcanzado (${getTotalItems()}/${getMaxItems()})` : ''}
          >
            <Plus size={16} className="inline mr-1" /> 
            {canAddMore() ? 'Agregar' : 'Limite Alcanzado'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;