import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,   // ✅ replace with your actual SMTP host, e.g., smtp.gmail.com
  port: 465,
  secure: true,
  auth: {
    user: process.env.user,   // ✅ use clear variable names
    pass: process.env.shoppassword,
  },
});

const handlebarOptions = {
  viewEngine: {
    extName: ".hbs",
    partialsDir: path.resolve("./emails"),
    defaultLayout: false,
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,   // ✅ fixes common Handlebars errors
      allowProtoMethodsByDefault: true,
    },
  },
  viewPath: path.resolve("./emails"),
  extName: ".hbs",
};

transporter.use("compile", hbs(handlebarOptions));




export default transporter;
