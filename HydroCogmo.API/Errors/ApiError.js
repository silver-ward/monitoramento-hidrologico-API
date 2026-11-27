// Erro com status HTTP e código do contrato. Lance-o de qualquer camada da API;
// o errorHandler o converte em { error: { code, message } }.

/**
 * Class for HTTP errors with contract codes.
 */
class ApiError extends Error {
  constructor(status, code, message) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

module.exports = ApiError;