import { Application } from 'express';

import CustomerService from '../services/customer-service';

export = (app: Application) => {
    const service = new CustomerService();

    app.use('/app-events', (req, res, next) => {
        const { payload } = req.body;

        service.SubscribeEvents(payload);

        console.log('-=+ Customer Service Received Event +=-');

        return res.status(200).json(payload);
    });
};
