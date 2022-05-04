import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getTodosData } from "../Redux/Todos/action";
import { Sidebar } from "./Sidebar";
import { TaskContainer } from "./TaskContainer";

const Container = styled.div`
  margin: 0;
  padding: 25px;
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  height: 100vh;
  gap: 20px;
`;

const GridItem1 = styled.div`
  grid-column: 1/3;
`;

const GridItem2 = styled.div`
  grid-column: 3/6;
`;

const GridItem3 = styled.div`
  grid-column: 6/9;
`;

const GridItem4 = styled.div`
  grid-column: 9/12;
`;

export const Home = () => {
  const { token, username } = useSelector((state) => state.login);

  const { todos } = useSelector((state) => state.todos);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodosData());
  }, []);

  return (
    <>
      <Container>
        <GridItem1>
          <Sidebar token={token} username={username} todos={todos}></Sidebar>
        </GridItem1>
        <GridItem2>
          <TaskContainer
            task={todos.filter((item) => item.status === "Todo")}
            color="#B99095"
            heading="TODOS"
          />
        </GridItem2>
        <GridItem3>
          <TaskContainer
            task={todos.filter((item) => item.status === "InProgress")}
            color="#FCB5AC"
            heading="IN PROGRESS"
          />
        </GridItem3>
        <GridItem4>
          <TaskContainer
            task={todos.filter((item) => item.status === "Done")}
            color="#B5E5CF"
            heading="DONE"
          />
        </GridItem4>
      </Container>
    </>
  );
};
