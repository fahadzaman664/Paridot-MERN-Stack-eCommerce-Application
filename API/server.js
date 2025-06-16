import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';

config({ path: '.env' });

// .env setup , here we give the path
config({path:'.env'})

const app = express();
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

