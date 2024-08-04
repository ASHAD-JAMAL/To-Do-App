import React, { useEffect, useState } from "react";
import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completeTodos, setCompleteTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setAllTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };
  const handleDeleteTodo = (index) => {
    let reduceTodo = [...allTodos];
    reduceTodo.splice(index);

    localStorage.setItem("todolist", JSON.stringify(reduceTodo));
    setAllTodos(reduceTodo);
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let completedOn = dd + "-" + mm + "-" + yyy + "at" + h + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn
    };
    let updatedCompletedArr = [...completeTodos];
    updatedCompletedArr.push(filteredItem);
    setCompleteTodos(updatedCompletedArr);
    handleDeleteTodo(index);
  };
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    if (savedTodo) {
      setAllTodos(savedTodo);
    }
  }, []);
  return (
    <div className="App">
      <h1>My Todo App</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What's The Task Title?"
            />
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="What's The Task Description?"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {isCompleteScreen === false  && allTodos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineDelete
                    className="icon"
                    title="Delete"
                    onClick={() => handleDeleteTodo(index)}
                  />
                  <BsCheckLg
                    className="check-icon"
                    onClick={() => handleComplete(index)}
                    title="Complete"
                  />
                </div>
              </div>
            );
          })}
           {isCompleteScreen === true  && completeTodos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>completed On :{item.completedOn}</small></p>
                </div>
                <div>
                  <AiOutlineDelete
                    className="icon"
                    title="Delete"
                    onClick={() => handleDeleteTodo(index)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
