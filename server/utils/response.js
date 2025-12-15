const response = {
  success: (res, data, message = 'Operación exitosa', statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  },

  error: (res, message = 'Error interno del servidor', statusCode = 500, errors = null) => {
    return res.status(statusCode).json({
      success: false,
      message,
      errors
    });
  },

  validationError: (res, errors) => {
    return res.status(400).json({
      success: false,
      message: 'Errores de validación',
      errors
    });
  },

  unauthorized: (res, message = 'No autorizado') => {
    return res.status(401).json({
      success: false,
      message
    });
  },

  notFound: (res, message = 'Recurso no encontrado') => {
    return res.status(404).json({
      success: false,
      message
    });
  }
};

module.exports = response;
