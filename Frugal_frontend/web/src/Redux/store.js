import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { allReducer } from "./Reducer";


const rootReducer = combineReducers({
    root: allReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
