import express from 'express';
import 'express-async-errors';

import { globalErrors } from '../middlewares/globalErrors.js';
import { internalErrors } from '../middlewares/internalErrors.js';

/**
 * Cria um servidor `Express` com as rotas fornecidas.
 *
 * @param routes Um objeto `Router` que contém as rotas a serem adicionadas ao servidor.
 * @returns Um objeto `Express` que representa o servidor criado.
 */
export function createServer(routes: express.Router): express.Express {
  const app = express();

  app.disable('x-powered-by');
  app.use(express.json());

  app.use(routes);

  app.use(internalErrors);
  app.use(globalErrors);

  return app;
}
