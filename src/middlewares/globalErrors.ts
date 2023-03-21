import { NextFunction, Request, Response } from 'express';
import { logger } from 'firebase-functions';
import { RequestError } from 'got';

/**
 * Middleware que captura erros globais da aplicação.
 *
 * @param err O objeto de erro capturado.
 * @param _request O objeto `Request` que contém as informações da requisição.
 * @param response O objeto `Response` que será enviado como resposta à requisição.
 * @param nextFunction A próxima função middleware a ser executada.
 * @returns {void}
 */
export function globalErrors(err: Error, _request: Request, response: Response, nextFunction: NextFunction): void {
  if (err instanceof RequestError) {
    const { code, name } = err;

    let gotRequest = {};
    let gotResponse = {};

    if (err.request) {
      const { options } = err.request;
      const { body, headers, method, url } = options;
      const { href } = url as URL;

      gotRequest = {
        url: href,
        method,
        headers,
        body
      };
    }

    if (err.response) {
      const { body, headers, statusCode } = err.response;

      gotResponse = {
        statusCode,
        headers,
        body
      };
    }

    logger.error({
      code,
      name,
      gotRequest,
      gotResponse
    });
  }

  response.status(500).json({
    code: 'application/internal-error',
    message: 'Internal server error.'
  });

  nextFunction(err);
}
