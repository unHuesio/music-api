import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';
import { supabaseAdmin } from '../../../infrastructure/database/supabase/client';

const storageBucket = process.env.SUPABASE_STORAGE_BUCKET ?? 'music-art';

export const handleFileUpload = async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
        try {
            const uniqueSuffix = Date.now() + '-' + crypto.randomUUID();
            const originalFilename = `coverArt-${uniqueSuffix}-original.png`;
            const smallFilename = `coverArt-${uniqueSuffix}-small.png`;

            const originalBuffer = await sharp(req.file.buffer)
                .toFormat('png', { quality: 90 })
                .toBuffer();

            const smallBuffer = await sharp(req.file.buffer)
                .resize(200, 200, {
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .toFormat('png', { quality: 80 })
                .toBuffer();

            const originalPath = `products/${originalFilename}`;
            const smallPath = `products/${smallFilename}`;

            const { error: originalUploadError } = await supabaseAdmin.storage
                .from(storageBucket)
                .upload(originalPath, originalBuffer, {
                    contentType: 'image/png',
                    upsert: false,
                });

            if (originalUploadError) {
                throw new Error(`Original image upload failed: ${originalUploadError.message}`);
            }

            const { error: smallUploadError } = await supabaseAdmin.storage
                .from(storageBucket)
                .upload(smallPath, smallBuffer, {
                    contentType: 'image/png',
                    upsert: false,
                });

            if (smallUploadError) {
                throw new Error(`Small image upload failed: ${smallUploadError.message}`);
            }

            const { data: originalPublicUrlData } = supabaseAdmin.storage
                .from(storageBucket)
                .getPublicUrl(originalPath);

            const { data: smallPublicUrlData } = supabaseAdmin.storage
                .from(storageBucket)
                .getPublicUrl(smallPath);

            req.body.coverArt = originalPublicUrlData.publicUrl;
            req.body.coverArtSmall = smallPublicUrlData.publicUrl;
            req.body.coverArtType = 'image/png';

            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
};
