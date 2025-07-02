import mongoose from "mongoose";

// here we have product id and other details of item
const cartItemSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductModel",
        require: true
    },
    title: { type: String, require: true },
    price: { type: String, require: true },
    qty: { type: Number, require: true },
    imgSrc:{type:String, require: true }

})

// here we have cart against user and items, so we create items array and also we achieve product id from above schema
const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        require: true
    },
    items:[cartItemSchema]
})

export const CartModel = mongoose.model('Cart', cartSchema)