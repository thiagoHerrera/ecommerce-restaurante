import { useState } from 'react';
import { X, User, Mail, Lock } from 'lucide-react';

const Auth = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de login/registro
    const user = {
      id: 1,
      name: formData.name || 'Usuario',
      email: formData.email
    };
    onLogin(user);
    onClose();
  };

  return (
    <div className="cart-overlay">
      <div className="auth-modal">
        <div className="cart-header">
          <h2 className="cart-title">{isLogin ? '🔐 Iniciar Sesión' : '📝 Registrarse'}</h2>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <User size={20} />
              <input
                type="text"
                placeholder="Nombre completo"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <Mail size={20} />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <Lock size={20} />
            <input
              type="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <button type="submit" className="checkout-btn">
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>

          <p className="auth-switch">
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button type="button" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;