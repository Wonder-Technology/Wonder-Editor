import { addGameObject } from "../../adaptor/SceneAdaptor";
import { createTriangle } from "./PrimitiveOper";
import { Map } from "immutable";
import { createCamera } from "./CameraOper";

export const addSceneChildren = addGameObject;
// export const getGameObjectScene = gameObjectScene;
//
// export const getSceneGameObjects = () => {
//     return getChildren(getGameObjectScene());
// };
//
// export const removeSceneGameObjects = () => {
//     removeAllChildren(getGameObjectScene());
// };

export const setDefaultScene = (state: Map<any, any>) => {
    var resultState = null,
        obj = null,
        camera = null;

    obj = createTriangle();
    camera = createCamera();
    resultState = state.setIn(["scene", "triangle"], obj);
    resultState = resultState.setIn(["scene", "camera"], camera);

    addSceneChildren(obj);
    addSceneChildren(camera);

    return resultState;
};
