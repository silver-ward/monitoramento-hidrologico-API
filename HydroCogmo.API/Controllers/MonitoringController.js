const ApiError = require('../Errors/ApiError');
const { parseSeriesQuery } = require('../Validators/seriesQuery');

const HOUR_MS = 60 * 60 * 1000;

/**
 * Controller class for station/observation endpoints.
 */
// Camada HTTP: lê a requisição, valida, chama o repositório e entrega o
// resultado ao presenter. Sem SQL e sem nomes de campos do contrato.
// Os handlers são síncronos (better-sqlite3); erros lançados chegam ao
// errorHandler via next(error) no wrapper do routes.js.
class MonitoringController {
    constructor({ repository, presenter }) {
        this.repository = repository;
        this.presenter = presenter;
    }

    health(_req, res) {
        this.repository.ping();
        res.json(this.presenter.toHealth());
    }

    listStations(_req, res) {
        const overviews = this.repository.listActiveStationsWithLastObservation();
        res.json(this.presenter.toStationList(overviews));
    }

    getSummary(req, res) {
        const { stationId } = req.params;
        const station = this.repository.findActiveStationById(stationId);
        if (!station) throw stationNotFound();

        const latest = this.repository.findLatestByMetric(stationId);
        res.json(this.presenter.toSummary(station, latest));
    }

    getSeries(req, res) {
        // Valida antes de consultar a estação, como no contrato.
        const { metric, hours } = parseSeriesQuery(req.query);
        const { stationId } = req.params;

        if (!this.repository.findActiveStationById(stationId)) throw stationNotFound();

        const to = new Date();
        to.setUTCMinutes(0, 0, 0);
        const from = new Date(to.getTime() - hours * HOUR_MS);
        const fromIso = from.toISOString();
        const toIso = to.toISOString();

        const observations = this.repository.findSeries(stationId, metric, fromIso, toIso);
        res.json(this.presenter.toSeries({ stationId, metric, fromIso, toIso, observations }));
    }
}

function stationNotFound() {
    return new ApiError(404, 'station_not_found', 'Estação não encontrada.');
}

module.exports = MonitoringController;