import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import userRouter from './Routes/userRoute.js';
import cors from 'cors';
import productRouter from './Routes/productRoute.js';
import cartRouter from './Routes/cartRoute.js';
import addressRouter from './Routes/addressRoute.js';

config({ path: '.env' });

// .env setup , here we give the path
config({path:'.env'})

const app = express();
// ✅ Add this to parse JSON in requests
app.use(express.json());
// (Optional) Add this if using URL-encoded data (like from forms)
app.use(express.urlencoded({ extended: true }));
// (Optional) Enable CORS
app.use(cors({
  origin:true,
  methods:["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

//home
app.get('/',(req,res)=>{
    res.send('homepage');
})
//product router
app.use('/api/product', productRouter)

// user router
app.use('/api/user', userRouter)

// cart router
app.use('/api/cart', cartRouter)
// address router
app.use('/api/address', addressRouter)

mongoose.connect(
   process.env.MONGO_URI,{
    dbName:process.env.DB_NAME
}).then(() => {
  console.log('MongoDB connected successfully.');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});




const port = 1000;
app.listen(port, ()=>{
    console.log(`server is running on port ${port} `)
})

