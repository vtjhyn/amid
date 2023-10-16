import { PrismaClient } from "@prisma/client";
import moment from "moment-timezone";

const prisma = new PrismaClient();

export const getAbsen = async (req, res) => {
  try {
    const response = await prisma.absen.findMany({
      include: {
        user: true
      }
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getAbsenByUserId = async (req, res) => {
  try {
    const response = await prisma.absen.findMany({
      where: {
        userId: req.params.id,
      }
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const addAbsenByUserId = async (req, res) => {
  const { status } = req.body;
  const userId = req.params.id;
  const currentDate = moment().tz("Asia/Jakarta").format();
  const dateOnly = currentDate.split('T')[0];
  const timeOnly = currentDate.split('T')[1].split('.')[0];
  try {
    const absen = await prisma.absen.create({
      data: {
        status,
        date: dateOnly,
        time: timeOnly,
        user: {
          connect: {
            id: userId
          }
        }
      },
      include: {
        user: true
      }
    });
    res.status(201).json(absen);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
