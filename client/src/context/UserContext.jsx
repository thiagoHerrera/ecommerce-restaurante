import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
    phone: '',
    address: 'Buenos Aires, Argentina',
    orders: [],
    favorites: []
  });

  // Cargar datos del localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  // Guardar en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  const updatePhone = (phone) => {
    setUserProfile(prev => ({ ...prev, phone }));
  };

  const addOrder = (order) => {
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      total: order.total,
      status: 'Preparando',
      items: order.items.length,
      products: order.items
    };
    setUserProfile(prev => ({
      ...prev,
      orders: [newOrder, ...prev.orders]
    }));
  };

  const addToFavorites = (product) => {
    console.log('Adding to favorites:', product);
    setUserProfile(prev => {
      const isAlreadyFavorite = prev.favorites.some(fav => fav.id === product.id);
      console.log('Is already favorite:', isAlreadyFavorite);
      
      if (isAlreadyFavorite) {
        const newFavorites = prev.favorites.filter(fav => fav.id !== product.id);
        console.log('Removing from favorites, new list:', newFavorites);
        return {
          ...prev,
          favorites: newFavorites
        };
      } else {
        const newFavorites = [...prev.favorites, product];
        console.log('Adding to favorites, new list:', newFavorites);
        return {
          ...prev,
          favorites: newFavorites
        };
      }
    });
  };

  const isFavorite = (productId) => {
    const result = userProfile.favorites.some(fav => fav.id === productId);
    console.log('Is favorite check for', productId, ':', result);
    return result;
  };

  return (
    <UserContext.Provider value={{
      userProfile,
      updatePhone,
      addOrder,
      addToFavorites,
      isFavorite
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};