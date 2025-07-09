import express from 'express' 
import { contactUs } from '../Controllers/emailController.js';
const contactUsRouter = express.Router();
// contact us
// api -> /api/contact/contactus
contactUsRouter.post('/contactus', contactUs)
export default contactUsRouter;