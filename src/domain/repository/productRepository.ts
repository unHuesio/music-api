import { Product } from '../';

export interface IProductRepository {
    addProduct(product: Product): Promise<Product>;
    getAllProducts(): Promise<Product[]>;
    removeProductById(id: string): Promise<void>;
    findProductById(id: string): Promise<Product | undefined>;
    updateProduct(product: Product): Promise<Product>;
}

