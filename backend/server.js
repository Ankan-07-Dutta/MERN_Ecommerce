import dotenv from 'dotenv';
dotenv.config({path:'backend/config/config.env'});

import app from './app.js';

import { connectMongoDatabase } from './config/db.js';
import {v2 as cloudinary} from 'cloudinary';
import Razorpay from 'razorpay';

connectMongoDatabase();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})
//Handle uncaught exception error
process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Server is shutting down, due to uncaught exception errors`);
    process.exit(1);
    
})

const port = process.env.PORT || 3000;
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});




const server = app.listen(port, ()=> {
    console.log(`server is running on port ${port}`);    
});




process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Server is shutting down, due to unhandled promise rejection`);
    server.close(()=>{
        process.exit(1);
    })
      
})