import { React, useState, useEffect } from "react";
import Todo from "./Todo";
import { db } from "../firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import Navbar from "./Navbar";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // Create Todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a Todo !");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };
  // Delete Todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };
  // Completed Todo
  const toggleTodo = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  const todosTodo = () => {
    let remainingTodo = 0;
    // eslint-disable-next-line array-callback-return
    todos.map((todo) => {
      if (!todo.completed) remainingTodo = remainingTodo + 1;
    });
    return remainingTodo;
  };

  // Read/Render Todos
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full h-screen flex-col bg-gradient-to-tr from-blue-900 to-purple-600 p-6 flex items-center justify-center">
        <div className="bg-[#161a2b] max-w-[600px] w-full mx-auto rounded-lg shadow-xl p-8 space-y-4">
          <h1 className="text-3xl font-bold text-center uppercase text-white p-2 tracking-widest">
            Firebase ToDo Application
          </h1>
          <form onSubmit={createTodo} className="flex space-x-0 rounded">
            <input
              type="text"
              className="p-2 w-full text-xl text-center focus:outline-none rounded-l-lg"
              placeholder="Add Item..."
              value={input}
              name="text"
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button className="p-4 ml-2 bg-gradient-to-r from-purple-800 to-purple-500 rounded-r-lg hover:scale-105 duration-300 text-slate-100 w-[150px]">
              Add Item
            </button>
          </form>

          <Todo todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />

          {todosTodo() === 0 && todos.length !== 0 ? (
            <h1 className="text-xl tracking-widest font-medium text-center uppercase text-gray-400 pt-8">
              Congrats, All Todos are Completed
            </h1>
          ) : (
            <h1 className="text-xl tracking-widest font-medium text-center uppercase text-gray-400 pt-8">
              You have {todosTodo()} Todos Todo{" "}
            </h1>
          )}
        </div>
      </div>
    </>
  );
}

export default TodoList;
