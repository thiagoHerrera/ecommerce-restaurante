const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🍽️ Worchi Food</h3>
            <p>Los mejores sabores de la ciudad, preparados con ingredientes frescos y amor.</p>
          </div>
          
          <div className="footer-section">
            <h3>Contacto</h3>
            <p>📍 Calle Principal 123</p>
            <p>📞 +1 234 567 8900</p>
            <p>✉️ info@worchifood.com</p>
          </div>
          
          <div className="footer-section">
            <h3>Horarios</h3>
            <p>Lun - Vie: 11:00 - 22:00</p>
            <p>Sáb - Dom: 12:00 - 23:00</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Worchi Food. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;