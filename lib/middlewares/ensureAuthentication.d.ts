import { Request, Response, NextFunction } from 'express';
export declare function ensureAuthentication(request: Request, _: Response, nextFunction: NextFunction): Promise<void>;
