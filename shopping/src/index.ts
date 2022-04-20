import express from 'express';

import config from './config';
import { databaseConnection } from './database';
import expressApp from './express-app';

(async () => {
    const app = express();

    await databaseConnection();

    await expressApp(app);

    app.listen(config.PORT, () => {
        console.log(`listening to port ${config.PORT}`);
    }).on('error', (err) => {
        console.log(err);
        process.exit();
    });
})();
