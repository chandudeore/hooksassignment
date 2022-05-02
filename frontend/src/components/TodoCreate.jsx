import React, { useReducer, useState } from "react";
import { v4 as uuid } from "uuid";
import { getTodosData } from "../Redux/Todos/action";
import { useDispatch } from "react-redux";

const initialState = {
  title: "",
  description: "",
  subtasks: [],
  status: "",
  tags: { official: false, personal: false, others: false },
  date: "",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_TITLE":
      return { ...state, title: payload };
    case "UPDATE_DESCRIPTION":
      return { ...state, description: payload };
    case "UPDATE_STATUS":
      return { ...state, status: payload };
    case "UPDATE_TAGS":
      return { ...state, tags: { ...state.tags, ...payload } };
    case "UPDATE_DATE":
      return { ...state, date: payload };
    case "UPDATE_SUBTASKS":
      return { ...state, subtasks: [...state.subtasks, payload] };
    case "TOGGLE_SUBTASKS":
      const subtasksAfterToggle = state.subtasks.map((ele) =>
        ele.id === payload.id ? { ...ele, subtaskStatus: payload.status } : ele
      );
      return { ...state, subtasks: subtasksAfterToggle };
    case "DELETE_SUBTASK":
      const subtaskAfterDelete = state.subtasks.filter(
        (el) => el.id != payload
      );

      return { ...state, subtasks: subtaskAfterDelete };
    default:
      throw new Error("Please give proper action object");
  }
};

export const TodoCreate = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const reduxDispatch = useDispatch();

  const [sub, setSub] = useState("");

  const createNewTask = () => {
    const payload = {
      ...state,
    };
    fetch("http://localhost:3001/todos", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    }).then(() => reduxDispatch(getTodosData));
  };

  const { title, description, subtasks, status, tags, date } = state;

  const { official, personal, others } = tags;

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            dispatch({ type: "UPDATE_TITLE", payload: e.target.value })
          }
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            dispatch({ type: "UPDATE_DESCRIPTION", payload: e.target.value })
          }
        />
        <br />
        <br />
        <div>
          <label>
            <input
              type="radio"
              checked={status === "Todo"}
              onChange={(e) => {
                dispatch({ type: "UPDATE_STATUS", payload: "Todo" });
              }}
            />
            Todo
          </label>
          <label>
            <input
              type="radio"
              checked={status === "InProgress"}
              onChange={(e) => {
                dispatch({ type: "UPDATE_STATUS", payload: "InProgress" });
              }}
            />
            InProgress
          </label>
          <label>
            <input
              type="radio"
              checked={status === "Done"}
              onChange={(e) => {
                dispatch({ type: "UPDATE_STATUS", payload: "Done" });
              }}
            />
            Done
          </label>
        </div>
        <br />
        <br />
        <div>
          <label>
            <input
              type="checkbox"
              checked={official}
              onChange={(e) => {
                dispatch({
                  type: "UPDATE_TAGS",
                  payload: { official: e.target.checked },
                });
              }}
            />
            Official
          </label>
          <label>
            <input
              type="checkbox"
              checked={personal}
              onChange={(e) => {
                dispatch({
                  type: "UPDATE_TAGS",
                  payload: { personal: e.target.checked },
                });
              }}
            />
            Personal
          </label>
          <label>
            <input
              type="checkbox"
              checked={others}
              onChange={(e) => {
                dispatch({
                  type: "UPDATE_TAGS",
                  payload: { others: e.target.checked },
                });
              }}
            />
            Others
          </label>
        </div>
        <br />
        <br />
        <input
          type="date"
          value={date}
          onChange={(e) => {
            dispatch({ type: "UPDATE_DATE", payload: e.target.value });
          }}
        />
        <br />
        <br />
        <br />
        <br />
        <h1>Create Subtasks</h1>
        <input
          type="text"
          value={sub}
          onChange={(e) => {
            setSub(e.target.value);
          }}
        />
        <button
          onClick={() => {
            const payload = {
              id: uuid(),
              subtasksTitle: sub,
              subtaskStatus: false,
            };

            dispatch({ type: "UPDATE_SUBTASKS", payload });
          }}
        >
          Add Subtask
        </button>
        <div>
          {subtasks.map((el) => (
            <div key={el.id} style={{ display: "flex" }}>
              <label>
                <input
                  type="checkbox"
                  checked={el.subtaskStatus}
                  onChange={(e) =>
                    dispatch({
                      type: "TOGGLE_SUBTASKS",
                      payload: { id: el.id, status: e.target.checked },
                    })
                  }
                />
                {el.subtasksTitle}
              </label>
              <button
                onClick={() =>
                  dispatch({ type: "DELETE_SUBTASK", payload: el.id })
                }
              >
                Delete Subtask
              </button>
            </div>
          ))}
        </div>
        <button onClick={createNewTask}>Create Task</button>
      </div>
    </>
  );
};
