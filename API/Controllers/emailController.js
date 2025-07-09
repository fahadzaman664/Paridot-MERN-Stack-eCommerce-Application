import { ContactUsModel } from "../Models/ContactUsModel.js";
import transporter from "../utils/email.js";// adjust import path to where you put transporter

export const sendOrderConfirmationEmail = async (order, customerEmail) => {
  try {
    console.log("SMTP_HOST:", process.env.SMTP_HOST);
    console.log("EMAIL_USER:", process.env.user);
    console.log("EMAIL_PASS:", process.env.shoppassword ? "set" : "not set");
    await transporter.sendMail({
      from: '"Your Shop" <no-reply@yourshop.com>',
      to: customerEmail,
      subject: "Order Confirmation - Your Order has been placed",
      template: "order-confirmation", // refers to emails/order-confirmation.hbs
      context: order,                // order object passed to template variables
    });

    console.log("Order confirmation email sent successfully!");
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
  }
};


// contact us

export const contactUs = async (req, res) => {

  try {
    const { name, email, message } = req.body;

    const contact = await ContactUsModel.create({
      name,
      email,
      message
    })

    res.status(201).json({ success: true , message:"message sent successfully.."});


  } catch (error) {

    console.error(error);
    res.status(500).json({ message: 'internal Server error' });
  }
}