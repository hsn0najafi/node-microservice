import { ProductRepository } from '../database';
import { IProduct } from '../interfaces';
import { FormateData } from '../utils';
import { APIError } from '../utils/app-errors';

// All Business logic will be here
class ProductService {
    repository: any;

    constructor() {
        this.repository = new ProductRepository();
    }

    async CreateProduct(productInputs: any) {
        try {
            const productResult = await this.repository.CreateProduct(productInputs);
            return FormateData(productResult);
        } catch (err) {
            throw new APIError('Data Not found');
        }
    }

    async GetProducts() {
        try {
            const products = await this.repository.Products();

            let categories: any = {};

            products.map((t: any) => {
                categories[t.type] = t.type;
            });

            return FormateData({
                products,
                categories: Object.keys(categories),
            });
        } catch (err) {
            throw new APIError('Data Not found');
        }
    }

    async GetProductDescription(productId: any) {
        try {
            const product = await this.repository.FindById(productId);
            return FormateData(product);
        } catch (err) {
            throw new APIError('Data Not found');
        }
    }

    async GetProductsByCategory(category: any) {
        try {
            const products = await this.repository.FindByCategory(category);
            return FormateData(products);
        } catch (err) {
            throw new APIError('Data Not found');
        }
    }

    async GetSelectedProducts(selectedIds: any) {
        try {
            const products = await this.repository.FindSelectedProducts(selectedIds);
            return FormateData(products);
        } catch (err) {
            throw new APIError('Data Not found');
        }
    }

    async GetProductById(productId: any) {
        try {
            return await this.repository.FindById(productId);
        } catch (err) {
            throw new APIError('Data Not found');
        }
    }

    async GetProductPayload(userId: any, productDTO: any, event: any) {
        const { productId, qty } = productDTO;
        const product = await this.repository.FindById(productId);

        if (product) {
            const payload = {
                event: event,
                data: { userId, product, qty },
            };
            return FormateData(payload);
        } else {
            return FormateData({ error: 'No product available' });
        }
    }
}

export default ProductService;
