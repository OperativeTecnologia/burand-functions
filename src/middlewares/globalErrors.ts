import { NextFunction, Request, Response } from 'express';
import { logger } from 'firebase-functions';
import { RequestError } from 'got';

export function globalErrors(err: Error, _: Request, response: Response, nextFunction: NextFunction): void {
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
  } else {
    logger.error({
      name: err.name,
      message: err.message
    });
  }

  response.status(500).json({
    code: 'application/internal-error',
    message: 'Internal server error.'
  });

  nextFunction(err);
}
