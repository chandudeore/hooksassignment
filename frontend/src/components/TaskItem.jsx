import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getTodosData } from "../Redux/Todos/action";

const TaskitemWrapper = styled.div`
  margin: 5px;
  padding: 5px;
  border: 1px solid #cecece;
  font-size: 14px;
`;

const HeadSection = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const SubtaskSection = styled.div``;

export const TaskItem = (props) => {
  const dispatch = useDispatch();
  const { title, description, subtasks, status, tags, date, id } = props;

  const { personal, official, others } = tags;

  return (
    <TaskitemWrapper>
      <HeadSection>
        <div>
          <p>{title}</p>
          <p>
            {personal && "PERSONAL"} {official && "OFFICIAL"}{" "}
            {others && "OTHERS"}
          </p>
          <p>{description}</p>
        </div>
        <div>{date}</div>
      </HeadSection>
      <SubtaskSection>
        {subtasks.map((subtask) => (
          <div key={subtask.id}>
            <label>
              <input
                type="checkbox"
                checked={subtask.subtaskStatus}
                onChange={(e) => {
                  const taskAfterToggle = subtasks.map((item) =>
                    item.id === subtask.id
                      ? { ...subtask, subtaskStatus: e.target.checked }
                      : item
                  );
                  const payload = {
                    title,
                    description,
                    date,
                    tags,
                    subtasks: taskAfterToggle,
                    status,
                  };
                  fetch(`http://localhost:3001/todos/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }).then(() => dispatch(getTodosData()));
                }}
              />
            </label>
            {subtask.subtasksTitle}
          </div>
        ))}
      </SubtaskSection>
    </TaskitemWrapper>
  );
};
