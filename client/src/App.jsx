import { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuCard from './components/MenuCard';
import ProductNavigation from './components/ProductNavigation';
import Cart from './components/Cart';
import Auth from './components/Auth';
import CheckoutProcess from './components/CheckoutProcess';
import OrderTracking from './components/OrderTracking';
import UserProfile from './components/UserProfile';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { Users, Star, Clock, Award } from 'lucide-react';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  // cargar productos del menu (datos de prueba)
  useEffect(() => {
    // productos del restaurante
    const menuItems = [
      { id: 1, name: 'Empanadas Criollas', description: 'Empanadas de carne cortada a cuchillo', price: 2500, category: 'entradas', image: '/images/empanadas.jpg' },
      { id: 2, name: 'Provoleta', description: 'Queso provolone a la parrilla con oregano', price: 3200, category: 'entradas', image: '/images/provoleta.jpg' },
      { id: 3, name: 'Bife de Chorizo', description: 'Bife de chorizo de 400g con guarnición', price: 8500, category: 'platos-principales', image: '/images/bife.jpg' },
      { id: 4, name: 'Milanesa Napolitana', description: 'Milanesa con jamón, queso y salsa', price: 6800, category: 'platos-principales', image: '/images/milanesa.jpg' },
      { id: 5, name: 'Pasta Bolognesa', description: 'Fideos con salsa bolognesa casera', price: 5200, category: 'platos-principales', image: '/images/pasta.jpg' },
      { id: 6, name: 'Flan Casero', description: 'Flan casero con dulce de leche', price: 2800, category: 'postres', image: '/images/flan.jpg' },
      { id: 7, name: 'Tiramisu', description: 'Tiramisu italiano tradicional', price: 3500, category: 'postres', image: '/images/tiramisu.jpg' },
      { id: 8, name: 'Coca Cola', description: 'Gaseosa Coca Cola 500ml', price: 1200, category: 'bebidas', image: '/images/coca.jpg' },
      { id: 9, name: 'Agua Mineral', description: 'Agua mineral sin gas 500ml', price: 800, category: 'bebidas', image: '/images/agua.jpg' },
      { id: 10, name: 'Vino Tinto', description: 'Copa de vino tinto de la casa', price: 2200, category: 'bebidas', image: '/images/vino.jpg' }
    ];
    setProducts(menuItems);
  }, []);

  // filtrar productos por categoria
  let filteredItems = selectedCategory === 'todos' 
    ? products 
    : products.filter(item => item.category === selectedCategory);

  // filtrar por busqueda
  if (searchTerm) {
    filteredItems = filteredItems.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  // ordenar por precio
  if (sortBy === 'price-asc') {
    filteredItems = [...filteredItems].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filteredItems = [...filteredItems].sort((a, b) => b.price - a.price);
  }

  const stats = [
    { icon: Users, value: '10K+', label: 'Clientes Felices' },
    { icon: Star, value: '4.9', label: 'Calificación' },
    { icon: Clock, value: '30min', label: 'Entrega Rápida' },
    { icon: Award, value: '5', label: 'Años de Experiencia' }
  ];

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setIsProfileOpen(false);
  };

  // manejar proceso de checkout
  const handleCheckout = () => {
    setIsCartOpen(false); // cerrar carrito
    if (user) {
      setIsCheckoutOpen(true);
    } else {
      // si no esta logueado, mostrar login
      setIsAuthOpen(true);
    }
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };
  
  const handleSort = (sortValue) => {
    setSortBy(sortValue);
  };

  return (
    <UserProvider>
      <CartProvider>
      <div>
        <Header 
          onCartClick={() => setIsCartOpen(true)}
          onAuthClick={() => setIsAuthOpen(true)}
          onProfileClick={() => setIsProfileOpen(true)}
          user={user}
        />
        <Hero onTrackingClick={() => setIsTrackingOpen(true)} />
        
        <section className="py-20 bg-white relative overflow-hidden">
          {/* Elementos decorativos */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 text-6xl animate-pulse">🎆</div>
            <div className="absolute bottom-10 right-10 text-6xl animate-pulse">✨</div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-gray-800 mb-4">
                Nuestros <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Números</span>
              </h2>
              <p className="text-xl text-gray-600">Cifras que hablan por sí solas</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div 
                    key={index} 
                    className="group text-center p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl hover:from-orange-100 hover:to-red-100 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl border border-orange-100"
                  >
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <IconComponent size={28} className="text-white" />
                    </div>
                    <div className="text-4xl font-black text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        
        <ProductNavigation 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onSort={handleSort}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
        
        <main className="container mx-auto px-4 py-8" id="menu">
          <h2 className="text-3xl font-bold text-center mb-8">Nuestro Menú</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <MenuCard key={item.id} item={item} />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No se encontraron productos</p>
              </div>
            )}
          </div>
          
          <section id="about" className="mt-20 text-center bg-gradient-to-br from-white to-orange-50 rounded-3xl p-12 shadow-lg">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award size={16} />
              Nuestra Historia
            </div>
            
            <h2 className="text-4xl font-black mb-8">
              Acerca de <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Nosotros</span>
            </h2>
            
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6 text-left">
                <p className="text-lg text-gray-700 leading-relaxed">
                  En <strong className="text-orange-600">WORCHI - FOOD</strong> creemos que la comida es mucho más que solo nutrición: 
                  es una experiencia que conecta a las personas y crea momentos únicos e inolvidables.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Nuestro equipo de chefs experimentados selecciona cuidadosamente cada ingrediente, 
                  combinando técnicas culinarias tradicionales con toques modernos para crear platos realmente excepcionales.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="text-center p-4 bg-white rounded-xl shadow-md">
                    <div className="text-3xl font-bold text-orange-600">5+</div>
                    <div className="text-sm text-gray-600">Años de Experiencia</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-md">
                    <div className="text-3xl font-bold text-orange-600">10K+</div>
                    <div className="text-sm text-gray-600">Clientes Felices</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-8 text-white text-center transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="text-6xl mb-4">🍽️</div>
                  <h3 className="text-2xl font-bold mb-2">Nuestra Misión</h3>
                  <p className="text-orange-100">
                    Brindar experiencias gastronómicas únicas que despierten todos los sentidos y creen recuerdos inolvidables.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Testimonials />
        <Footer />
        
        <Cart 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)}
          onCheckout={handleCheckout}
          user={user}
        />
        
        <Auth 
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLogin={handleLogin}
        />
        
        <CheckoutProcess 
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          user={user}
        />
        
        <OrderTracking 
          isOpen={isTrackingOpen}
          onClose={() => setIsTrackingOpen(false)}
        />
        
        <UserProfile 
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={user}
          onLogout={handleLogout}
        />
      </div>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
