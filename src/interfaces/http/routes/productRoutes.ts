import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { validate } from '../middlewares/validate';
import { createProductSchema, updateProductSchema, getProductByIdSchema, deleteProductSchema } from '../schemas/productSchemas';
import { upload } from '../middlewares/upload';
import { handleFileUpload } from '../middlewares/handleFileUpload';

const router = Router();
const productController = new ProductController();

// Use upload.single('coverArt') BEFORE validation if validation checks file properties, 
// OR handle validation inside controller if schemas don't support file objects easily.
// Note: express-validator/zod middleware might struggle with FormData unless parsed first.
router.post('/', 
    upload.single('coverArtUrl'), 
    handleFileUpload,
    validate(createProductSchema), 
    productController.createProduct.bind(productController));
router.get('/', productController.getAllProducts.bind(productController));
router.get('/:id', validate(getProductByIdSchema), productController.getProductById.bind(productController));
router.put('/:id', validate(updateProductSchema), productController.updateProduct.bind(productController));
router.delete('/:id', validate(deleteProductSchema), productController.deleteProduct.bind(productController));

export { router as productRouter };
