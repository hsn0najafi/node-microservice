import { v4 as uuidv4 } from 'uuid';

import { CartModel, OrderModel } from '../models';
import { APIError, BadRequestError, STATUS_CODES } from '../../utils/app-errors';

//Dealing with data base operations
class ShoppingRepository {
    // payment

    async Orders(customerId: string) {
        try {
            const orders = await OrderModel.find({ customerId });
            return orders;
        } catch (err) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Orders');
        }
    }

    async Cart(customerId: string) {
        try {
            const cartItems = await CartModel.find({
                customerId: customerId,
            });
            if (cartItems) {
                return cartItems;
            }

            throw new Error('Data not Found!');
        } catch (err) {
            throw err;
        }
    }

    async AddCartItem(customerId: string, item: any, qty: any, isRemove: any) {
        try {
            const cart = await CartModel.findOne({ customerId: customerId });

            const { _id } = item;

            if (cart) {
                let isExist = false;

                let cartItems = cart.items;

                if (cartItems.length > 0) {
                    cartItems.map((item: any) => {
                        if (item.product._id.toString() === _id.toString()) {
                            if (isRemove) {
                                cartItems.splice(cartItems.indexOf(item), 1);

                                console.log(cartItems);
                            } else {
                                item.unit = qty;
                            }
                            isExist = true;
                        }
                    });
                }

                if (!isExist && !isRemove) {
                    cartItems.push({ product: { ...item }, unit: qty });
                }

                cart.items = cartItems;

                return await cart.save();
            } else {
                return await CartModel.create({
                    customerId,
                    items: [{ product: { ...item }, unit: qty }],
                });
            }
        } catch (err) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Customer');
        }
    }

    async CreateNewOrder(customerId: string, txnId: any) {
        //check transaction for payment Status

        try {
            const cart = await CartModel.findOne({ customerId: customerId });

            console.log(cart);

            if (cart) {
                let amount = 0;

                let cartItems = cart.items;

                if (cartItems.length > 0) {
                    //process Order
                    cartItems.map((item: any) => {
                        amount += parseInt(item.product.price) * parseInt(item.unit);
                    });

                    const orderId = uuidv4();

                    const order = new OrderModel({
                        orderId,
                        customerId,
                        amount,
                        txnId,
                        status: 'received',
                        items: cartItems,
                    });

                    cart.items = [];

                    const orderResult = await order.save();

                    await cart.save();

                    return orderResult;
                }
            }

            return {};
        } catch (err) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Category');
        }
    }
}

export default ShoppingRepository;
