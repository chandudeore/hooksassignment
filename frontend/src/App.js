import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { TodoCreate } from "./components/TodoCreate";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";

const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to={"/login"}></Navigate>;
};

function App() {
  const { isAuthenticated } = useSelector((state) => state.login);
  return (
    <div className="App">
      <div>
        <Box bg="#AB46D2" w="100%" p={4} color="white" display="flex" gap="5">
          <Box as="button" bg="#FF6FB5" borderRadius="md" px={4} h={8}>
            <Link to="/">Home</Link>
          </Box>
          <Box as="button" bg="#FF6FB5" borderRadius="md" px={4} h={8}>
            <Link to="/login">Login</Link>
          </Box>
          <Box as="button" bg="#FF6FB5" borderRadius="md" px={4} h={8}>
            <Link to="/todos-create">Todos</Link>
          </Box>
        </Box>
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
