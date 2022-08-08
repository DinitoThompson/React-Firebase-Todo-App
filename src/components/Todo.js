import { React, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { AiFillEdit, AiOutlineSend } from "react-icons/ai";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const style = {
  icon: `cursor-pointer flex items-center w-4 h-4`,
};

function Todo({ todos, toggleTodo, deleteTodo }) {
  const [editID, setEditID] = useState("");
  const [updatedTodo, setUpdatedTodo] = useState("");

  function editTodo(id) {
    setEditID(id);
  }

  // Update Todo
  const updateTodo = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      text: updatedTodo,
    });
    setEditID("");
  };

  return todos.map((todo, index) => (
    <div
      key={index}
      className={
        todo.completed
          ? "flex justify-between items-center bg-slate-400 p-4 my-2 capitalize transition-all duration-300"
          : "flex justify-between items-center bg-slate-200 p-4 my-2 capitalize transition-all duration-300"
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
              className="border p-1 w-full text-xl text-center rounded-lg"
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
              className={style.icon}
            />
          </div>
        ) : (
          <p>{todo.text}</p>
        )}
      </div>

      {todo.id === editID ? (
        <div className="flex space-x-2">
          <GiCancel
            className={style.icon}
            onClick={() => {
              setEditID("");
            }}
          />
        </div>
      ) : (
        <div className="flex justify-between items-center space-x-2">
          {todo.completed ? (
            <BsToggleOff
              className={style.icon}
              onClick={() => {
                toggleTodo(todo);
              }}
            />
          ) : (
            <BsToggleOn
              className={style.icon}
              onClick={() => {
                toggleTodo(todo);
              }}
            />
          )}
          <BsTrashFill
            className={style.icon}
            onClick={() => {
              deleteTodo(todo.id);
            }}
          />
          <AiFillEdit
            className={style.icon}
            onClick={() => {
              editTodo(todo.id);
            }}
          />
        </div>
      )}
    </div>
  ));
}

export default Todo;
