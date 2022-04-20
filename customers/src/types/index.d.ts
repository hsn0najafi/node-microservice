import { Express } from 'express';

import { ICustomer } from '../interfaces';

declare global {
    namespace Express {
        export interface Request {
            user: ICustomer;
        }
    }
}
