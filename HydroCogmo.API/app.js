const express = require('express');
const cors = require('cors');
const createRoutes = require('./routes');
const { notFound, errorHandler } = require('./Middleware/errorHandler');

// Monta o app Express. A ordem do registro é a ordem de execução:
// cors -> json -> rotas -> notFound -> errorHandler
function createApp({ controller, corsOrigin }) {
    const app = express();

    app.use(cors({ origin: corsOrigin }));
    app.use(express.json());

    app.use('/api', createRoutes(controller));

    app.use(notFound);
    app.use(errorHandler);

    return app;
}

module.exports = createApp;