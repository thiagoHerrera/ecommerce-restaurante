import { useState, useEffect } from 'react';
import { Clock, CheckCircle, Truck, Package } from 'lucide-react';

const OrderTracking = ({ isOpen, onClose }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const savedOrder = localStorage.getItem('currentOrder');
      if (savedOrder) {
        setOrder(JSON.parse(savedOrder));
      }
    }
  }, [isOpen]);

  if (!isOpen || !order) return null;

  const statusSteps = [
    { key: 'recibido', label: 'Pedido Recibido', icon: CheckCircle, time: '0 min' },
    { key: 'preparando', label: 'En Preparación', icon: Clock, time: '15 min' },
    { key: 'listo', label: 'Listo para Entrega', icon: Package, time: '25 min' },
    { key: 'enviado', label: 'En Camino', icon: Truck, time: '35 min' },
    { key: 'entregado', label: 'Entregado', icon: CheckCircle, time: '45 min' }
  ];

  const currentStep = statusSteps.findIndex(step => step.key === order.status);

  return (
    <div className="cart-overlay">
      <div className="tracking-modal">
        <div className="cart-header">
          <h2 className="cart-title">📦 Seguir Pedido #{order.id}</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <div className="tracking-content">
          <div className="order-info">
            <p><strong>Fecha:</strong> {order.date}</p>
            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
            <p><strong>Entrega:</strong> {order.deliveryType === 'delivery' ? 'Domicilio' : 'Retiro en local'}</p>
          </div>

          <div className="tracking-steps">
            {statusSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = index <= currentStep;
              const isCurrent = index === currentStep;
              
              return (
                <div key={step.key} className={`tracking-step ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}>
                  <div className="step-icon">
                    <IconComponent size={24} />
                  </div>
                  <div className="step-info">
                    <h4>{step.label}</h4>
                    <p>Estimado: {step.time}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="order-items">
            <h4>📋 Productos</h4>
            {order.items.map(item => (
              <div key={item.id} className="tracking-item">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;