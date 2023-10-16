import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const secretKey = "8awoyrc8ob3ccyaYOdawcynlayw7yarl8cyw38ayccawra83crnyrac5ca";

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      user.hashedPassword
    );

    if (!isCorrectPassword) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserData = async (req, res) => {
  const authHeader = req.headers.authorization; // Ambil header Authorization
  if (!authHeader) {
    return res.status(401).json({ msg: "Token not provided" });
  }

  const tokenParts = authHeader.split(' '); // Pisahkan "Bearer" dari token
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ msg: "Invalid token format" });
  }

  const token = tokenParts[1]; // Ambil token setelah "Bearer"

  try {
    const decoded = jwt.verify(token, secretKey); // Verifikasi token
    const userId = decoded.userId;

    // Selanjutnya, Anda dapat menggunakan userId untuk mengambil data user dari database.
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};