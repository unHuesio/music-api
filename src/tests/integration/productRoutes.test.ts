import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { app } from '../../infrastructure/app';

describe('POST /api/products', () => {
    it('should create a new product', async () => {
        const response = await request(app)
            .post('/api/products')
            .send({
                name: 'Test Song',
                artistName: 'Test Artist',
                coverArtUrl: 'https://example.com/test.jpg',
                coverArtType: 'image/jpeg'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Product created successfully');

        // delete the created product to clean up
        const createdProductId = response.body.product.id;
        await request(app).delete(`/api/products/${createdProductId}`);
    });

    it('should return 400 if required fields are missing', async () => {
        const response = await request(app)
            .post('/api/products')
            .send({
                name: 'Missing Fields'
            });

        expect(response.status).toBe(400);
    });
});

describe('GET /api/products', () => {
    it('should return a list of products', async () => {
        const response = await request(app).get('/api/products');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});

describe('GET /api/products/:id', () => {
    it('should return a product by ID', async () => {
        // First, create a product to ensure we have a valid ID
        const createResponse = await request(app)
            .post('/api/products')
            .send({
                name: 'Product for GetById',
                artistName: 'Artist',
                coverArtUrl: 'https://example.com/getbyid.jpg',
                coverArtType: 'image/jpeg'
            });

        expect(createResponse.status).toBe(201);

        const createdProductId = createResponse.body.product.id;
        const response = await request(app).get(`/api/products/${createdProductId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', createdProductId);

        // Clean up by deleting the created product
        await request(app).delete(`/api/products/${createdProductId}`);
    });

    it('should return 400 if product id is invalid', async () => {
        const response = await request(app).get('/api/products/non-existent-id');
        expect(response.status).toBe(400);
    });

    it('should return 404 if product id is not found', async () => {
        const response = await request(app).get('/api/products/cd5930cb-1ffe-4ebd-ad79-f5bc3073d539');
        expect(response.status).toBe(404);
    });
});

describe('PUT /api/products/:id', () => {
    it('should update an existing product', async () => {
        // First, create a product to ensure we have a valid ID
        const createResponse = await request(app)
            .post('/api/products')
            .send({
                name: 'Product to Update',
                artistName: 'Artist',
                coverArtUrl: 'https://example.com/update.jpg',
                coverArtType: 'image/jpeg'
            });

        expect(createResponse.status).toBe(201);

        const createdProductId = createResponse.body.product.id;

        const response = await request(app)
            .put(`/api/products/${createdProductId}`)
            .send({
                name: 'Updated Product Name'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Product updated successfully');
        
        // Clean up by deleting the created product
        await request(app).delete(`/api/products/${createdProductId}`);
    });

    it('should return 400 if product is invalid', async () => {
        const response = await request(app)
            .put('/api/products/non-existent-id')
            .send({
                name: 'Should Not Update'
            });


        expect(response.status).toBe(400);
    });

    it('should return 404 if product is not found', async () => {
        const response = await request(app)
            .put('/api/products/cd5930cb-1ffe-4ebd-ad79-f5bc3073d539')
            .send({
                name: 'Should Not Update'
            });


        expect(response.status).toBe(404);
    });
});

describe('DELETE /api/products/:id', () => {
    it('should delete an existing product', async () => {
        // First, create a product to ensure we have a valid ID
        const createResponse = await request(app)
            .post('/api/products')
            .send({
                name: 'Product to Delete',
                artistName: 'Artist',
                coverArtUrl: 'https://example.com/delete.jpg',
                coverArtType: 'image/jpeg'
            });

        expect(createResponse.status).toBe(201);

        const createdProductId = createResponse.body.product.id;
        const response = await request(app).delete(`/api/products/${createdProductId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Product deleted successfully');
    });
});
