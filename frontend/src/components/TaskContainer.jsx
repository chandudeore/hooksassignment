import React from "react";
import styled from "styled-components";
import { TaskItem } from "./TaskItem";

const Wrapper = styled.div`
  overflow-y: scroll;
`;
const HeadingWrapper = styled.p`
  text-align: center;
  background-color: ${(props) => props.color};
  padding: 22px;
`;

export const TaskContainer = ({ task, color, heading }) => {
  return (
    <Wrapper>
      <HeadingWrapper color={color}>{heading}</HeadingWrapper>
      {task.map((task) => (
        <TaskItem key={task.id} {...task} />
      ))}
    </Wrapper>
  );
};
