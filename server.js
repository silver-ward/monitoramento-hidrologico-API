require('dotenv').config();

// Composition root: único arquivo que enxerga todas as camadas.
const { db } = require('./HydroCogmo.Infra.Data/Databases/db');
const MonitoringRepository = require('./HydroCogmo.Infra.Data/Repositories/MonitoringRepository');
const MonitoringPresenter = require('./HydroCogmo.API/Presenters/MonitoringPresenter');
const MonitoringController = require('./HydroCogmo.API/Controllers/MonitoringController');
const createApp = require('./HydroCogmo.API/app');

const port = Number(process.env.PORT || 3000);
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';

const repository = new MonitoringRepository(db);
const presenter = new MonitoringPresenter();
const controller = new MonitoringController({ repository, presenter });

const app = createApp({ controller, corsOrigin });

app.listen(port, () => {
    console.log('API demonstrativa em http://localhost:' + port);
});