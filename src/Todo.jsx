import React, { useState, useEffect } from "react";
import axios from "axios";

const TODOList = () => {
  document.title = "Todo App";
  const [todos, setTodos] = useState([]);
  const [item, setItem] = useState("");

  const addTodo = () => {
    if (item === "") {
      alert("Please add todo!");
      return false;
    } else {
      setTodos((prev) => [...prev, { completed: false, title: item }]);
      setItem(""); //to clear the textfield after clicking on add button
    }
  };

  const clearTodos = () => {
    const boolValue = window.confirm("Are you sure to delete all todos ?");
    if (boolValue) {
      setTodos([]);
    }
    return false;
  };

  const ItemTick = async (value, index, id) => {
    var arr = [...todos];
    arr[index].checked = value;
    setTodos(arr);
  };

  const comp = todos.filter((el) => el.checked === true);
  const incomp = todos.filter((el) => el.checked === false);

  const removeTodo = (index) => {
    setTodos((prev) =>
      [...prev].filter((el, idx) => {
        return idx !== index;
      })
    );
  };

  return (
    <div>
      <h3>TODO APP</h3>
      <input
        type="text"
        placeholder="Enter Todo"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <button onClick={clearTodos}>Clear Todos</button>
      <ul>
        {todos.map((value, index) => {
          return (
            <li key={index} style={{ marginTop: 8 }}>
              <input
                type="checkbox"
                checked={value.checked}
                onChange={(e) => ItemTick(e.target.checked, index, value.id)}
              />
              <span
                style={{
                  textDecoration: value.checked ? "line-through" : "none",
                  marginRight: 8,
                }}
              >
                {value.title}
              </span>
              <button onClick={() => removeTodo(index)}>Delete</button>
            </li>
          );
        })}
      </ul>
      <p>completed task:{comp.length}</p>
      <p>incomplete task:{incomp.length}</p>
    </div>
  );
};

export default TODOList;
