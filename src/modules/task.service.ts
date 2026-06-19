import prisma from "../config/prisma.js";
import { CreateTaskInput, UpdateTaskInput } from "./task.schema.js";

export const createTask = async (data: CreateTaskInput) => {
  return await prisma.task.create({
    data: {
      title: data.title,
      description: data.description ?? "",
      status: data.status || "TODO",
    },
  });
};

export const getAllTasks = async () => {
  return await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};
export const updateTask = async (
  id: string,
  data: UpdateTaskInput,
) => {
  return await prisma.task.update({
    where: { id },
    data,
  });
};



export const deleteTask = async (id: string) => {
  return await prisma.task.delete({
    where: { id },
  });
};
