import express from 'express' 
import { getallusers, login, register, userProfile } from '../Controllers/userController.js';
import { isAuthenticated } from '../Middleware/Auth.js';

const userRouter = express.Router();

// user register
// api -> /api/user/register
userRouter.post('/register', register)

// user login
// api -> /api/user/login
userRouter.post('/login', login)

// user login
// api -> /api/user/getalluser
userRouter.get('/getallusers', getallusers)

// user profile
userRouter.get('/profile',isAuthenticated, userProfile )


export default userRouter;