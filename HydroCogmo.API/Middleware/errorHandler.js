const ApiError = require('../Errors/ApiError');

function sendError(res, status, code, message) {
  return res.status(status).json({ error: { code, message } });
}

// Rota não encontrada (registrar depois das rotas)
function notFound(_req, res) {
  return sendError(res, 404, 'not_found', 'Rota não encontrada.');
}

// Tratador de erros (registrar por último; precisa dos 4 parâmetros)
function errorHandler(error, _req, res, _next) {
  if (error instanceof ApiError) {
    return sendError(res, error.status, error.code, error.message);
  }
  // O detalhe fica no terminal para ajudar no desenvolvimento, não na resposta.
  console.error(error);
  return sendError(res, 500, 'internal_error', 'Não foi possível carregar os dados.');
}

module.exports = { notFound, errorHandler };