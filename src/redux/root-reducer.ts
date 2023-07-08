import { combineReducers } from "redux";
import ShoppingReducer from "./shopping/shopping.reducer";

const rootReducer = combineReducers({
  globalState: ShoppingReducer,
});

export default rootReducer;
