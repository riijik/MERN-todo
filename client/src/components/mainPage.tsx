import React, { useState, useEffect } from "react";
import superagent from "superagent";
import { useNavigate } from "react-router-dom";

export function MainPage() {
  const [inputValue, setInput] = useState("");
  const [toDoList, setTodoList] = useState<Action[]>([]);
  const navigate = useNavigate();

  const createPost = async (inputVal: string) => {
    const task = { action: inputVal };
    const post = await superagent
      .post("/todo")
      .set("authorization", localStorage.token)
      .send(task);
    const newTask: Action = post.body.newTask;
    setTodoList([...toDoList, newTask]);
    setInput("");
  };

  const deletePost = async (id: number) => {
    const requestForDelete = await superagent
      .delete(`/todo/${id}`)
      .set("authorization", localStorage.token);
    const deletedTask: Action = requestForDelete.body;
    setTodoList((prev) => prev.filter((task) => task._id !== deletedTask._id));
  };

  const exit = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    getTaskList().then((data) => setTodoList(data));
  }, []);
  // c пустым массивом не обновляется стэйт с зависимостью бесконечно обращается к беку
  useEffect(() => {}, [toDoList]);

  return (
    <div>
      <input
        value={inputValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInput(event?.target.value);
        }}
      />
      <button onClick={() => createPost(inputValue)}>Создать</button>
      <button onClick={exit}>Выйти</button>
      {toDoList.map((item) => {
        return (
          <p
            key={item._id}
            onClick={() => {
              deletePost(item._id);
            }}
          >
            {item.action}
          </p>
        );
      })}
    </div>
  );
}

interface Action {
  _id: number;
  action: string;
  owner: number;
}

async function getTaskList() {
  const data = await superagent
    .get("/todo")
    .set("Authorization", localStorage.token);
  return data.body;
}
