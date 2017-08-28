import { addGameObject } from "../../adaptor/SceneAdaptor";
import { createTriangle } from "./PrimitiveOper";
import { createCamera } from "./CameraOper";
import { ISceneGraph } from "../interface/ISceneGraph";
import { GameObject } from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";

export const setDefaultScene = () => {
    var result: ISceneGraph = {} as any,
        gameObject: GameObject = null,
        camera: GameObject = null;

    gameObject = createTriangle();
    camera = createCamera();

    addGameObject(gameObject);
    addGameObject(camera);

    _buildSceneGraphData("triangle", gameObject, result);
    _buildSceneGraphData("camera", camera, result);

    return result;
};

const _buildSceneGraphData = (name: string, gameObject: GameObject, sceneGraph: ISceneGraph) => {
    sceneGraph[name] = gameObject;
};
