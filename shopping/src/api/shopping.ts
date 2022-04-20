import { Application } from 'express';

import ShoppingService from '../services/shopping-service';
import { PublishCustomerEvent } from '../utils';
import UserAuth from './middlewares/auth';

export = (app: Application) => {
    const service = new ShoppingService();

    app.post('/order', UserAuth, async (req, res, next) => {
        const { _id } = req.user;
        const { txnNumber } = req.body;

        try {
            const { data } = await service.PlaceOrder({ _id, txnNumber });

            const payload = await service.GetOrderPayload(_id, data, 'CREATE_ORDER');

            PublishCustomerEvent(payload);

            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    });

    app.get('/orders', UserAuth, async (req, res, next) => {
        const { _id } = req.user;

        try {
            const { data } = await service.GetOrders(_id);

            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    });

    app.get('/cart', UserAuth, async (req, res, next) => {
        const { _id } = req.user;

        try {
            const { data } = await service.getCart({ _id });

            return res.status(200).json(data);
        } catch (err) {
            throw err;
        }
    });
};
