import { IProductRepository } from '../../domain';
import { Product } from '../../domain/entities/product';

export class ProductService {
    private productRepository: IProductRepository;

    
    constructor(
        productRepository: IProductRepository,
    ) {
        this.productRepository = productRepository;
    }

    async createProduct(name: string, artistName: string, coverArt: string): Promise<Product> {
        const product = await this.productRepository.addProduct(Product.create(name, artistName, coverArt));
        return product;
    }

    async getAllProducts(): Promise<Product[]> {
        return await this.productRepository.getAllProducts();
    }

    async updateProduct(id: string, name?: string, artistName?: string, coverArt?: string): Promise<Product> {
        const product = await this.productRepository.findProductById(id);
        if (!product) {
            throw new Error('Product not found');
        }

        const updatedProduct = Product.create(
            name ?? product.name,
            artistName ?? product.artist,
            coverArt ?? product.coverArt,
            id ?? product.id
        );

        const updated = await this.productRepository.updateProduct(updatedProduct);
        return updated;
    }

    async deleteProduct(id: string): Promise<void> {
        await this.productRepository.removeProductById(id);
    }

    async findProductById(id: string): Promise<Product | undefined> {
        return await this.productRepository.findProductById(id);
    }
}