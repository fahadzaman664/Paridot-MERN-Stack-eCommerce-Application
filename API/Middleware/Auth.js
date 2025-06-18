import jwt from "jsonwebtoken";
import { UserModel } from "../Models/UserModel.js";
export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.header('Auth');
        if (!token) {
            res.status(404).json({ message: 'Login first' });
        }

        const decoded = jwt.verify(token, process.env.customjwttoken)
        const id = decoded.userId; // userId is set during login in token 

        let user = await UserModel.findById(id);
        if (!user) {
            res.status(404).json({ message: 'user not found',  })
        }

        req.user = user; // req.user for globally use userid
        next();
    }
    catch (error) {
        console.error('JWT Error:', error.message);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired. Please log in again.', success: false });
        }

        return res.status(401).json({ message: 'Invalid or malformed token', success: false });
    }
    }