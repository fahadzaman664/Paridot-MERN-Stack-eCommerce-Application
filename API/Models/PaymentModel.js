import mongoose from 'mongoose'


const paymentSchema = mongoose.Schema({
    orderDate:{type:Date, default:Date.now},
    payStatus:{type:String}
}, {strict:false})

export const PaymentModel = mongoose.model('Payment', paymentSchema);