import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from "dotenv";
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from './routes/auth.js';
import dataRoutes from './routes/data-set.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Database connection
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/data', dataRoutes);

// Error handling middleware
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: error.message
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
