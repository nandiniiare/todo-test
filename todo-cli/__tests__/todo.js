const all = [];

function add(todo) {
  all.push(todo);
}

function markAsComplete(index) {
  if (index >= 0 && index < all.length) {
    all[index].completed = true;
  }
}

function overdue() {
  // Assuming today is the current date
  const today = new Date();
  return all.filter((todo) => {
    const todoDueDate = new Date(todo.dueDate);
    return !todo.completed && todoDueDate < today;
  });
}

function dueToday() {
  // Assuming today is the current date
  const today = new Date();
  return all.filter((todo) => {
    const todoDueDate = new Date(todo.dueDate);
    return !todo.completed && todoDueDate.toDateString() === today.toDateString();
  });
}

function dueLater() {
  // Assuming today is the current date
  const today = new Date();
  return all.filter((todo) => {
    const todoDueDate = new Date(todo.dueDate);
    return !todo.completed && todoDueDate > today;
  });
}

module.exports = { all, add, markAsComplete, overdue, dueToday, dueLater };