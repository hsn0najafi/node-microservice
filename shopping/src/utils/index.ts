import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';

import config from '../config';

//Utility functions
export const GenerateSalt = async () => {
    return await bcrypt.genSalt();
};

export const GeneratePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
    return (await GeneratePassword(enteredPassword, salt)) === savedPassword;
};

export const GenerateSignature = async (payload: any) => {
    return await jwt.sign(payload, config.APP_SECRET, { expiresIn: '1d' });
};

export const ValidateSignature = async (req: any) => {
    const signature = req.get('Authorization');

    // console.log(signature);

    if (signature) {
        const payload = await jwt.verify(signature.split(' ')[1], config.APP_SECRET);
        req.user = payload;
        return true;
    }

    return false;
};

export const FormateData = (data: any) => {
    if (data) {
        return { data };
    } else {
        throw new Error('Data Not found!');
    }
};

export const PublishCustomerEvent = async (payload: any) => {
    axios.post('http://localhost:8000/customer/app-events', {
        payload,
    });
};
