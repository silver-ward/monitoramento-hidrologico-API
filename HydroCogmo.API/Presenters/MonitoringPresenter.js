const DATA_MODE = 'simulation';
const SIMULATION_MESSAGE = 'Amostra simulada. Não representa condições reais.';
const SERIES_INTERVAL_MINUTES = 60;
const UNITS = { level: 'm', rain: 'mm/h' };

/**
 * Presenter for defining the output data of Observation/Station information.
 */// Entidades (camelCase) -> JSON do contrato (snake_case).

class MonitoringPresenter {
    // overviews: [{ station, lastObservedAt }]
    toStationList(overviews) {
        return {
            data_mode: DATA_MODE,
            stations: overviews.map(({ station, lastObservedAt }) => ({
                id: station.id,
                name: station.name,
                river: station.river,
                municipality: station.municipality,
                updated_at: lastObservedAt
            }))
        };
    }

    // station: Station | observations: Observation[] (últimas por métrica)
    toSummary(station, observations) {
        const level = observations.find((o) => o.metric === 'level');
        const rain = observations.find((o) => o.metric === 'rain');

        return {
            data_mode: DATA_MODE,
            message: SIMULATION_MESSAGE,
            station: {
                id: station.id,
                name: station.name,
                river: station.river,
                municipality: station.municipality
            },
            latest: {
                level_observed_at: level ? level.observedAt : null,
                level_m: level ? level.value : null,
                rain_observed_at: rain ? rain.observedAt : null,
                rain_mm_h: rain ? rain.value : null
            }
        };
    }

    // observations: Observation[] em ordem crescente
    toSeries({ stationId, metric, fromIso, toIso, observations }) {
        return {
            data_mode: DATA_MODE,
            station_id: stationId,
            metric,
            unit: UNITS[metric],
            interval_minutes: SERIES_INTERVAL_MINUTES,
            from: fromIso,
            to: toIso,
            points: observations.map((o) => ({ timestamp: o.observedAt, value: o.value }))
        };
    }

    toHealth() {
        return { status: 'ok', database: 'ok' };
    }
}

module.exports = MonitoringPresenter;