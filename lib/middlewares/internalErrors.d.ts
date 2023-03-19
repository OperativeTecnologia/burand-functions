import { NextFunction, Request, Response } from 'express';
export declare function internalErrors(err: Error | any, _request: Request, response: Response, nextFunction: NextFunction): void;
