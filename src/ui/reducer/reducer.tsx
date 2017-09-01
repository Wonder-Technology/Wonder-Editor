import {combineReducers} from "redux";

export const rootReducer = combineReducers({
  nop: (state=0, action) => state // disable error
});

