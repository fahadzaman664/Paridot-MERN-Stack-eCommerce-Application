import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title: { type: String, require: true, default:'empty' },
    description: { type: String, require: true,default:'empty' },
    category: { type: String, require: true, default:'empty' },
    price: { type: Number, require: true ,default:0},
    qty: { type: Number, require: true, default:0 },
    imgSrc: { type: String, require: true, default:'empty' },
    createdAt: { type: Date, default: Date.now },

});

export const ProductModel = mongoose.model('products', productSchema);