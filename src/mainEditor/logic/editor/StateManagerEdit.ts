import { EditorData } from "./EditorData";
import { Map } from "immutable";

export const createState = () => {
    return Map();
};

export const getState = () => {
    return EditorData.state;
};

export const setState = (state: Map<any, any>) => {
    EditorData.state = state;
};