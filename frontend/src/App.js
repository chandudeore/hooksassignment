import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { TodoCreate } from "./components/TodoCreate";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to={"/login"}></Navigate>;
};

function App() {
  const { isAuthenticated } = useSelector((state) => state.login);
  return (
    <div className="App">
      <div>
        <div>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/todos-create">Todos</Link>
        </div>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Home />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/todos-create"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <TodoCreate />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
