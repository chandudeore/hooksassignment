import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../Redux/Login/action";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.login);
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  const handleLogin = () => {
    const userDetail = {
      username,
      password,
    };
    dispatch(login(userDetail));
  };

  return (
    <>
      <div
        style={{
          marginTop: "20px",
        }}
      >
        <form>
          <Input
            focusBorderColor="lime"
            size="md"
            width="250px"
            type="text"
            placeholder="Enter Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />
          <br />
          <Input
            focusBorderColor="lime"
            size="md"
            width="250px"
            type="text"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />
          <br />
          <Button onClick={handleLogin} size="md" colorScheme="teal">
            Login
          </Button>
        </form>
      </div>
    </>
  );
};
