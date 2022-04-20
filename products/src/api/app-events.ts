import { Application } from 'express';

export = (app: Application) => {
    app.use('/app-events', async (req, res, next) => {
        console.log('-=+ Products Service Received Event +=-');
        return res.status(200).json(req.body);
    });
};
