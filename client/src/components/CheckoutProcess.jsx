import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CreditCard, MapPin, User, Check } from 'lucide-react';
import axios from 'axios';

const CheckoutProcess = ({ isOpen, onClose, user }) => {
  const { items, getTotalPrice, dinersCount, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [orderData, setOrderData] = useState({
    address: '',
    phone: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  if (!isOpen) return null;

  const subtotal = getTotalPrice();
  const total = subtotal;

  const handleInputChange = (field, value) => {
    setOrderData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return orderData.address && orderData.phone;
      case 2:
        return orderData.paymentMethod === 'cash' || 
               (orderData.cardNumber && orderData.expiryDate && orderData.cvv);
      default:
        return true;
    }
  };

  const processOrder = () => {
    // crear pedido simple
    const newOrder = {
      id: Date.now(),
      orderNumber: `WF${Date.now()}`,
      items: items,
      totalPrice: total,
      status: 'pendiente',
      createdAt: new Date().toISOString(),
      address: orderData.address,
      phone: orderData.phone
    };
    
    // guardar en localStorage
    const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    orders.push(newOrder);
    localStorage.setItem('userOrders', JSON.stringify(orders));
    
    setOrderConfirmed(true);
    setTimeout(() => {
      clearCart();
      onClose();
      setStep(1);
      setOrderConfirmed(false);
    }, 2000);
  };

  if (orderConfirmed) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">¡Pedido Confirmado!</h2>
          <p className="text-gray-600 mb-4">Tu pedido ha sido procesado exitosamente</p>
          <p className="text-sm text-gray-500">Número de pedido: #WF{Date.now()}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Finalizar Compra</h2>
          
          {/* Pasos */}
          <div className="flex mb-8">
            {[1, 2, 3].map(num => (
              <div key={num} className="flex-1 flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= num ? 'bg-orange-500 text-white' : 'bg-gray-200'
                }`}>
                  {num}
                </div>
                {num < 3 && <div className="flex-1 h-0.5 bg-gray-200 mx-2" />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin size={20} /> Información de Entrega
              </h3>
              <div>
                <label className="block text-sm font-medium mb-1">Dirección</label>
                <input
                  type="text"
                  value={orderData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Ingresa tu dirección completa"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Teléfono</label>
                <input
                  type="tel"
                  value={orderData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="Número de contacto"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <CreditCard size={20} /> Método de Pago
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={orderData.paymentMethod === 'card'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                  />
                  <span>Tarjeta de Crédito/Débito</span>
                </label>
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={orderData.paymentMethod === 'cash'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                  />
                  <span>Efectivo al recibir</span>
                </label>
              </div>
              
              {orderData.paymentMethod === 'card' && (
                <div className="space-y-3 mt-4">
                  <input
                    type="text"
                    placeholder="Número de tarjeta"
                    value={orderData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  />
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="MM/AA"
                      value={orderData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      className="flex-1 p-3 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      value={orderData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      className="flex-1 p-3 border rounded-lg"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Resumen del Pedido</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span>Comensales:</span>
                  <span>{dinersCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Artículos:</span>
                  <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dirección:</span>
                  <span className="text-sm">{orderData.address}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pago:</span>
                  <span>{orderData.paymentMethod === 'card' ? 'Tarjeta' : 'Efectivo'}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={step === 1 ? onClose : () => setStep(step - 1)}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              {step === 1 ? 'Cancelar' : 'Anterior'}
            </button>
            
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!validateStep(step)}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
              >
                Siguiente
              </button>
            ) : (
              <button
                onClick={processOrder}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Confirmar Pedido
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProcess;