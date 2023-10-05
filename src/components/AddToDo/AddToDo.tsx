import React, { useState } from "react";
import "./index.css";

type AddToDoProps = {
  todoList: string[];
  setTodoList: React.Dispatch<React.SetStateAction<string[]>>;
};

const AddToDo: React.FC<AddToDoProps> = ({ todoList, setTodoList }) => {
  const [toDoItem, setToDoItem] = useState<string>("");

  const addToDoItem = (item: string) => {
    if (item === "") return;
    setToDoItem("");
    setTodoList((prev) => [...prev, item]);
    localStorage.setItem("todo-list", JSON.stringify([...todoList, item]));
  };

  return (
    <div className="add-todo-wrapper">
      <input
        className="add-todo-input"
        placeholder="Add a todo item"
        value={toDoItem}
        autoFocus
        onChange={(e) => setToDoItem(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addToDoItem(toDoItem);
          }
        }}
      />
      <button
        type="submit"
        className="add-todo-button"
        onClick={() => addToDoItem(toDoItem)}
      >
        <img src="/plus-icon.png" alt="plus icon" />
      </button>
    </div>
  );
};

export default AddToDo;
