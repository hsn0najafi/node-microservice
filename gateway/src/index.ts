import express, { Application } from 'express';
import cors from 'cors';
import ehp from 'express-http-proxy';
import 'dotenv/config';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/customer', ehp(`http://localhost:${process.env.CUSTOMER_PORT}`));
app.use('/shopping', ehp(`http://localhost:${process.env.SHOPPING_PORT}`));
app.use('/',         ehp(`http://localhost:${process.env.PRODUCTS_PORT}`));

app.listen(process.env.GATEWAY_PORT, () => {
    console.log(`Gateway is Listening to PORT: ${process.env.GATEWAY_PORT}`);
});
