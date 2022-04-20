import mongoose from 'mongoose';

import config from '../config';

export = async () => {
    try {
        await mongoose.connect(config.DB_URL!);
        console.log('DB Connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
