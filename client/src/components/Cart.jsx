import { X, Plus, Minus, Trash2, AlertTriangle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

const Cart = ({ isOpen, onClose, onCheckout, user }) => {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart, dinersCount, getTotalItems, getMaxItems, canAddMore } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');
  
  // Persistencia en localStorage
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('cart', JSON.stringify({ items, dinersCount }));
    }
  }, [items, dinersCount]);

  if (!isOpen) return null;

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id);
    } else if (newQuantity <= getMaxItems()) {
      updateQuantity(id, newQuantity);
    }
  };
  
  const applyDiscount = () => {
    const validCodes = {
      'DESCUENTO10': 0.10,
      'PROMO15': 0.15,
      'ESTUDIANTE': 0.20
    };
    
    if (validCodes[discountCode]) {
      setDiscount(validCodes[discountCode]);
      setDiscountError('');
    } else {
      setDiscountError('Código de descuento inválido');
      setDiscount(0);
    }
  };
  
  const subtotal = getTotalPrice();
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  const handleCheckout = () => {
    if (items.length === 0) return;
    onClose();
    // Esto será manejado por el componente padre
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">🛒 Tu Pedido</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Indicador de límite */}
          <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center gap-2 text-orange-700">
              <AlertTriangle size={16} />
              <span className="text-sm font-medium">
                {getTotalItems()}/{getMaxItems()} artículos ({dinersCount} {dinersCount === 1 ? 'comensal' : 'comensales'})
              </span>
            </div>
          </div>
          
          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-2">Tu carrito está vacío</p>
              <p className="text-sm text-gray-400">Agrega algunos deliciosos platos</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <img src={item.image || '/placeholder-food.jpg'} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-orange-600 font-semibold">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center bg-white border rounded hover:bg-gray-50"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      disabled={getTotalItems() >= getMaxItems()}
                      className="w-8 h-8 flex items-center justify-center bg-white border rounded hover:bg-gray-50 disabled:opacity-50"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            {/* Código de descuento */}
            <div>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Código de descuento"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                  className="flex-1 px-3 py-2 border rounded-lg text-sm"
                />
                <button
                  onClick={applyDiscount}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600"
                >
                  Aplicar
                </button>
              </div>
              {discountError && <p className="text-red-500 text-xs">{discountError}</p>}
            </div>
            
            {/* Resumen de totales */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Descuento ({(discount * 100).toFixed(0)}%):</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              onClick={() => { onCheckout(); onClose(); }} 
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              💳 {user ? 'Finalizar Compra' : 'Iniciar Sesión para Continuar'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;