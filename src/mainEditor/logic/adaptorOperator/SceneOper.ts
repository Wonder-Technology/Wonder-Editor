import { addGameObject } from "../../adaptor/SceneAdaptor";
import { createTriangle } from "./PrimitiveOper";
import { createCamera } from "./CameraOper";
import { GameObject } from "amyjs/dist/es2015/core/Entity/GameObject";
import { ISceneGraph } from "../interface/ISceneGraph";

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

export const setDefaultScene = () => {
    var result: ISceneGraph = {} as any,
        gameObject: GameObject = null,
        camera: GameObject = null;

    gameObject = createTriangle();
    camera = createCamera();

    addSceneChildren(gameObject);
    addSceneChildren(camera);

    _buildSceneGraphData("triangle", gameObject, result);
    _buildSceneGraphData("camera", camera, result);

    return result;
};

const _buildSceneGraphData = (name: string, gameObject: GameObject, sceneGraph: ISceneGraph) => {
    sceneGraph[name] = gameObject;
};
