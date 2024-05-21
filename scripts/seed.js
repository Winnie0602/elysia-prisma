const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

const todoToCreate = [
  {
    id: 10,
    title: "test 1",
    description: "test Monday",
    completed: false,
  },
  {
    id: 6,
    title: "test 2",
    description: "test des2",
    completed: true,
  },
  {
    id: 7,
    title: "test 3",
    description: "test des3",
    completed: false,
  },
  {
    id: 8,
    title: "test 4",
    description: "test des4",
    completed: false,
  },
];

const seed = async (todos) => {
  console.log("seeding data");
  for (let i = 0; i < todos.length; i++) {
    await prismaClient.todo.upsert({
      where: { id: todos[i].id },
      update: todos[i],
      create: todos[i],
    });
  }
};

seed(todoToCreate)
  .then(() => console.log("data seeding succesfully"))
  .catch((e) => console.error("data seeding error", e))
  .finally(() => {
    console.log("data seeding end");
    prismaClient.$disconnect();
  });
