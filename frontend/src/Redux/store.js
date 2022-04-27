import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { loginReducer } from "./Login/reducer";
import thunk from "redux-thunk";
import { todosReducer } from "./Todos/reducer";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const middleware = [thunk];

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
  // other store enhancers if any
);
const rootReducer = combineReducers({
  login: loginReducer,
  todos: todosReducer,
});
export const store = createStore(rootReducer, enhancer);

//create store takes three arguments (reducer, initial state,enhancer)
