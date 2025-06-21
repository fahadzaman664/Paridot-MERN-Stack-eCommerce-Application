import express from 'express'
import { addProduct, deleteProductByID, getallProducts, getProductByID, updateProductByID } from '../Controllers/productController.js';
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

export default productRouter;

