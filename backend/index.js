import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from './routes/userRoute.js'
import absenRoute from './routes/absenRoute.js'
import authRoute from './routes/authRoute.js'
import adminRoute from './routes/adminRoute.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRoute);
app.use(absenRoute);
app.use(authRoute);
app.use(adminRoute)

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});
