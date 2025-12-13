import React, { useState } from "react";
import { useTodos } from "./useTodos";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

function App() {
  const { todos, dispatch, ACTIONS } = useTodos();
  const [filter, setFilter] = useState("all");
  const [editTask, setEditTask] = useState(null);

  const handleAdd = (text) => {
    if (editTask) {
      dispatch({ type: ACTIONS.EDIT, payload: { id: editTask.id, text } });
      setEditTask(null);
    } else {
      dispatch({ type: ACTIONS.ADD, payload: { text } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">TodoInput</h1>
      <TodoInput onAdd={handleAdd} editTask={editTask} />

      <h2 className="text-xl font-semibold mb-3">TodoList</h2>
      <div className="flex space-x-4 mb-6">
        {["all", "done", "todo"].map((f) => (
          <button
            key={f}
            className={`px-6 py-2 rounded ${
              filter === f ? "bg-teal-500 text-white" : "bg-teal-200"
            }`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <TodoList
        todos={todos}
        filter={filter}
        onToggle={(id) => dispatch({ type: ACTIONS.TOGGLE, payload: { id } })}
        onDelete={(id) => dispatch({ type: ACTIONS.DELETE, payload: { id } })}
        onEdit={(todo) => setEditTask(todo)}
      />

      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => dispatch({ type: ACTIONS.DELETE_DONE })}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Delete done tasks
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.DELETE_ALL })}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Delete all tasks
        </button>
      </div>
    </div>
  );
}

export default App;

