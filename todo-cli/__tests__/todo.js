/* eslint-disable no-undef */
const db = require("../models");

const getJSDate = (days) => {
  if (!Number.isInteger(days)) {
    throw new Error("Need to pass an integer as days");
  }
  const today = new Date();
  const oneDay = 60 * 60 * 24 * 1000;
  return new Date(today.getTime() + days * oneDay).toISOString().split("T")[0];
}

describe("Tests for functions in todo.js", function () {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true })
  });

  test("Test to add a todo", () => {
    const todo = { title: "New Todo", dueDate: getJSDate(1), completed: false };
    db.Todo.addTask(todo);
    expect(db.Todo.all.length).toBe(1);
    expect(db.Todo.all[0]).toEqual(todo);
  });

  test("Test to mark a todo as complete", async () => {
    const todo = await db.Todo.addTask({ title: "Incomplete Todo", dueDate: getJSDate(1), completed: false });
    db.Todo.markAsComplete(todo.id);
    await todo.reload();
    expect(todo.completed).toBe(true);
  });

  test("Test to retrieve overdue items", async () => {
    const overdueTodo = { title: 'Overdue Todo', dueDate: getJSDate(-1), completed: false };
    db.Todo.addTask(overdueTodo);
    const result = await db.Todo.overdue();
    expect(result.length).toBe(1);
    expect(result[0]).toEqual(overdueTodo);
  });

  test("Test to retrieve due today items", async () => {
    const dueTodayTodo = { title: 'Due Today Todo', dueDate: getJSDate(0), completed: false };
    db.Todo.addTask(dueTodayTodo);
    const result = await db.Todo.dueToday();
    expect(result.length).toBe(1);
    expect(result[0]).toEqual(dueTodayTodo);
  });

  test("Test to retrieve due later items", async () => {
    const dueLaterTodo = { title: 'Due Later Todo', dueDate: getJSDate(2), completed: false };
    db.Todo.addTask(dueLaterTodo);
    const result = await db.Todo.dueLater();
    expect(result.length).toBe(1);
    expect(result[0]).toEqual(dueLaterTodo);
  });
});