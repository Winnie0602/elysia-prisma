import { NotFoundError } from "elysia";
import prisma from "../../db";

export async function getTodos() {
  try {
    return await prisma.todo.findMany({ orderBy: { createdAt: "asc" } });
  } catch (error) {
    console.log("Error getting todos", error);
  }
}

export async function getTodoById(id: number) {
  try {
    return await prisma.todo.findUnique({ where: { id } });
  } catch (error) {
    console.log("Error getting todo by id", error, id);
  }
}

export async function updateTodo(
  id: number,
  data: { title?: string; description?: string; completed?: boolean }
) {
  try {
    const { title, description, completed } = data;
    return await prisma.todo.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(completed !== undefined && completed !== null && { completed }),
      },
    });
  } catch (error) {
    console.log("Error getting todo by id", error, id);
  }
}

export async function createTodo(data: { title: string; description: string }) {
  try {
    const todo = await prisma.todo.create({ data });
    if (!todo) {
      throw new NotFoundError("Error creating todo");
    }
  } catch (error) {
    console.error("Error creating todo", error);
  }
}

export async function deleteTodoById(id: number) {
  try {
    const todo = await prisma.todo.delete({ where: { id } });
    if (!todo) {
      throw new NotFoundError("Error deleting todo");
    }
  } catch (error) {
    console.log("Error deleting todo by id", error, id);
  }
}
