import { AppError } from './AppError.js';
export declare class ApiError extends AppError {
    readonly statusCode: number;
    constructor(message: string, code: string, statusCode?: number);
}
