import { useState } from 'react';
import { X, User, MapPin, Clock, Heart } from 'lucide-react';

const UserProfile = ({ isOpen, onClose, user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('orders');

  if (!isOpen) return null;

  const mockOrders = [
    { id: 1, date: '2024-01-15', total: 25.99, status: 'entregado', items: 3 },
    { id: 2, date: '2024-01-10', total: 18.50, status: 'entregado', items: 2 },
  ];

  const mockFavorites = [
    { id: 1, name: 'Pizza Margherita', price: 15.99 },
    { id: 2, name: 'Hamburguesa Clásica', price: 12.99 },
  ];

  return (
    <div className="cart-overlay">
      <div className="profile-modal">
        <div className="cart-header">
          <h2 className="cart-title">👤 Mi Perfil</h2>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="profile-content">
          <div className="profile-info">
            <div className="user-avatar">
              <User size={40} />
            </div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>

          <div className="profile-tabs">
            <button 
              className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <Clock size={16} /> Pedidos
            </button>
            <button 
              className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
              onClick={() => setActiveTab('favorites')}
            >
              <Heart size={16} /> Favoritos
            </button>
            <button 
              className={`tab-btn ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
            >
              <MapPin size={16} /> Direcciones
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'orders' && (
              <div className="orders-list">
                <h4>📋 Historial de Pedidos</h4>
                {mockOrders.map(order => (
                  <div key={order.id} className="order-item">
                    <div>
                      <p><strong>Pedido #{order.id}</strong></p>
                      <p>{order.date} - {order.items} productos</p>
                    </div>
                    <div>
                      <p>${order.total}</p>
                      <span className={`status ${order.status}`}>{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="favorites-list">
                <h4>❤️ Platos Favoritos</h4>
                {mockFavorites.map(item => (
                  <div key={item.id} className="favorite-item">
                    <span>{item.name}</span>
                    <span>${item.price}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="addresses-list">
                <h4>📍 Mis Direcciones</h4>
                <div className="address-item">
                  <p><strong>Casa</strong></p>
                  <p>Calle Principal 123, Ciudad</p>
                </div>
                <button className="add-address-btn">+ Agregar Dirección</button>
              </div>
            )}
          </div>

          <button onClick={onLogout} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;