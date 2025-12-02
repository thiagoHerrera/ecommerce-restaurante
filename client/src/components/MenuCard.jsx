import { Plus, Star, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

// tarjeta de producto del menu
const MenuCard = ({ item }) => {
  const { addItem, canAddMore, getTotalItems, getMaxItems } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isFav, setIsFav] = useState(false);

  // Cargar favoritos del localStorage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFav(favorites.some(fav => fav.id === item.id));
  }, [item.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFav) {
      // quitar de favoritos
      const newFavorites = favorites.filter(fav => fav.id !== item.id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFav(false);
      alert('❌ Quitado de favoritos');
    } else {
      // agregar a favoritos
      const newFavorites = [...favorites, item];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFav(true);
      alert('❤️ Agregado a favoritos');
    }
  };

  // agregar producto al carrito
  const handleAddToCart = () => {
    if (canAddMore()) {
      addItem(item);
    }
  };

  return (
    <div 
      className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo del producto */}
      <div className="relative overflow-hidden">
        <div className={`w-full h-56 bg-gradient-to-br from-orange-400 to-red-500 flex flex-col items-center justify-center text-white transition-transform duration-700 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}>
          <div className="text-6xl mb-2">🍽️</div>
          <div className="text-2xl font-black">WORCHI</div>
          <div className="text-sm font-light opacity-80">FOOD</div>
        </div>
        
        {/* Badge de precio */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg">
          ${item.price}
        </div>
        
        {/* Botón de favorito */}
        <div 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
            if (isFav) {
              localStorage.setItem('favorites', JSON.stringify(favs.filter(f => f.id !== item.id)));
              setIsFav(false);
            } else {
              localStorage.setItem('favorites', JSON.stringify([...favs, item]));
              setIsFav(true);
            }
          }}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            padding: '8px',
            borderRadius: '50%',
            cursor: 'pointer',
            backgroundColor: isFav ? '#ef4444' : 'rgba(255,255,255,0.9)',
            color: isFav ? 'white' : '#6b7280',
            zIndex: 10
          }}
        >
          <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
        </div>
        
        {/* Overlay con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={`${
                i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`} 
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">(4.8)</span>
        </div>
        
        <h3 className="font-bold text-xl mb-3 text-gray-800 group-hover:text-orange-600 transition-colors">
          {item.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-2">
          {item.description}
        </p>
        
        {/* Botón de agregar */}
        <button 
          onClick={handleAddToCart} 
          disabled={!canAddMore()}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
            canAddMore() 
              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
          title={!canAddMore() ? `Límite alcanzado (${getTotalItems()}/${getMaxItems()})` : ''}
        >
          <Plus size={20} className={canAddMore() ? 'group-hover:rotate-90 transition-transform' : ''} /> 
          {canAddMore() ? 'Agregar al Carrito' : 'Límite Alcanzado'}
        </button>
        
        {/* Indicador de disponibilidad */}
        <div className="flex items-center justify-center mt-3 gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-600 font-medium">Disponible ahora</span>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;