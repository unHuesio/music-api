import { describe, it, expect } from 'vitest';
import { Product } from '../../domain/entities/product';

describe('Product Entity', () => {
    it('should create a valid product', () => {
        const product = Product.create('My Song', 'My Artist', 'http://example.com/art.jpg');
        
        expect(product.name).toBe('My Song');
        expect(product.artist).toBe('My Artist');
        expect(product.coverArt).toBe('http://example.com/art.jpg');
        expect(product.id).toBeUndefined(); // ID is undefined on creation
    });

    it('should throw error if name is missing', () => {
        expect(() => {
            // @ts-ignore - Testing runtime validation
            Product.create('', 'Artist', 'url');
        }).toThrow(/Validation failed/);
    });

    it('should throw error if artist is missing', () => {
        expect(() => {
            // @ts-ignore - Testing runtime validation
            Product.create('Name', '', 'url');
        }).toThrow(/Validation failed/);
    });

    it('should throw error if cover art is missing', () => {
        expect(() => {
            // @ts-ignore - Testing runtime validation
            Product.create('Name', 'Artist', '');
        }).toThrow(/Validation failed/);
    });

  it('should correctly restore an existing product with ID', () => {
    const existingId = '123-uuid';
    const product = Product.create('Song', 'Artist', 'url', existingId);
    
    expect(product.id).toBe(existingId);
  });
});
