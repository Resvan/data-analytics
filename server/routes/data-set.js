import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { addData, getData, getUniqueYears } from "../controllers/dataSetController.js";




const router = express.Router();

router.post('/', verifyToken, addData);
router.get('/', verifyToken, getData);
router.get('/unique-years', verifyToken, getUniqueYears);


export default router;