import { addTodo, deleteTodo } from "./Redux/todo";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  function hendalClick(e) {
    dispatch(deleteTodo(e));
  }

  const todo = useRef();
  const handleKeyDown = (event) => {
    let A = Date.now();
    let todos = {
      id: A,
      todo: todo.current.value,
    };
    if (event.key === "Enter") {
      dispatch(addTodo(todos));
      todo.current.value = "";
    }
  };

  return (
    <div className="container">
      <div className="App">
        <h1>Todo List</h1>
        <div className="form">
          <input type="text" ref={todo} onKeyDown={handleKeyDown} />
          <button>Add</button>
        </div>

        <ul>
          {todos.map((task, index) => {
            return (
              <li key={index}>
                {task.todo} {/* "todo" qismini chiqaring */}
                <div className="end">
                  <img src="/edit.png"></img>
                  <img
                    src="/delete.png"
                    onClick={() => {
                      hendalClick(task.id);
                    }}
                  ></img>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
