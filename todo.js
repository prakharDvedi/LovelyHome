export default function initTodo() {
  const input = document.getElementById("todo-input");
  const addBtn = document.getElementById("add-todo-btn");
  const todoList = document.getElementById("todo-list");

  // Load from local storage
  let todos = JSON.parse(localStorage.getItem("lovely_todos")) || [];

  function save() {
    localStorage.setItem("lovely_todos", JSON.stringify(todos));
  }

  function render() {
    todoList.innerHTML = "";
    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.className = `todo-item ${todo.completed ? "completed" : ""}`;
      li.dataset.id = todo.id;

      const span = document.createElement("span");
      span.textContent = todo.text;

      // Delete button (appears on hover effectively via layout, or just always visible for simplicity)
      // For this design, we'll keep it clean: Text content primarily.

      li.appendChild(span);

      // Click to toggle
      li.addEventListener("click", () => {
        todo.completed = !todo.completed;
        save();
        render();
      });

      // Double click to delete
      li.addEventListener("dblclick", (e) => {
        e.stopPropagation(); // Prevent toggle
        todos = todos.filter((t) => t.id !== todo.id);
        save();
        render();
      });

      todoList.appendChild(li);
    });
  }

  function addTodo() {
    const text = input.value.trim();
    if (!text) return;

    todos.push({
      id: Date.now(),
      text,
      completed: false,
    });

    input.value = "";
    save();
    render();
  }

  // Event Listeners
  addBtn.addEventListener("click", addTodo);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTodo();
  });

  // Initial Render
  render();
}
