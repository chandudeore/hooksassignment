import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Profile } from "./Profile";

const Container = styled.div`
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  height: 100vh;
  gap: 30px;
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

  return (
    <>
      <Container>
        <GridItem1>
          <Profile token={token} username={username}></Profile>
        </GridItem1>
        <GridItem2>TODO</GridItem2>
        <GridItem3>PROGRESS</GridItem3>
        <GridItem4>DONE</GridItem4>
      </Container>
    </>
  );
};
