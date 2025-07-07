import { PaymentModel } from "../Models/PaymentModel.js";
import { sendOrderConfirmationEmail } from "./emailController.js";
export const createOrder = async (req, res) => {
    try {

        const { shippingInfo, cartItems, totalAmount,Totalquantity, shippingcharges } = req.body;
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ success: false, message: "No items provided" });
        }
        if (!shippingInfo || !totalAmount) {
            return res.status(400).json({ success: false, message: "Incomplete order data" });
        }

        const newOrder = new PaymentModel({
            user: req.user.id, // populated by verifyToken middleware
            cartItems,
            shippingInfo,
            totalAmount,
            Totalquantity:Totalquantity,
            shippingcharges:shippingcharges,
            paymentStatus: "pending", // COD orders start as pending
        });

        await newOrder.save();
        await sendOrderConfirmationEmail(newOrder, req.user.email);
        res.status(201).json({
            success: true,
            message: "Order created successfully",
            orderId: newOrder._id,
        });

    } catch (error) {
        console.error("Create Order Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

// get user specic order
export const userOrder = async (req, res) => {
    try {
        const userId = req.user._id.toString();

        const order = await PaymentModel.findOne({ user: userId }).sort({ orderDate: -1 });
        res.status(201).json({
            success: true,
            order: order,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }

}

// get all orders
export const allOrders = async (req, res) => {
    try {
        const orders = await PaymentModel.find().sort({ orderDate: -1 });
        res.status(200).json({
            success: true,
            orders: orders,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }


}