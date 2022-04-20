import { Schema, model } from 'mongoose';

import { IAddress } from '../../interfaces';

const AddressSchema = new Schema<IAddress>({
    street: String,
    postalCode: String,
    city: String,
    country: String,
});

export default model<IAddress>('Address', AddressSchema);
