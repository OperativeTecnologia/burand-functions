import express from 'express';
import 'express-async-errors';
/**
 * Cria um servidor `Express` com as rotas fornecidas.
 *
 * @param routes Um objeto `Router` que contém as rotas a serem adicionadas ao servidor.
 * @returns Um objeto `Express` que representa o servidor criado.
 */
export declare function createServer(routes: express.Router): express.Express;
