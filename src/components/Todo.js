import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

import TodoForm from "./TodoForm";

// Accepts these functions as parameters from TodoList so  they can be used.
function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  // Passes the new Values to the updateTodo Function
  // Resets setEdit
  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    // Changes props in the todo form to prop.edit
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  // Maps the todos, to the todo passed above.
  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? "todo-row complete" : "todo-row"}
      key={index}
    >
      {/* Calls the completeTodo Function to cross it off the list */}
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>

      <div className="icons">
        {/* Calls the removeTodo Function to remove it from the list */}
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className="delte-icon"
        />

        {/* Calls the setEdit Function to edit the specific todo */}
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className="edit-icon"
        />
      </div>
    </div>
  ));
}

export default Todo;
