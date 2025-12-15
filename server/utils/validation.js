const validation = {
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidPassword: (password) => {
    return password && password.length >= 6;
  },

  isValidName: (name) => {
    return name && name.trim().length >= 2;
  },

  validateRegisterData: (data) => {
    const errors = [];
    
    if (!validation.isValidName(data.name)) {
      errors.push('El nombre debe tener al menos 2 caracteres');
    }
    
    if (!validation.isValidEmail(data.email)) {
      errors.push('Email inválido');
    }
    
    if (!validation.isValidPassword(data.password)) {
      errors.push('La contraseña debe tener al menos 6 caracteres');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  validateLoginData: (data) => {
    const errors = [];
    
    if (!validation.isValidEmail(data.email)) {
      errors.push('Email inválido');
    }
    
    if (!data.password) {
      errors.push('Contraseña requerida');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  validateOrderData: (data) => {
    const errors = [];
    
    if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
      errors.push('El pedido debe tener al menos un producto');
    }
    
    if (!data.total || data.total <= 0) {
      errors.push('Total inválido');
    }
    
    if (!data.dinersCount || data.dinersCount < 1 || data.dinersCount > 6) {
      errors.push('Número de comensales debe ser entre 1 y 6');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
};

module.exports = validation;
