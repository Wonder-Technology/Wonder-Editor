import { EditorData } from "./EditorData";
import { Map } from "immutable";
export var createState = function () {
    return Map();
};
export var getState = function () {
    return EditorData.state;
};
export var setState = function (state) {
    EditorData.state = state;
};
//# sourceMappingURL=StateManagerEdit.js.map