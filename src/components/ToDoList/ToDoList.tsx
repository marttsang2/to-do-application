import React, { useState } from "react";
import "./index.css";
import ToDoItem from "../ToDoItem/ToDoItem";
import AddToDo from "../AddToDo/AddToDo";

const ToDoList: React.FC = () => {
  const [todoList, setTodoList] = useState<string[]>(() => {
    const saved = localStorage.getItem("todo-list");
    if (!saved) return [];
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  })

  const [isEditing, setIsEditing] = React.useState<Record<number,boolean>>({});

  const toggleEditing = (index: number) => {
    setIsEditing((prev) => ({ [index]: !prev[index] }));
  }

  const removeToDoItem = (index: number) => {
    setTodoList((prev) => prev.filter((_, i) => i !== index));
    localStorage.setItem("todo-list", JSON.stringify(todoList));
  };

  const editToDoItem = (index: number, item: string) => {
    setTodoList((prev) => prev.map((todo, i) => (i === index ? item : todo)));
    localStorage.setItem("todo-list", JSON.stringify(todoList));
  };
  return (
    <div className="todo-list-wrapper">
        <AddToDo todoList={todoList} setTodoList={setTodoList} />   
        <div className="todo-item-group">
          {
            todoList.length === 0 && (
                <p>No items in the list</p>
            )
          }
          {todoList.length > 0 && todoList.map((item, index) => (
              <ToDoItem
                index={index} 
                item={item}
                removeToDoItem={removeToDoItem}
                editToDoItem={editToDoItem}
                isEditing={isEditing[index]}
                toggleEditing={toggleEditing}
              />
          ))}
        </div>
    </div>
  );
};

export default ToDoList;
