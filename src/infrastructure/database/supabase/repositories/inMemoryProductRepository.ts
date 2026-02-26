

import { IProductRepository, Product } from '../../../../domain'

export class InMemoryProductRepository implements IProductRepository {
    private products: Product[] = [];

    async addProduct(product: Product): Promise<Product> {
        this.products.push(product);
        return product;
    }

    async getAllProducts(): Promise<Product[]> {
        return this.products;
    }

    async removeProductById(id: string): Promise<void> {
        this.products = this.products.filter(product => product.id !== id);
    }

    async findProductById(id: string): Promise<Product | undefined> {
        return this.products.find(product => product.id === id);
    }

    async updateProduct(updatedProduct: Product): Promise<Product> {
        const index = this.products.findIndex(product => product.id === updatedProduct.id);
        if (index !== -1) {
            this.products[index] = updatedProduct;
            return updatedProduct;
        }
        throw new Error('Product not found');
    }
}
