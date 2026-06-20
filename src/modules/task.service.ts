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

export const getAllTasks = async (page = 1, pageSize = 8) => {
  const take = pageSize;
  const skip = (Math.max(page, 1) - 1) * take;

  const [total, data] = await Promise.all([
    prisma.task.count(),
    prisma.task.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
  ]);

  const totalPages = Math.ceil(total / take) || 1;

  return {
    data,
    meta: {
      total,
      page: Math.max(page, 1),
      pageSize: take,
      totalPages,
    },
  };
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
