import {getCurrentGameObject as getCurrentGameObjectEdit} from "..//editor/SceneEdit";
import {getState} from "../editor/StateManagerEdit";

export const getCurrentGameObject = () => {
    return getCurrentGameObjectEdit(getState());
};
