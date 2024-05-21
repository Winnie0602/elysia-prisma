import { Elysia, t } from "elysia";
import {
  getTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodoById,
} from "./handler";

const todoRoutes = new Elysia({ prefix: "/todos" })
  .get("/", () => getTodos())
  .post("/", ({ body }) => createTodo(body), {
    body: t.Object({ title: t.String(), description: t.String() }),
  })
  .get("/:id", ({ params: { id } }) => getTodoById(id), {
    params: t.Object({ id: t.Numeric() }),
  })
  .patch("/:id", ({ params: { id }, body }) => updateTodo(id, body), {
    body: t.Object({
      title: t.String(),
      description: t.String(),
      completed: t.Optional(t.Boolean()),
    }),
    params: t.Object({ id: t.Numeric() }),
  })
  .delete("/:id", ({ params: { id } }) => deleteTodoById(id), {
    params: t.Object({ id: t.Numeric() }),
  })
  .listen(3000);

export default todoRoutes;
