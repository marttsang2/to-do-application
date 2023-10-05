import React from "react";
import "./index.css";

type ToDoItemProps = {
  index: number;
  item: string;
  removeToDoItem: (index: number) => void;
  editToDoItem: (index: number, item: string) => void;
  isEditing: boolean;
  toggleEditing: (index: number) => void;
};

const ToDoItem: React.FC<ToDoItemProps> = ({
  index,
  item,
  removeToDoItem,
  editToDoItem,
  isEditing,
  toggleEditing,
}) => {

  const handleSaveItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      toggleEditing(index);
    }
  }

  return (
    <div className="todo-item-wrapper">
      <input
        ref={inputElement => {
          // constructs a new function on each render
          if (inputElement) {
            inputElement.focus();
          }
        }}
        value={item}
        onChange={(e) => editToDoItem(index, e.target.value)}
        onKeyDown={handleSaveItem}
        disabled={!isEditing}
      />
      <div className="todo-item-buttons">
      <button onClick={() => toggleEditing(index)}>
        {isEditing ? "Save" : "Edit"}
      </button>
      <button onClick={() => removeToDoItem(index)}>Remove</button>
      </div>
    </div>
  );
};

export default ToDoItem;
