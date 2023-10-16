import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const secretKey = "8awoyrc8ob3ccyaYOdawcynlayw7yarl8cyw38ayccawra83crnyrac5ca";


export const addAdmin = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const admin = await prisma.admin.create({
      data: {
        name,
        email,
        hashedPassword,
      }
    })
    res.status(201).json(admin)
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
}

export const LoginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await prisma.admin.findFirst({
      where: {
        email: email,
      },
    });

    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      admin.hashedPassword
    );

    if (!isCorrectPassword) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    const token = jwt.sign({ adminId: admin.id }, secretKey, { expiresIn: "1h" });

    res.status(200).json({ token, admin });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

