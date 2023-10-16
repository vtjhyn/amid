import express from "express";
import { Login, getUserData } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", Login);
router.get("/user", getUserData);

export default router;
