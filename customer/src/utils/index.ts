import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import config from '../config';

const GenerateSalt = async () => {
    return await bcrypt.genSalt();
};

const GeneratePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
};

const ValidatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
    return (await GeneratePassword(enteredPassword, salt)) === savedPassword;
};

const GenerateSignature = async (payload: any) => {
    return await jwt.sign(payload, config.APP_SECRET, { expiresIn: '1d' });
};

const ValidateSignature = async (req: any) => {
    const signature = req.get('Authorization');
    // console.log(signature);
    if (signature) {
        const payload = await jwt.verify(signature.split(' ')[1], config.APP_SECRET);
        req.user = payload;
        return true;
    }

    return false;
};

const FormateData = (data: any) => {
    if (data) {
        return { data };
    } else {
        throw new Error('Data Not found!');
    }
};

export { GenerateSalt, GeneratePassword, ValidatePassword, GenerateSignature, ValidateSignature, FormateData };
