import express from "express";
import {
  getAbsen,
  getAbsenByUserId,
  addAbsenByUserId
} from '../controllers/absenController.js'

const router = express.Router();

router.get("/api/absen", getAbsen);
router.get("/api/absen/:id", getAbsenByUserId);
router.post("/api/absen/:id", addAbsenByUserId);


export default router;
