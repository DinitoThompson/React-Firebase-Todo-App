import React, { useState, useEffect, useRef } from "react";

function TodoForm(props) {

  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const inputRef = useRef(null);

  // Auto focus on the form using the ref property in the form and the variable name
  useEffect(() => {
    inputRef.current.focus();
  });

  // Changes Input whenever something is typed in the field
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // Prevents the default form action when event submit occurs 
  // Assigns the respective values 
  // Resets the field to blank
  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    setInput("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input
            type="text"
            placeholder="Update Item..."
            value={input}
            name="text"
            className="todo-input edit"
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="todo-button edit">Update Item</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Add Item..."
            value={input}
            name="text"
            className="todo-input"
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="todo-button">Add Item</button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
