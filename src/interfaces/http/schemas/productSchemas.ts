import { z } from 'zod';

export const createProductSchema = z.object({
    body: z.object({
        name: z.string().min(1, "Product name is required."),
        artistName: z.string().min(1, "Artist name is required."),
        coverArtUrl: z.string().min(1, "Cover art URL is required"),
    })
});

export const updateProductSchema = z.object({
    params: z.object({
        id: z.uuid({ message: 'Invalid product ID format' }),
    }),
    body: z.object({
        name: z.string().min(1, "Product name is required.").optional(),
        artistName: z.string().min(1, "Artist name is required.").optional(),
        coverArtUrl: z.string().min(1, "Cover art URL is required").optional(),
    })
});

export const getProductByIdSchema = z.object({
    params: z.object({
        id: z.uuid({ message: 'Invalid product ID format' }),
    })
});

export const deleteProductSchema = z.object({
    params: z.object({
        id: z.uuid({ message: 'Invalid product ID format' }),
    })
});
