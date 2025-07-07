import express from 'express'
import { isAuthenticated } from '../Middleware/Auth.js';
import { allOrders, createOrder, userOrder } from '../Controllers/PaymentController.js';

const PaymentRouter = express.Router();

// create order route
PaymentRouter.post('/createorder',isAuthenticated, createOrder )

// user order
PaymentRouter.get('/userorder', isAuthenticated,userOrder)


// all orders
PaymentRouter.get('/allOrders', allOrders)

export default PaymentRouter;