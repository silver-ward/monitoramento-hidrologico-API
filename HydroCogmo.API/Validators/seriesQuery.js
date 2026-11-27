const ApiError = require('../Errors/ApiError');

const VALID_METRICS = ['level', 'rain'];

/**
 * Validator for series query parameters.
 */ // Valida e normaliza ?metric= e ?hours=. Lança ApiError se inválido.
function parseSeriesQuery(query) {
    const metric = query.metric || 'level';
    const hours = Number(query.hours || '24');

    if (!VALID_METRICS.includes(metric)) {
        throw new ApiError(400, 'invalid_metric', 'metric deve ser level ou rain.');
    }
    if (!Number.isInteger(hours) || hours < 1 || hours > 72) {
        throw new ApiError(400, 'invalid_hours', 'hours deve ser um inteiro entre 1 e 72.');
    }

    return { metric, hours };
}

module.exports = { parseSeriesQuery };