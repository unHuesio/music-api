import multer from 'multer';
import path from 'path';

// Use memory storage to process image buffer with sharp before saving
const storage = multer.memoryStorage();

// Initialize upload middleware
export const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Error: File upload only supports the following filetypes - ' + filetypes));
    }
});
