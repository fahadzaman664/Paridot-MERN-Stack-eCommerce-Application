import express from 'express'
import { isAuthenticated } from '../Middleware/Auth.js';
import { addAddress, getAddress } from '../Controllers/addressController.js';

const addressRouter = express.Router();

// add user address
//api-> /api/address/addaddress
addressRouter.post('/addaddress', isAuthenticated, addAddress);


// get user address
//api-> /api/address/getaddress
addressRouter.get('/getaddress', isAuthenticated, getAddress)

export default addressRouter;