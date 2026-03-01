import { SupabaseProductRepository } from '../../../infrastructure';
import { ProductService } from '../../../application';
import { Request, Response, NextFunction } from 'express';

const supabaseProductRepository = new SupabaseProductRepository();
const productService = new ProductService(supabaseProductRepository);

export class ProductController {

    async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, artistName, coverArt } = req.body;

            const product = await productService.createProduct(name, artistName, coverArt);
            
            res.status(201).json({ message: 'Product created successfully', product });
        } catch (error) {
            next(error);
        }
    }

    async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const products = await productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            next(error);
        }
    }

    async getProductById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const product = await productService.findProductById(id as string);
            if (!product) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { name, artistName, coverArt } = req.body;

            const product = await productService.updateProduct(id as string, name, artistName, coverArt);
            
            res.status(200).json({ message: 'Product updated successfully' , product });
        } catch (error) {
            if (error instanceof Error && error.message === 'Product not found') {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            next(error);
        }
    }

    async deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            await productService.deleteProduct(id as string);
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            if (error instanceof Error && error.message === 'Product not found') {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            next(error);
        }
    }
}