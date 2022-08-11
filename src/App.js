import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Protected from "./components/Protected";
import TodoList from "./components/TodoList";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/todolist"
            element={
              <Protected>
                <TodoList />
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
