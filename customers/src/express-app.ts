import express, { Application } from 'express';
import cors from 'cors';

import { customer, appEvents } from './api';
import HandleErrors from './utils/error-handler';

export = async (app: Application) => {
    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ extended: true, limit: '1mb' }));
    app.use(cors());
    app.use(express.static(__dirname + '/public'));

    // app.use((req,res,next) => {
    //     console.log(req);
    //     next();
    // })

    //Listen to Events
    appEvents(app);

    //api
    customer(app);

    // error handling
    app.use(HandleErrors);
};
