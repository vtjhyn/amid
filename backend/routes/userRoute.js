import express from "express";
import {
  getUser,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/api/users", getUser);
router.get("/api/users/:id", getUserById);
router.post("/api/users", addUser);
router.patch("/api/users/:id", updateUser);
router.delete("/api/users/:id", deleteUser);

export default router;
