const { db } = require('./db');

/**
 * Monitoring repository for station and observation data access.
 */
export default class MonitoringRepository {
   
    // TODO 1: retorne as estações ativas e a hora da última observação de cada
    // estação. Ordene pelo nome. Dica: LEFT JOIN + MAX(observed_at).
    listStations() {
        throw new Error('TODO: implementar listStations');
    }

    stationExists(stationId) {
        return Boolean(db.prepare('SELECT 1 FROM stations WHERE id = ? AND active = 1')
            .get(stationId));
    }

    // TODO 2: busque uma estação e a observação mais recente de cada métrica.
    // Retorne null se a estação não existir.
    getSummary(stationId) {
        throw new Error('TODO: implementar getSummary');
    }

    // TODO 3: filtre por estação, métrica e limite de tempo. Retorne pontos em
    // ordem crescente. Use parâmetros SQL; nunca concatene os valores da URL.
    getSeries(stationId, metric, fromIso, toIso) {
        throw new Error('TODO: implementar getSeries');
    }
}