import { CustomerRepository } from '../database';
import { IOrder, IProduct } from '../interfaces';
import { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } from '../utils';
import { APIError, BadRequestError } from '../utils/app-errors';

class CustomerService {
    repository: any;

    constructor() {
        this.repository = new CustomerRepository();
    }

    async SignIn(userInputs: any) {
        const { email, password } = userInputs;

        try {
            const existingCustomer = await this.repository.FindCustomer({ email });

            if (existingCustomer) {
                const validPassword = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);
                if (validPassword) {
                    const token = await GenerateSignature({ email: existingCustomer.email, _id: existingCustomer._id });
                    return FormateData({ id: existingCustomer._id, token });
                }
            }

            return FormateData(null);
        } catch (err: any) {
            throw new APIError('Data Not found', err);
        }
    }

    async SignUp(userInputs: any) {
        const { email, password, phone } = userInputs;

        try {
            // create salt
            let salt = await GenerateSalt();
            let userPassword = await GeneratePassword(password, salt);
            const existingCustomer = await this.repository.CreateCustomer({ email, password: userPassword, phone, salt });
            const token = await GenerateSignature({ email: email, _id: existingCustomer._id });
            return FormateData({ id: existingCustomer._id, token });
        } catch (err: any) {
            throw new APIError('Data Not found', err);
        }
    }

    async AddNewAddress(_id: any, userInputs: any) {
        const { street, postalCode, city, country } = userInputs;

        try {
            const addressResult = await this.repository.CreateAddress({ _id, street, postalCode, city, country });
            return FormateData(addressResult);
        } catch (err: any) {
            throw new APIError('Data Not found', err);
        }
    }

    async GetProfile(id: any) {
        try {
            const existingCustomer = await this.repository.FindCustomerById({ id });
            return FormateData(existingCustomer);
        } catch (err: any) {
            throw new APIError('Data Not found', err);
        }
    }

    async GetShopingDetails(id: any) {
        try {
            const existingCustomer = await this.repository.FindCustomerById({ id });

            if (existingCustomer) {
                return FormateData(existingCustomer);
            }
            return FormateData({ msg: 'Error' });
        } catch (err: any) {
            throw new APIError('Data Not found', err);
        }
    }

    async GetWishList(customerId: any) {
        try {
            const wishListItems = await this.repository.Wishlist(customerId);
            return FormateData(wishListItems);
        } catch (err: any) {
            throw new APIError('Data Not found', err);
        }
    }

    async AddToWishlist(customerId: any, product: IProduct) {
        try {
            const wishlistResult = await this.repository.AddWishlistItem(customerId, product);
            return FormateData(wishlistResult);
        } catch (err: any) {
            throw new APIError('Data Not found', err);
        }
    }

    async ManageCart(customerId: any, product: IProduct, qty: any, isRemove: any) {
        try {
            const cartResult = await this.repository.AddCartItem(customerId, product, qty, isRemove);
            return FormateData(cartResult);
        } catch (err: any) {
            throw new APIError('Data Not found', err);
        }
    }

    async ManageOrder(customerId: any, order: IOrder) {
        try {
            const orderResult = await this.repository.AddOrderToProfile(customerId, order);
            return FormateData(orderResult);
        } catch (err: any) {
            throw new APIError('Data Not found', err);
        }
    }

    async SubscribeEvents(payload: any) {
        const { event, data } = payload;

        const { userId, product, order, qty } = data;

        switch (event) {
            case 'ADD_TO_WISHLIST':
            case 'REMOVE_FROM_WISHLIST':
                this.AddToWishlist(userId, product);
                break;
            case 'ADD_TO_CART':
                this.ManageCart(userId, product, qty, false);
                break;
            case 'REMOVE_FROM_CART':
                this.ManageCart(userId, product, qty, true);
                break;
            case 'CREATE_ORDER':
                this.ManageOrder(userId, order);
                break;
            default:
                break;
        }
    }
}

export default CustomerService;
