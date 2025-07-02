import { UserModel } from "../Models/UserModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//user register
export const register = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        if ([email, name, password].some(field => !field?.trim())) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let db = await UserModel.findOne({ email });

        if (db) {
            return res.status(400).json({ message: 'User already exists', success: false });
        }

        const hashPassword = await bcrypt.hash(password, 10)

        db = await UserModel.create({
            name: name,
            email: email,
            password: hashPassword
        })

        const { password: _, ...userWithoutPassword } = db._doc;
        res.status(201).json({ message: 'User created successfully', success: true, user: userWithoutPassword });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal Server error' });
    }
}

// user login
export const login = async (req, res) => {
    try {

        const { email, password } = req.body;
        if ([email, password].some(field => field === '')) {
            return res.json({ message: "all fields are required" })
        }

        let user = await UserModel.findOne({ email });

        if (!user) {
            return res.json({ message: 'user not exist', success: false })
        }

        const hashpass = await bcrypt.compare(password, user.password)
        if (!hashpass) {
            return res.json({ message: 'invalid password', success: false })
        }

        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.customjwttoken,
            {
                expiresIn: '365d'
            }
        );

        res.status(201).json({ message: `Welcome ${user.name}`, token: token, success: true })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal Server error' });

    }
}

// get all user
export const getallusers = async (req, res) => {
    try {
        let users = await UserModel.find().sort({ createdAt: -1 });
        if (users.length === 0) {
            return res.json({ message: 'users not exist', success: false })
        }

        res.status(201).json({ message: 'all present user fetched', users: users, success: true })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal Server error' });
    }
}


// user profile
export const userProfile = async (req, res) => {

    try {
        const userId = req.user;
        const profile = await UserModel.findOne({_id: userId });
        if(!profile){
             return res.json({ message: ' no user profile' })
        }
        const { password: _, ...userWithoutPassword } = profile._doc;
        return res.status(201).json({ message: ' current user profile', userProfile: userWithoutPassword })

    } catch (error) {
        res.status(500).json({ message: 'internal Server error' });

    }

}