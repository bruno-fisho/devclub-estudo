import express from "express";
import "dotenv/config";
import cors from "cors";
import { prisma } from "../lib/prisma.ts";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/users", async (req, res) => {
  await prisma.user.create({
    data: {
      name: req.body.name,
      age: req.body.age,
    },
  });
  res.status(201).json({ message: "User created successfully" });
});

app.put("/users/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      name: req.body.name,
      age: req.body.age,
    },
  });
  res.status(201).json({ message: "User updated successfully" });
});

app.get("/users", async (req, res) => {
  if (req.query.id) {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.query.id),
      },
    });
    res.status(200).json(user);
  }
  const users = await prisma.user.findMany();
  res.status(200).json(users);
});

app.put("/users/:id", async (req, res) => {
  await prisma.user.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      name: req.body.name,
      age: req.body.age,
    },
  });
  res.status(201).json({ message: "User updated successfully" });
});

app.get("/home", (req, res) => {
  res.send("Welcome to the Home Page!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
