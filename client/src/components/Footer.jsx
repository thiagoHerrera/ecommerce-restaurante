import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Patron de fondo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-6xl">🍽️</div>
        <div className="absolute top-20 right-20 text-4xl">🍔</div>
        <div className="absolute bottom-20 left-1/4 text-5xl">🍕</div>
        <div className="absolute bottom-10 right-10 text-3xl">🍹</div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo y descripción */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">🍽️</div>
              <div>
                <h3 className="text-3xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  WORCHI FOOD
                </h3>
                <p className="text-sm text-gray-400">Experiencia Gastronómica Única</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Los mejores sabores de la ciudad, preparados con ingredientes frescos y mucho amor. 
              Una experiencia culinaria que despierta todos tus sentidos.
            </p>
            
            {/* Redes sociales */}
            <div className="flex gap-4">
              <a href="#" className="group p-3 bg-white/10 rounded-full hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 transition-all duration-300 transform hover:scale-110">
                <Instagram size={20} className="group-hover:rotate-12 transition-transform" />
              </a>
              <a href="#" className="group p-3 bg-white/10 rounded-full hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 transition-all duration-300 transform hover:scale-110">
                <Facebook size={20} className="group-hover:rotate-12 transition-transform" />
              </a>
              <a href="#" className="group p-3 bg-white/10 rounded-full hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500 transition-all duration-300 transform hover:scale-110">
                <Twitter size={20} className="group-hover:rotate-12 transition-transform" />
              </a>
            </div>
          </div>
          
          {/* Contacto */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-orange-400">Contacto</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 group">
                <MapPin size={18} className="text-orange-400 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-gray-300">Calle Principal 123</p>
                  <p className="text-sm text-gray-400">Centro, Ciudad</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 group">
                <Phone size={18} className="text-orange-400 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-gray-300">+54 11 1234-5678</p>
                  <p className="text-sm text-gray-400">Reservas y consultas</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 group">
                <Mail size={18} className="text-orange-400 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-gray-300">info@worchifood.com</p>
                  <p className="text-sm text-gray-400">Atención al cliente</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Horarios */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-orange-400">Horarios</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-orange-400" />
                <div>
                  <p className="text-gray-300 font-medium">Lunes a Viernes</p>
                  <p className="text-sm text-gray-400">11:00 - 22:00</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-orange-400" />
                <div>
                  <p className="text-gray-300 font-medium">Fines de Semana</p>
                  <p className="text-sm text-gray-400">12:00 - 23:00</p>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">Abierto ahora</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Separador */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm flex items-center gap-2">
              &copy; 2024 Worchi Food. Hecho con 
              <Heart size={16} className="text-red-400 fill-current animate-pulse" /> 
              para los amantes de la buena comida.
            </p>
            
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-orange-400 transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Términos de Uso</a>
              <a href="#" className="hover:text-orange-400 transition-colors">Ayuda</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Efecto de brillo en el borde superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
    </footer>
  );
};

export default Footer;