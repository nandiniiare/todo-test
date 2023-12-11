/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const db = require("../models");

const getJSDate = (days) => {
  if (!Number.isInteger(days)) {
    throw new Error("Need to pass an integer as days");
  }
  const today = new Date();
  const oneDay = 60 * 60 * 24 * 1000;
  return new Date(today.getTime() + days * oneDay);
};

describe("Tests for functions in todo.js", function () {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });

  test("Test to add a todo", async () => {
    const todo = await db.Todo.addTask({
      title: "Sample todo",
      dueDate: getJSDate(3),
      completed: false,
    });
    expect(todo.id).toBeDefined();
    // Additional assertions based on your implementation
  });

  test("Test to mark a todo as complete", async () => {
    const todo = await db.Todo.addTask({
      title: "Sample todo",
      dueDate: getJSDate(3),
      completed: false,
    });

    await db.Todo.markAsComplete(todo.id);

    const updatedTodo = await db.Todo.findByPk(todo.id);
    expect(updatedTodo.completed).toBe(true);
    // Additional assertions based on your implementation
  });

  test("Test to retrieve overdue items", async () => {
    const overdueTodo = await db.Todo.addTask({
      title: "Overdue todo",
      dueDate: getJSDate(-1),
      completed: false,
    });

    const overdueItems = await db.Todo.overdue();
    expect(overdueItems.length).toBe(1);
    expect(overdueItems[0].id).toBe(overdueTodo.id);
    // Additional assertions based on your implementation
  });

  test("Test to retrieve due today items", async () => {
    const dueTodayTodo = await db.Todo.addTask({
      title: "Due today todo",
      dueDate: getJSDate(0),
      completed: false,
    });

    const dueTodayItems = await db.Todo.dueToday();
    expect(dueTodayItems.length).toBe(1);
    expect(dueTodayItems[0].id).toBe(dueTodayTodo.id);
    // Additional assertions based on your implementation
  });

  test("Test to retrieve due later items", async () => {
    const dueLaterTodo = await db.Todo.addTask({
      title: "Due later todo",
      dueDate: getJSDate(2),
      completed: false,
    });

    const dueLaterItems = await db.Todo.dueLater();
    expect(dueLaterItems.length).toBe(1);
    expect(dueLaterItems[0].id).toBe(dueLaterTodo.id);
    // Additional assertions based on your implementation
  });
});
