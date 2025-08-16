import dotenv from 'dotenv';
dotenv.config({path:'./config/config.env'})
import express from 'express';
import product from './routes/productRoutes.js';
import user from './routes/userRoutes.js';
import order from './routes/orderRoutes.js';
import payment from './routes/paymentRoutes.js';
import errorHandleMiddleware from './middleware/error.js';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';


const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // add this
app.use(cookieParser());
app.use(fileUpload())

//Route
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(errorHandleMiddleware);

export default app;