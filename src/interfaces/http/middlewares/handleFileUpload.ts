import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import path from 'path';

export const handleFileUpload = async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
        try {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const originalFilename = `coverArt-${uniqueSuffix}-original.webp`;
            const smallFilename = `coverArt-${uniqueSuffix}-small.webp`;
            
            const originalFilepath = path.join('public/uploads', originalFilename);
            const smallFilepath = path.join('public/uploads', smallFilename);

            // 1. Save Original (converted to WebP for consistency/optimization)
            await sharp(req.file.buffer)
                .toFormat('webp', { quality: 90 })
                .toFile(originalFilepath);

            // 2. Save Small Version (Resize)
            await sharp(req.file.buffer)
                .resize(200, 200, {
                    fit: 'inside',
                    withoutEnlargement: true 
                })
                .toFormat('webp', { quality: 80 })
                .toFile(smallFilepath);

            // Store the path to the original image in the body
            // You could also store the small one if you have a field for it
            req.body.coverArtUrl = `/static/uploads/${originalFilename}`;
            req.body.coverArtType = 'image/webp';
            
            // Advance to next middleware
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
};
