import express from 'express'
import { addtocart, clearCart, decreaseCart, getuserspecificCart, removeproductbyId } from '../Controllers/cartController.js';
import { isAuthenticated } from '../Middleware/Auth.js';

const cartRouter = express.Router();

// add to cart
// api -> /api/cart/addtocart
cartRouter.post('/addtocart',isAuthenticated, addtocart)

// get user specific cart 
//api-> /api/cart/getuserspecificcart
cartRouter.get('/getuserspecificcart',isAuthenticated,getuserspecificCart);

//remove product id specific cart
//api-> /api/cart/removeproductfromcart/:id
cartRouter.delete('/removeproductfromcart/:id',isAuthenticated,removeproductbyId);

// delete/clear userspecific cart
//api-> /api/cart/clearcart
cartRouter.delete('/clearcart',isAuthenticated,clearCart);


// decrease quantity in cart
//api-> /api/cart/decreasequantity
cartRouter.post('/decreasequantity',isAuthenticated,decreaseCart);
export default cartRouter;