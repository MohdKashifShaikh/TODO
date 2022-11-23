import React, { useState, useEffect } from "react";
import axios from "axios";

const TODOList = () => {
  document.title = "Todo App";
  const [todos, setTodos] = useState([]);
  const [item, setItem] = useState("");
  const [dataArr, setDataArr] = useState([]);

  useEffect(() => {
    const fetchFunction = async () => {
      const data = await fetch("https://jsonplaceholder.typicode.com/todos?userId=1");
      const jsonData = await data.json();
      console.log(jsonData);
      setTodos(jsonData);
    };
    fetchFunction();
  }, []);

  const addTodo = () => {
    setTodos((prev) => [...prev, { completed: false, title: item }]);
    setItem(""); //to clear the textfield after clicking on add button
  };

  const clearTodos = () => {
    setTodos([]);
  };

  const ItemTick = async (value, index, id) => {
    var arr = [...todos];
    arr[index].checked = value;
    setTodos(arr);
    const response = await axios({
      headers: {
        "content-type": "application/json; charset-UTF-8",
      },
      method: "PUT",
      url: `https://jsonplaceholder.typicode.com/todos?id=${id}`,
      data: {
        completed: value,
      },
    });

    console.log(response.data);
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
