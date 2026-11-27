require('dotenv').config();

// Composition root: único arquivo que enxerga todas as camadas.
const { db } = require('../Hydra.Infra.Data/Database/db');
const MonitoringRepository = require('../Hydra.Infra.Data/Repositories/MonitoringRepository');
const MonitoringPresenter = require('./Presenters/MonitoringPresenter');
const MonitoringController = require('./Controllers/MonitoringController');
const createApp = require('./app');

const port = Number(process.env.PORT || 3000);
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

const repository = new MonitoringRepository(db);
const presenter = new MonitoringPresenter();
const controller = new MonitoringController({ repository, presenter });

const app = createApp({ controller, corsOrigin });

app.listen(port, () => {
    console.log('API demonstrativa em http://localhost:' + port);
});