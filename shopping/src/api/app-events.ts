import { Application } from 'express';

import ShoppingService from '../services/shopping-service';

export = (app: Application) => {
    const service = new ShoppingService();

    app.use('/app-events', async (req, res, next) => {
        service.SubscribeEvents(req.body);

        console.log('-=+ Shopping Service Received Event +=-');
        return res.status(200).json(req.body);
    });
};
