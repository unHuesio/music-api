import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

export const handleFileUpload = async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
        try {
            const uploadDir = path.join('public', 'uploads');
            await fs.mkdir(uploadDir, { recursive: true });

            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const originalFilename = `coverArt-${uniqueSuffix}-original.png`;
            const smallFilename = `coverArt-${uniqueSuffix}-small.png`;
            
            const originalFilepath = path.join(uploadDir, originalFilename);
            const smallFilepath = path.join(uploadDir, smallFilename);

            // 1. Save Original (converted to PNG for consistency/optimization)
            await sharp(req.file.buffer)
                .toFormat('png', { quality: 90 })
                .toFile(originalFilepath);

            // 2. Save Small Version (Resize)
            await sharp(req.file.buffer)
                .resize(200, 200, {
                    fit: 'inside',
                    withoutEnlargement: true 
                })
                .toFormat('png', { quality: 80 })
                .toFile(smallFilepath);

            // Store the path to the original image in the body
            // You could also store the small one if you have a field for it
            req.body.coverArtUrl = `/static/uploads/${originalFilename}`;
            req.body.coverArtType = 'image/png';
            
            // Advance to next middleware
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
};
