import express from 'express';
import 'express-async-errors';
import { globalErrors } from '../middlewares/globalErrors.js';
import { internalErrors } from '../middlewares/internalErrors.js';
export function createServer(routes) {
    const app = express();
    app.disable('x-powered-by');
    app.use(express.json());
    app.use(routes);
    app.use(internalErrors);
    app.use(globalErrors);
    return app;
}
