import { Star, Quote, Heart, ThumbsUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: "María González",
      role: "Cliente Frecuente",
      rating: 5,
      comment: "¡Increíble experiencia! La comida estaba deliciosa y el servicio fue excepcional. Definitivamente volveré. Los sabores me transportaron a mi infancia.",
      avatar: "👩🦱",
      location: "Buenos Aires",
      verified: true
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      role: "Food Blogger",
      rating: 5,
      comment: "El mejor restaurante de la ciudad. Los sabores son auténticos y la presentación es espectacular. Una experiencia gastronómica única.",
      avatar: "👨💼",
      location: "Córdoba",
      verified: true
    },
    {
      id: 3,
      name: "Ana Martínez",
      role: "Estudiante",
      rating: 5,
      comment: "Pedí delivery y llegó súper rápido y caliente. La app es muy fácil de usar. ¡Recomendado al 100%! Precios justos y porciones generosas.",
      avatar: "👩🎓",
      location: "Rosario",
      verified: true
    },
    {
      id: 4,
      name: "Diego Fernández",
      role: "Chef Profesional",
      rating: 5,
      comment: "Como chef, puedo decir que la calidad de los ingredientes y la técnica culinaria son excepcionales. Felicitaciones al equipo.",
      avatar: "👨🍳",
      location: "Mendoza",
      verified: true
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-6xl animate-pulse">⭐</div>
        <div className="absolute top-40 right-20 text-4xl animate-pulse">💖</div>
        <div className="absolute bottom-20 left-1/4 text-5xl animate-pulse">👏</div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Heart size={16} className="fill-current" />
            +10,000 clientes felices
          </div>
          
          <h2 className="text-5xl font-black text-gray-800 mb-6">
            Lo que dicen nuestros
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"> clientes</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Miles de clientes satisfechos han probado nuestros platos. 
            Descubre por qué somos el restaurante favorito de la ciudad.
          </p>
        </div>
        
        {/* Testimonial destacado */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-orange-100 relative overflow-hidden">
            <Quote className="absolute top-6 right-6 text-orange-200" size={48} />
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-4xl shadow-lg">
                  {testimonials[currentTestimonial].avatar}
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start gap-1 mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-xl text-gray-700 italic leading-relaxed mb-6">
                  "{testimonials[currentTestimonial].comment}"
                </p>
                
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-orange-600 font-medium">
                      {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].location}
                    </p>
                  </div>
                  {testimonials[currentTestimonial].verified && (
                    <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <ThumbsUp size={12} />
                      Verificado
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Indicadores */}
        <div className="flex justify-center gap-3 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial 
                  ? 'bg-orange-500 w-8' 
                  : 'bg-orange-200 hover:bg-orange-300'
              }`}
            />
          ))}
        </div>
        
        {/* Grid de testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-orange-50"
            >
              <div className="flex items-center mb-4">
                <div className="text-3xl mr-4 group-hover:scale-110 transition-transform">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-orange-600">{testimonial.role}</p>
                  <div className="flex gap-1 mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed text-sm">
                "{testimonial.comment.substring(0, 120)}..."
              </p>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-gray-500">{testimonial.location}</span>
                {testimonial.verified && (
                  <div className="text-green-500 text-xs flex items-center gap-1">
                    <ThumbsUp size={10} />
                    Verificado
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;