import { Schema } from 'mongoose';
import { IAddress } from './address.interface';

export interface ICustomer {
    _id: Schema.Types.ObjectId;
    email: string;
    password: string;
    salt: string;
    phone: string;
    address: Array<IAddress>;
    cart: [
        {
            product: IProduct;
            unit: number;
        }
    ];
    wishlist: Array<IWishlist>;
    orders: Array<IOrder>;
}

export interface IOrder {
    _id: string;
    amount: string;
    date: DateConstructor;
}

export interface IProduct {
    _id: string;
    name: string;
    banner: string;
    price: number;
}

export interface IWishlist {
    _id: string;
    name: string;
    description: string;
    banner: string;
    available: boolean;
    price: number;
}
