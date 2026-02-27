import { Router } from 'express';
import { ProductController } from '../controllers/productController';
import { validate } from '../middlewares/validate';
import { createProductSchema, updateProductSchema, getProductByIdSchema, deleteProductSchema } from '../schemas/productSchemas';
import { upload } from '../middlewares/upload';
import { handleFileUpload } from '../middlewares/handleFileUpload';

const router = Router();
const productController = new ProductController();

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
