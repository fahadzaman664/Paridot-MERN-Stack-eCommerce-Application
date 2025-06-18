import express from 'express' 
import { getallusers, login, register } from '../Controllers/userController.js';

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

export default userRouter;