import { React, useState } from "react";
import { AiFillEdit, AiOutlineSend } from "react-icons/ai";
import { BsToggleOn, BsToggleOff, BsTrashFill } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const style = {
  icon: `cursor-pointer flex items-center w-4 h-4`,
};

function Todo({ todos, toggleTodo, deleteTodo }) {
  const [editID, setEditID] = useState("");
  const [updatedTodo, setUpdatedTodo] = useState("");

  function editTodo(todo) {
    setUpdatedTodo("");
    setEditID(todo.id);
  }

  // Update Todo
  const updateTodo = async (todo) => {
    if (updatedTodo === "") {
      alert("Enter A Valid Todo");
      return;
    }
    await updateDoc(doc(db, "todos", todo.id), {
      text: updatedTodo,
    });
    setEditID("");
    setUpdatedTodo("");
  };

  return todos.map((todo, index) => (
    <div
      key={index}
      className={
        todo.completed
          ? "flex justify-between items-center bg-slate-300 text-white opacity-70 font-medium p-4 my-2 text-xl capitalize transition-all duration-300"
          : "flex justify-between items-center bg-gradient-to-r from-blue-800 to-blue-700 text-white font-medium p-4 my-2 text-xl capitalize transition-all duration-300"
      }
    >
      <div
        key={todo.id}
        className={todo.completed ? "line-through ml-2" : "ml-2"}
      >
        {todo.id === editID ? (
          <div className="flex items-center justify-center space-x-4">
            <input
              type="text"
              className="border p-1 w-full text-xl text-center focus:outline-none text-black rounded-lg tracking-widest"
              placeholder={todo.text}
              value={updatedTodo}
              name="text"
              onChange={(e) => {
                setUpdatedTodo(e.target.value);
              }}
            />
            <AiOutlineSend
              onClick={() => {
                updateTodo(todo);
              }}
              className={`w-6 h-6 ${style.icon}`}
            />
          </div>
        ) : (
          <p>{todo.text}</p>
        )}
      </div>

      {todo.id === editID ? (
        <div className="flex space-x-2">
          <GiCancel
            className={`w-5 h-5 ${style.icon}`}
            onClick={() => {
              setEditID("");
            }}
          />
        </div>
      ) : (
        <div className="flex justify-between items-center space-x-2">
          {todo.completed ? (
            <BsToggleOff
              className={`w-5 h-5 ${style.icon}`}
              onClick={() => {
                toggleTodo(todo);
              }}
            />
          ) : (
            <BsToggleOn
              className={`w-5 h-5 ${style.icon}`}
              onClick={() => {
                toggleTodo(todo);
              }}
            />
          )}
          <BsTrashFill
            className={`w-5 h-5 ${style.icon}`}
            onClick={() => {
              deleteTodo(todo.id);
            }}
          />
          <AiFillEdit
            className={`w-5 h-5 ${style.icon}`}
            onClick={() => {
              editTodo(todo);
            }}
          />
        </div>
      )}
    </div>
  ));
}

export default Todo;
