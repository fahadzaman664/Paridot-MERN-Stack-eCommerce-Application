import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    createdAt: { type: Date, default:Date.now}


})
export const UserModel = mongoose.model('user', userSchema);