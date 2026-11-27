const { db } = require('../Databases/db');

/**
 * Monitoring repository for station and observation data access.
 */
class MonitoringRepository {
    listActiveStationsWithLastObservation() {
        const rows = db.prepare(`
            SELECT s.id, s.name, s.river, s.municipality,
                   (SELECT MAX(o.observed_at) FROM observations o WHERE o.station_id = s.id) AS last_observed_at
            FROM stations s
            WHERE s.active = 1
            ORDER BY s.name ASC
        `).all();

        return rows.map((row) => ({
            station: {
                id: row.id,
                name: row.name,
                river: row.river,
                municipality: row.municipality
            },
            lastObservedAt: row.last_observed_at
        }));
    }

    findActiveStationById(stationId) {
        const row = db.prepare(
            'SELECT id, name, river, municipality FROM stations WHERE id = ? AND active = 1'
        ).get(stationId);
        if (!row) return null;
        return { id: row.id, name: row.name, river: row.river, municipality: row.municipality };
    }

    findLatestByMetric(stationId) {
        const metrics = ['level', 'rain'];
        const result = [];
        for (const metric of metrics) {
            const row = db.prepare(
                'SELECT metric, observed_at, value FROM observations WHERE station_id = ? AND metric = ? ORDER BY observed_at DESC LIMIT 1'
            ).get(stationId, metric);
            if (row) {
                result.push({ metric: row.metric, observedAt: row.observed_at, value: row.value });
            }
        }
        return result;
    }

    findSeries(stationId, metric, fromIso, toIso) {
        const rows = db.prepare(
            'SELECT observed_at, value FROM observations WHERE station_id = ? AND metric = ? AND observed_at >= ? AND observed_at <= ? ORDER BY observed_at ASC'
        ).all(stationId, metric, fromIso, toIso);
        return rows.map((row) => ({ observedAt: row.observed_at, value: row.value }));
    }

    ping() {
        db.prepare('SELECT 1').get();
    }
}

module.exports = MonitoringRepository;
