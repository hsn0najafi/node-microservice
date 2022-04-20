import { Schema } from 'mongoose';

export interface IProduct {
    _id: Schema.Types.ObjectId;
    name: string;
    desc: string;
    banner: string;
    type: string;
    unit: number;
    price: number;
    available: boolean;
    suplier: string;
}
