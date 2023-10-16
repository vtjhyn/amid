import express from "express";
import { LoginAdmin, addAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/api/admin", addAdmin);
router.post("/auth/admin", LoginAdmin);


export default router;
