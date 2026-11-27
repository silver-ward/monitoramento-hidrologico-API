const { Router } = require('express');

// Liga URL -> método do controller. O wrapper encaminha qualquer erro
// lançado para o errorHandler (Express 4 não captura sozinho).
function handle(fn) {
    return (req, res, next) => {
        try {
            fn(req, res);
        } catch (error) {
            next(error);
        }
    };
}

function createRoutes(controller) {
    const router = Router();

    router.get('/health', handle((req, res) => controller.health(req, res)));
    router.get('/stations', handle((req, res) => controller.listStations(req, res)));
    router.get('/stations/:stationId/summary', handle((req, res) => controller.getSummary(req, res)));
    router.get('/stations/:stationId/series', handle((req, res) => controller.getSeries(req, res)));

    return router;
}

module.exports = createRoutes;