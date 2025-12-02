import { ArrowDown, Clock, MapPin, Phone, Star, Utensils } from 'lucide-react';

const Hero = ({ onTrackingClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fondo con gradiente animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-pink-700"></div>
      
      {/* Patron de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 text-8xl animate-pulse">🍕</div>
        <div className="absolute top-40 right-20 text-6xl animate-pulse">🍔</div>
        <div className="absolute bottom-40 left-1/4 text-7xl animate-pulse">🍽️</div>
        <div className="absolute bottom-20 right-10 text-5xl animate-pulse">🍹</div>
        <div className="absolute top-1/2 left-10 text-4xl animate-pulse">✨</div>
        <div className="absolute top-1/3 right-1/4 text-6xl animate-pulse">🍾</div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10 text-white">
        {/* Badge superior */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
          <Star className="text-yellow-300" size={20} fill="currentColor" />
          <span className="text-sm font-medium">Restaurante #1 en la Ciudad</span>
          <Star className="text-yellow-300" size={20} fill="currentColor" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-6">
          <span className="bg-gradient-to-r from-yellow-300 to-orange-200 bg-clip-text text-transparent">
            WORCHI
          </span>
          <br />
          <span className="text-4xl md:text-5xl font-light">FOOD</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-95 leading-relaxed">
          🍽️ <strong>Sabores auténticos</strong> que despiertan tus sentidos. 
          <br className="hidden md:block" />
          Pedí desde tu mesa y viví la <em>mejor experiencia gastronómica</em>.
        </p>
        
        {/* Botones principales */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <a 
            href="#menu" 
            className="group bg-white text-orange-600 px-10 py-5 rounded-full font-bold text-xl hover:bg-yellow-50 transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-orange-500/25 flex items-center gap-3"
          >
            <Utensils size={24} className="group-hover:rotate-12 transition-transform" />
            Ver Menú Completo
          </a>
          <button 
            onClick={onTrackingClick}
            className="bg-transparent border-2 border-white text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white hover:text-orange-600 transition-all duration-500 transform hover:scale-105 backdrop-blur-sm"
          >
            📍 Seguir mi Pedido
          </button>
        </div>
        
        {/* Cards de información */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="group bg-white/15 backdrop-blur-md rounded-2xl p-6 hover:bg-white/25 transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
            <Clock className="text-yellow-300 mx-auto mb-4 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="font-bold text-lg mb-2">Horarios</h3>
            <p className="text-white/80">Lunes a Domingo</p>
            <p className="text-yellow-300 font-semibold">11:00 - 23:00</p>
          </div>
          
          <div className="group bg-white/15 backdrop-blur-md rounded-2xl p-6 hover:bg-white/25 transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
            <MapPin className="text-yellow-300 mx-auto mb-4 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="font-bold text-lg mb-2">Ubicación</h3>
            <p className="text-white/80">Centro de la Ciudad</p>
            <p className="text-yellow-300 font-semibold">Zona Gastronómica</p>
          </div>
          
          <div className="group bg-white/15 backdrop-blur-md rounded-2xl p-6 hover:bg-white/25 transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
            <Phone className="text-yellow-300 mx-auto mb-4 group-hover:scale-110 transition-transform" size={32} />
            <h3 className="font-bold text-lg mb-2">Contacto</h3>
            <p className="text-white/80">Reservas y Consultas</p>
            <p className="text-yellow-300 font-semibold">+54 11 1234-5678</p>
          </div>
        </div>
        
        {/* Indicador de scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <ArrowDown size={24} className="text-white" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;