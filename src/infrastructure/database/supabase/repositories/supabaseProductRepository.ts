
import { supabase } from '../client';
import { IProductRepository, Product } from '../../../../domain'


export class SupabaseProductRepository implements IProductRepository {
    async addProduct(product: Product): Promise<Product> {
        const { data, error } = await supabase
            .from('products')
            .insert({
                name: product.name,
                artist: product.artist,
                cover_art: product.coverArt
            })
            .select()
            .single();
        
        if (error) throw new Error(error.message);
        return this.mapToEntity(data);
    }

    async getAllProducts(): Promise<Product[]> {
        const { data, error } = await supabase
            .from('products')
            .select('*');

        if (error) throw new Error(error.message);

        return data.map(this.mapToEntity);
    }

    async removeProductById(id: string): Promise<void> {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        if (error) throw new Error(error.message);
    }

    async findProductById(id: string): Promise<Product | undefined> {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) return undefined;
        return this.mapToEntity(data);
    }

    async updateProduct(updatedProduct: Product): Promise<Product> {
        const { data, error } = await supabase
            .from('products')
            .update({
                name: updatedProduct.name,
                artist: updatedProduct.artist,
                cover_art: updatedProduct.coverArt
            })
            .eq('id', updatedProduct.id)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return this.mapToEntity(data);
    }

    // Helper to map DB record to Domain Entity
    private mapToEntity(record: any): Product {
        return Product.create(record.name, record.artist, record.cover_art, record.id); 
    }
}
