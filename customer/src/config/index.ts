import path from 'path';
import { readFileSync } from 'fs';

import dotEnv from 'dotenv';

process.env.NODE_ENV !== 'prod' ? dotEnv.config({ path: `./.env.${process.env.NODE_ENV}` }) : dotEnv.config();

export default {
    PORT: process.env.PORT,
    DB_URL: process.env.MONGODB_URI,

    // ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
    APP_SECRET: readFileSync(path.join(__dirname, '../../jwtRS256.key')),
};
