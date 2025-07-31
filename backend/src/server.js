import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.post("/auth/register", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.create({ data: { email, password } });
  res.json(user);
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  res.json(user);
});

app.post("/projects", async (req, res) => {
  const { name, userId } = req.body;
  const project = await prisma.project.create({
    data: { name, userId },
  });
  res.json(project);
});

app.get("/projects", async (req, res) => {
  const projects = await prisma.project.findMany();
  res.json(projects);
});

app.delete("/projects/:id", async (req, res) => {
  const { id } = req.params;
  const project = await prisma.project.delete({ where: { id } });
  res.json(project);
});

app.post("/tasks", async (req, res) => {
  const { title, projectId } = req.body;
  const task = await prisma.task.create({ data: { title, projectId } });
  res.json(task);
});

app.get("/tasks", async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, projectId, status } = req.body;
  const task = await prisma.task.update({
    where: { id },
    data: { title, projectId, status },
  });
  res.json(task);
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const task = await prisma.task.delete({ where: { id } });
  res.json(task);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
