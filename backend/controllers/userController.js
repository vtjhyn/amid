import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

export const getUser = async (req, res) => {
  try {
    const response = await prisma.user.findMany();
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({msg: error.message})
  }
}

export const getUserById = async (req, res) => {
  try {
    const response = await prisma.user.findUnique({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json({msg: error.message})
  }
}

export const addUser = async (req, res) => {
  const { imgUrl, name, email, password, position, phone } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const user = await prisma.user.create({
      data: {
        imgUrl,
        name,
        email,
        hashedPassword,
        position,
        phone
      }
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
}

export const updateUser = async (req, res) => {
  const { imgUrl, password, phone } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const user = await prisma.user.update({
      where: {
        id: req.params.id
      },
      data: {
        imgUrl,
        hashedPassword,
        phone
      }
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
}

export const deleteUser = async (req, res) => {
  try {
    const response = await prisma.user.delete({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(response)
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
}