import { ProductModel } from '../models';
import { APIError, STATUS_CODES, BadRequestError } from '../../utils/app-errors';
import { IProduct } from '../../interfaces';

//Dealing with data base operations
class ProductRepository {
    async CreateProduct(productDTO: IProduct) {
        const { name, desc, type, unit, price, available, suplier, banner } = productDTO;
        try {
            const product = new ProductModel({
                name,
                desc,
                type,
                unit,
                price,
                available,
                suplier,
                banner,
            });

            const productResult = await product.save();
            return productResult;
        } catch (err) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Create Product');
        }
    }

    async Products() {
        try {
            return await ProductModel.find();
        } catch (err) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Get Products');
        }
    }

    async FindById(id: any) {
        try {
            return await ProductModel.findById(id);
        } catch (err) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Product');
        }
    }

    async FindByCategory(category: any) {
        try {
            const products = await ProductModel.find({ type: category });
            return products;
        } catch (err) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Category');
        }
    }

    async FindSelectedProducts(selectedIds: any) {
        try {
            const products = await ProductModel.find()
                .where('_id')
                .in(selectedIds.map((_id: any) => _id))
                .exec();
            return products;
        } catch (err) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Product');
        }
    }
}

export default ProductRepository;
