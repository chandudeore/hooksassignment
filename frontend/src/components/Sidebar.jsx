import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../Redux/Login/action";
import { Profile } from "./Profile";
import { TagStats } from "./TagStats";

export const Sidebar = ({ token, username, todos }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <Profile token={token} username={username} />
      <hr />
      <TagStats todos={todos} />
      <hr />
      <button onClick={() => dispatch(logOut())}>LOG OUT</button>
    </div>
  );
};
