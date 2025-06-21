import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel",
        require: true
    },
    fullName: { type: String, require: true},
    address: { type: String, require: true },
    city: { type: String, require: true },
    state: { type: String, require: true},
    country: { type: String, require: true},
    pinCode: { type: String, require: true },
    phoneNumber: { type: String, require: true},
    createdAt: { type: Date, default: Date.now },

})
export const AddressModel = mongoose.model('Address', addressSchema);