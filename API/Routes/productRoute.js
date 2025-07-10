import express from 'express'
import { addProduct, addSlideShow, deleteProductByID, getallProducts, getAllSlideShow, getProductByID, updateProductByID } from '../Controllers/productController.js';
const productRouter = express.Router();

// add product
//api-> /api/product/addproduct
productRouter.post('/addproduct', addProduct)

// get all product
//api-> /api/product/getallproducts
productRouter.get('/getallproducts', getallProducts)

// get product by id
//api-> /api/product/:productid
productRouter.get('/get/:productid', getProductByID)

// update product by id
//api-> /api/product/:productid
productRouter.put('/update/:productid', updateProductByID)

// update product by id
//api-> /api/product/:productid
productRouter.delete('/delete/:productid', deleteProductByID)

// add slideshow
productRouter.post('/addslideshow', addSlideShow)

// get all slideshow data
productRouter.get('/getallslideshow', getAllSlideShow)
export default productRouter;

