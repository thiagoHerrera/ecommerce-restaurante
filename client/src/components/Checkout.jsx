import { useState } from 'react';
import { X, MapPin, CreditCard, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Checkout = ({ isOpen, onClose, user }) => {
  const { items, getTotalPrice, clearCart } = useCart();
  const [orderData, setOrderData] = useState({
    address: '',
    phone: '',
    paymentMethod: 'mercadopago',
    deliveryType: 'delivery',
    notes: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de pedido
    const order = {
      id: Date.now(),
      items,
      total: getTotalPrice(),
      user,
      ...orderData,
      status: 'recibido',
      date: new Date().toLocaleString()
    };
    
    localStorage.setItem('currentOrder', JSON.stringify(order));
    clearCart();
    alert('🎉 ¡Pedido realizado con éxito! Te contactaremos pronto.');
    onClose();
  };

  return (
    <div className="cart-overlay">
      <div className="checkout-modal">
        <div className="cart-header">
          <h2 className="cart-title">🛒 Finalizar Pedido</h2>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <div className="checkout-content">
          <div className="order-summary">
            <h3>📋 Resumen del Pedido</h3>
            {items.map(item => (
              <div key={item.id} className="checkout-item">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="checkout-total">
              <strong>Total: ${getTotalPrice().toFixed(2)}</strong>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <h4>📍 Entrega</h4>
              <div className="delivery-options">
                <label>
                  <input
                    type="radio"
                    name="deliveryType"
                    value="delivery"
                    checked={orderData.deliveryType === 'delivery'}
                    onChange={(e) => setOrderData({...orderData, deliveryType: e.target.value})}
                  />
                  Delivery (+$2.00)
                </label>
                <label>
                  <input
                    type="radio"
                    name="deliveryType"
                    value="pickup"
                    checked={orderData.deliveryType === 'pickup'}
                    onChange={(e) => setOrderData({...orderData, deliveryType: e.target.value})}
                  />
                  Retiro en local
                </label>
              </div>

              {orderData.deliveryType === 'delivery' && (
                <div className="form-group">
                  <MapPin size={20} />
                  <input
                    type="text"
                    placeholder="Dirección de entrega"
                    value={orderData.address}
                    onChange={(e) => setOrderData({...orderData, address: e.target.value})}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Teléfono de contacto"
                  value={orderData.phone}
                  onChange={(e) => setOrderData({...orderData, phone: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h4>💳 Pago</h4>
              <select
                value={orderData.paymentMethod}
                onChange={(e) => setOrderData({...orderData, paymentMethod: e.target.value})}
              >
                <option value="mercadopago">Mercado Pago</option>
                <option value="efectivo">Efectivo</option>
                <option value="tarjeta">Tarjeta</option>
              </select>
            </div>

            <div className="form-section">
              <h4>📝 Notas</h4>
              <textarea
                placeholder="Instrucciones especiales (opcional)"
                value={orderData.notes}
                onChange={(e) => setOrderData({...orderData, notes: e.target.value})}
              />
            </div>

            <button type="submit" className="checkout-btn">
              <CreditCard size={20} />
              Confirmar Pedido
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;