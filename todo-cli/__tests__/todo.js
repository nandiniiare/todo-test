const { all, add, markAsComplete, overdue, dueToday, dueLater } = require('./todo');

describe('Todo List Tests', () => {
  beforeEach(() => {
    // Reset the todo list before each test
    all.length = 0;
  });

  test('Test to add a todo', () => {
    const newTodo = { title: 'Example Todo', dueDate: '2023-12-31', completed: false };
    add(newTodo);
    expect(all.length).toBe(1);
    expect(all[0]).toEqual(newTodo);
  });

  test('Test to mark a todo as complete', () => {
    const todo = { title: 'Example Todo', dueDate: '2023-12-31', completed: false };
    add(todo);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test('Test to retrieve overdue items', () => {
    const overdueTodo = { title: 'Overdue Todo', dueDate: '2022-01-01', completed: false };
    add(overdueTodo);
    const result = overdue();
    expect(result.length).toBe(1);
    expect(result[0]).toEqual(overdueTodo);
  });

  test('Test to retrieve due today items', () => {
    const dueTodayTodo = { title: 'Due Today Todo', dueDate: new Date().toISOString(), completed: false };
    add(dueTodayTodo);
    const result = dueToday();
    expect(result.length).toBe(1);
    expect(result[0]).toEqual(dueTodayTodo);
  });

  test('Test to retrieve due later items', () => {
    const dueLaterTodo = { title: 'Due Later Todo', dueDate: '2023-12-31', completed: false };
    add(dueLaterTodo);
    const result = dueLater();
    expect(result.length).toBe(1);
    expect(result[0]).toEqual(dueLaterTodo);
  });
});