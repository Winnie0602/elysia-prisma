import { Elysia } from "elysia";
import todoRoutes from "./routes/todos";
import { swagger } from "@elysiajs/swagger";

const todoApp = new Elysia();

todoApp.use(swagger());

todoApp.group("/api", (app) => app.use(todoRoutes)).listen(3000);

console.log(
  `🦊 Elysia is running at ${todoApp.server?.hostname}:${todoApp.server?.port}`
);
