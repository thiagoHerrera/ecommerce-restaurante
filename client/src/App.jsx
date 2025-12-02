import { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuCard from './components/MenuCard';
import ProductNavigation from './components/ProductNavigation';
import Cart from './components/Cart';
import Auth from './components/Auth';
import CheckoutProcess from './components/CheckoutProcess';
import OrderTracking from './components/OrderTracking';
import UserProfile from './components/UserProfile';
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
    <CartProvider>
      <div>
        <Header 
          onCartClick={() => setIsCartOpen(true)}
          onAuthClick={() => setIsAuthOpen(true)}
          onProfileClick={() => setIsProfileOpen(true)}
          user={user}
        />
        <Hero onTrackingClick={() => setIsTrackingOpen(true)} />
        
        <section className="stats">
          <div className="container">
            <div className="stats-grid">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="stat-item">
                    <IconComponent size={32} style={{color: '#ea580c', marginBottom: '1rem'}} />
                    <div className="stat-value">{stat.value}</div>
                    <div>{stat.label}</div>
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
          
          <section id="about" className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-6">Acerca de Nosotros</h2>
            <div className="max-w-2xl mx-auto space-y-4 text-gray-600">
              <p>
                En <strong className="text-orange-600">WORCHI - FOOD</strong> creemos que la comida es mucho más que solo nutrición: 
                es una experiencia que conecta a las personas y crea momentos únicos e inolvidables.
              </p>
              <p>
                Nuestro equipo de chefs experimentados selecciona cuidadosamente cada ingrediente, 
                combinando técnicas culinarias tradicionales con toques modernos para crear platos realmente excepcionales.
              </p>
            </div>
          </section>
        </main>
        
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
  );
}

export default App;
