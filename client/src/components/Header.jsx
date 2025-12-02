import { ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import DinersSelector from './DinersSelector';

// header de la aplicacion
const Header = ({ onCartClick, onAuthClick, onProfileClick, user }) => {
  const { getTotalItems } = useCart();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* logo */}
          <div className="text-2xl font-bold text-orange-600">🍽️ WORCHI - FOOD</div>
          
          <div className="flex items-center gap-4">
            {/* selector comensales */}
            <DinersSelector />
            
            {/* boton usuario */}
            {user ? (
              <button onClick={onProfileClick} className="p-2 hover:bg-gray-100 rounded-full" title={user.name}>
                <User size={20} />
              </button>
            ) : (
              <button onClick={onAuthClick} className="p-2 hover:bg-gray-100 rounded-full" title="Iniciar sesión">
                <User size={20} />
              </button>
            )}
            
            {/* carrito */}
            <button onClick={onCartClick} className="relative p-2 hover:bg-gray-100 rounded-full">
              <ShoppingCart size={24} className="text-orange-600" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;