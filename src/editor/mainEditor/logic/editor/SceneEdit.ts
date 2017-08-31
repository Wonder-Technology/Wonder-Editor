import {GameObject} from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";
import { Map } from "immutable";

export const setCurrentGameObject = (state:Map<any,any>,gameObject:GameObject) => {
    state.set("currentGameObject",gameObject);
};

export const getCurrentGameObject = (state:Map<any,any>) => {
    return state.get("currentGameObject");
};
