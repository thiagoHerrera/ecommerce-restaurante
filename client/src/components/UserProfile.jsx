import { X, User, Mail, MapPin, Phone, Calendar, Settings, LogOut, ShoppingBag, Heart, Star, Edit } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';

const UserProfile = ({ isOpen, onClose, user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [favorites, setFavorites] = useState([]);
  const { userProfile, updatePhone, addToFavorites, isFavorite } = useUser();
  
  // Cargar favoritos cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      const favs = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(favs);
    }
  }, [isOpen, activeTab]);

  if (!isOpen || !user) return null;

  const handlePhoneUpdate = () => {
    if (phoneInput.trim()) {
      updatePhone(phoneInput);
      setIsEditingPhone(false);
    }
  };

  const handleFavoriteToggle = (product) => {
    addToFavorites(product);
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
          borderRadius: '20px',
          width: '100%',
          maxWidth: '600px',
          maxHeight: '90vh',
          overflow: 'hidden',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #f97316, #dc2626)',
          color: 'white',
          padding: '24px',
          position: 'relative'
        }}>
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              padding: '8px',
              cursor: 'pointer',
              color: 'white'
            }}
          >
            <X size={20} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px'
            }}>
              👤
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>
                {user.name}
              </h2>
              <p style={{ margin: '4px 0 0 0', opacity: 0.9, fontSize: '16px' }}>
                {user.email}
              </p>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(255,255,255,0.2)',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                marginTop: '8px'
              }}>
                <Star size={12} fill="currentColor" />
                {user.role === 'admin' ? 'Administrador' : 'Cliente VIP'}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#f9fafb'
        }}>
          {[
            { id: 'profile', label: 'Perfil', icon: User },
            { id: 'orders', label: 'Pedidos', icon: ShoppingBag },
            { id: 'favorites', label: 'Favoritos', icon: Heart }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: '16px',
                  border: 'none',
                  background: activeTab === tab.id ? 'white' : 'transparent',
                  color: activeTab === tab.id ? '#ea580c' : '#6b7280',
                  fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  borderBottom: activeTab === tab.id ? '2px solid #ea580c' : 'none'
                }}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div style={{ padding: '24px', maxHeight: '400px', overflowY: 'auto' }}>
          {activeTab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderRadius: '12px'
              }}>
                <Mail size={20} style={{ color: '#ea580c' }} />
                <div>
                  <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>Email</p>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{user.email}</p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderRadius: '12px'
              }}>
                <Calendar size={20} style={{ color: '#ea580c' }} />
                <div>
                  <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>Miembro desde</p>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>Enero 2024</p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderRadius: '12px'
              }}>
                <MapPin size={20} style={{ color: '#ea580c' }} />
                <div>
                  <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>Dirección</p>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>{userProfile.address}</p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                backgroundColor: '#f9fafb',
                borderRadius: '12px'
              }}>
                <Phone size={20} style={{ color: '#ea580c' }} />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>Teléfono</p>
                  {isEditingPhone ? (
                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                      <input
                        type="tel"
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        placeholder="+54 11 1234-5678"
                        style={{
                          flex: 1,
                          padding: '4px 8px',
                          border: '1px solid #d1d5db',
                          borderRadius: '4px',
                          fontSize: '14px'
                        }}
                      />
                      <button
                        onClick={handlePhoneUpdate}
                        style={{
                          padding: '4px 8px',
                          background: '#ea580c',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        ✓
                      </button>
                    </div>
                  ) : (
                    <p style={{ margin: 0, fontWeight: 'bold' }}>
                      {userProfile.phone || 'No configurado'}
                    </p>
                  )}
                </div>
                {!isEditingPhone && (
                  <button
                    onClick={() => {
                      setPhoneInput(userProfile.phone || '');
                      setIsEditingPhone(true);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#ea580c'
                    }}
                  >
                    <Edit size={16} />
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (() => {
            const userOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Historial de Pedidos</h3>
                {userOrders.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '40px',
                    color: '#6b7280'
                  }}>
                    <ShoppingBag size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                    <p>No tienes pedidos aún</p>
                    <p style={{ fontSize: '14px' }}>¡Haz tu primer pedido!</p>
                  </div>
                ) : (
                  userOrders.map(order => (
                    <div key={order.id} style={{
                      padding: '16px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div>
                          <p style={{ margin: 0, fontWeight: 'bold' }}>{order.orderNumber}</p>
                          <p style={{ margin: '4px 0', fontSize: '14px', color: '#6b7280' }}>
                            {new Date(order.createdAt).toLocaleDateString()} • {order.items.reduce((sum, item) => sum + item.quantity, 0)} productos
                          </p>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            backgroundColor: order.status === 'entregado' ? '#dcfce7' : '#fff3cd',
                            color: order.status === 'entregado' ? '#16a34a' : '#856404'
                          }}>
                            {order.status === 'pendiente' ? 'Pendiente' : 'Entregado'}
                          </span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#ea580c' }}>
                            ${order.totalPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>
                        <strong>Productos:</strong>
                        {order.items.map(item => (
                          <div key={item.id} style={{ marginLeft: '8px' }}>
                            • {item.name} x{item.quantity} (${(item.price * item.quantity).toFixed(2)})
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            );
          })()}

          {activeTab === 'favorites' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Platos Favoritos</h3>
              {favorites.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: '#6b7280'
                }}>
                  <Heart size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                  <p>No tienes favoritos aún</p>
                  <p style={{ fontSize: '14px' }}>¡Agrega platos a favoritos desde el menú!</p>
                </div>
              ) : (
                favorites.map(item => (
                  <div key={item.id} style={{
                    padding: '16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'linear-gradient(135deg, #f97316, #dc2626)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '20px'
                      }}>
                        🍽️
                      </div>
                      <div>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>{item.name}</p>
                        <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#6b7280' }}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <p style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#ea580c' }}>
                        ${item.price}
                      </p>
                      <button
                        onClick={() => {
                          const newFavs = favorites.filter(fav => fav.id !== item.id);
                          localStorage.setItem('favorites', JSON.stringify(newFavs));
                          setFavorites(newFavs);
                          alert('❌ Quitado de favoritos');
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#ef4444'
                        }}
                      >
                        <Heart size={16} fill="currentColor" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '20px',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          gap: '12px'
        }}>
          <button style={{
            flex: 1,
            padding: '12px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            background: 'white',
            color: '#6b7280',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <Settings size={16} />
            Configuración
          </button>
          <button 
            onClick={onLogout}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #f97316, #dc2626)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <LogOut size={16} />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;