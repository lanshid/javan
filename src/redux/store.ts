import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./root-reducer";

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
