import mongoose from "mongoose";

const contactUsSchema = mongoose.Schema({
    name: { type: String, require: true},
    email: { type: String, require: true },
    message: { type: String, require: true },
})
export const ContactUsModel = mongoose.model('ContactUS', contactUsSchema);