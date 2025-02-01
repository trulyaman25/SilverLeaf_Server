import dotenv from 'dotenv';
import express from "express";
import cors from "cors";
import mongoose from 'mongoose';
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
}));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use("/api/contact", contactRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});