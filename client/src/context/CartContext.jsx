import React, { createContext, useContext, useReducer } from 'react';


const CartContext = createContext();


const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':

      const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
      const maxItems = state.dinersCount * 4;
      

      if (totalItems >= maxItems) {
        return state;
      }
      

      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'SET_DINERS':
      return {
        ...state,
        dinersCount: action.payload,
        items: []
      };
    
    case 'CLEAR_CART':
      return { ...state, items: [] };
    
    default:
      return state;
  }
};


export const CartProvider = ({ children }) => {

  const loadInitialState = () => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const { items, dinersCount } = JSON.parse(savedCart);
        return { items: items || [], dinersCount: dinersCount || 1 };
      }
    } catch (error) {
      console.error('Error cargando carrito:', error);
    }
    return { items: [], dinersCount: 1 };
  };
  
  const [state, dispatch] = useReducer(cartReducer, loadInitialState());

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem('cart');
  };
  const setDiners = (count) => dispatch({ type: 'SET_DINERS', payload: count });
  

  React.useEffect(() => {
    if (state.items.length > 0 || state.dinersCount > 1) {
      localStorage.setItem('cart', JSON.stringify(state));
    }
  }, [state]);

  const getTotalItems = () => state.items.reduce((total, item) => total + item.quantity, 0);
  const getTotalPrice = () => state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const getMaxItems = () => state.dinersCount * 4;
  const canAddMore = () => getTotalItems() < getMaxItems();

  return (
    <CartContext.Provider value={{
      items: state.items,
      dinersCount: state.dinersCount,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      setDiners,
      getTotalItems,
      getTotalPrice,
      getMaxItems,
      canAddMore
    }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
};