import { z } from "zod";

export class Product {
    readonly id?: string
    readonly name: string;
    readonly artist: string;
    readonly coverArt: string;

    private constructor(name: string, artist: string, coverArt: string, id?: string) {
        this.name = name;
        this.artist = artist;
        this.coverArt = coverArt;
        this.id = id;
    }

    static create(name: string, artist: string, coverArt: string, id?: string): Product {
        const schema = z.object({
            name: z.string().min(1, "Product name is required."),
            artist: z.string().min(1, "Artist is required."),
            coverArt: z.string().min(1, "Cover art is required.")
        });

        const validation = schema.safeParse({ name, artist, coverArt });

        if (!validation.success) {
            const errorMessages = validation.error.issues.map(e => e.message).join(", ");
            throw new Error(`Validation failed: ${errorMessages}`);
        }
        
        return new Product(validation.data.name, validation.data.artist, validation.data.coverArt, id);
    }
}