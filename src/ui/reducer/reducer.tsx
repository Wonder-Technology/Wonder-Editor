import {combineReducers} from "redux";
import {position, angle } from "../../mainEditor/ui/reducer/reducer";

export const rootReducer = combineReducers({
    position,
    angle
});

