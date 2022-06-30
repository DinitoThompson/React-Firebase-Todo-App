import React, { useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    // Checks to make sure there is an actual text in the field
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    // If the text exist, create a new todo and passes it. 
    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };

  // Updates the previous todo, to whatever the new Todo is (ID, Value)
  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  // Filters the array of todos and returns an array that doesnt contain
  // the todo that has the specified ID, then passes that to the setTodos
  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removeArr);
  };

  // Crosses out a ToDo from the list
  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>What is the plan for today ? </h1>
      {/* Calls The ToDo Form and passes the user input */}
      <TodoForm onSubmit={addTodo} />

      {/* Calls each Todo & each function declared above to the Todo */}
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />

    </div>
  );
}

export default TodoList;
