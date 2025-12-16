import { ShoppingCart, User, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import DinersSelector from '../DinersSelector';
import { useState, useEffect } from 'react';


const Header = ({ onCartClick, onAuthClick, onProfileClick, user }) => {
  const { getTotalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-xl border-b border-orange-100' 
        : 'bg-white/90 backdrop-blur-sm shadow-lg'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">

          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="text-3xl group-hover:scale-110 transition-transform duration-300">🍽️</div>
              <Sparkles className="absolute -top-1 -right-1 text-yellow-400 w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                WORCHI
              </h1>
              <p className="text-xs text-gray-500 font-medium -mt-1">FOOD EXPERIENCE</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">

            <div className="hidden md:block">
              <DinersSelector />
            </div>
            

            {user ? (
              <button 
                onClick={onProfileClick} 
                className="group relative p-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-orange-500/25" 
                title={user.name}
              >
                <User size={20} className="group-hover:rotate-12 transition-transform" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </button>
            ) : (
              <button 
                onClick={onAuthClick} 
                className="group p-3 bg-gray-100 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 text-gray-600 hover:text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg" 
                title="Iniciar sesión"
              >
                <User size={20} className="group-hover:rotate-12 transition-transform" />
              </button>
            )}
            

            <button 
              onClick={onCartClick} 
              className="group relative p-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-orange-500/25"
            >
              <ShoppingCart size={24} className="group-hover:rotate-12 transition-transform" />
              {getTotalItems() > 0 && (
                <>
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-orange-800 text-xs font-bold rounded-full h-7 w-7 flex items-center justify-center animate-bounce border-2 border-white shadow-lg">
                    {getTotalItems()}
                  </span>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      

      <div className={`h-1 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500 ${
        isScrolled ? 'opacity-100' : 'opacity-0'
      }`}></div>
    </header>
  );
};

export default Header;