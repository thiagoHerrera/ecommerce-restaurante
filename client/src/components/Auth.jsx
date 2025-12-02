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
    console.log('Login attempt:', formData);
    
    if (isLogin) {
      if (formData.email === 'admin@worchi-food.com' && formData.password === 'admin123') {
        const user = {
          id: 1,
          name: 'Administrador',
          email: 'admin@worchi-food.com',
          role: 'admin'
        };
        console.log('Login successful');
        onLogin(user);
        onClose();
      } else {
        alert('Credenciales incorrectas. Usa: admin@worchi-food.com / admin123');
      }
    } else {
      const user = {
        id: Date.now(),
        name: formData.name || 'Usuario',
        email: formData.email,
        role: 'customer'
      };
      console.log('Registration successful');
      onLogin(user);
      onClose();
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
            {isLogin ? '🔐 Iniciar Sesión' : '📝 Registrarse'}
          </h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px',
              borderRadius: '50%',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          {!isLogin && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              border: '1px solid #d1d5db',
              borderRadius: '12px',
              marginBottom: '16px'
            }}>
              <User size={20} style={{ color: '#9ca3af' }} />
              <input
                type="text"
                placeholder="Nombre completo"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '16px'
                }}
              />
            </div>
          )}
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            border: '1px solid #d1d5db',
            borderRadius: '12px',
            marginBottom: '16px'
          }}>
            <Mail size={20} style={{ color: '#9ca3af' }} />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '16px'
              }}
              required
            />
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            border: '1px solid #d1d5db',
            borderRadius: '12px',
            marginBottom: '24px'
          }}>
            <Lock size={20} style={{ color: '#9ca3af' }} />
            <input
              type="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '16px'
              }}
              required
            />
          </div>

          <button 
            type="submit"
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #f97316, #dc2626)',
              color: 'white',
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '16px'
            }}
          >
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>

          <p style={{ textAlign: 'center', color: '#6b7280', margin: 0 }}>
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button 
              type="button" 
              onClick={() => setIsLogin(!isLogin)}
              style={{
                background: 'none',
                border: 'none',
                color: '#ea580c',
                fontWeight: '600',
                cursor: 'pointer',
                marginLeft: '8px'
              }}
            >
              {isLogin ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;