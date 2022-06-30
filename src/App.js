import TodoList from "./components/TodoList";
import "./App.css"

function App() {
  return (
    <div className="todo-app">
      {/* Calls the todo list which contains the Todo Form 
      and the Todo Results */}
      <TodoList/>
    </div>
  );
}

export default App;
