import { ErrorRequestHandler } from 'express';
import multer from 'multer';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
            return;
        }

        res.status(400).json({ error: err.message });
        return;
    }

    if (err.message?.includes('File upload only supports')) {
        res.status(400).json({ error: err.message });
        return;
    }

    res.status(500).json({ error: 'Internal Server Error' });
};