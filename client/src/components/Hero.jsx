const Hero = ({ onTrackingClick }) => {
  return (
    <section className="hero">
      <div className="container">
        <h1>Bienvenido a Worchi Food</h1>
        <p>Descubre sabores extraordinarios preparados con pasión. La mejor experiencia gastronómica te espera.</p>
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
          <a href="#menu" className="btn-primary">🍽️ Explorar Menú</a>
          <button onClick={onTrackingClick} className="btn-primary" style={{background: 'rgba(255,255,255,0.2)', color: 'white', border: '2px solid white'}}>
            📱 Seguir Pedido
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;