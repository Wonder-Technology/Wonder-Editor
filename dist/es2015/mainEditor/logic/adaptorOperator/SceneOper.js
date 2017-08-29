import { addGameObject, getScene } from "../../adaptor/SceneAdaptor";
import { createTriangle } from "./PrimitiveOper";
import { createCamera } from "./CameraOper";
import { getChildren } from "../../adaptor/GameObjectAdaptor";
export var setDefaultScene = function () {
    var gameObject = null, camera = null;
    gameObject = createTriangle();
    camera = createCamera();
    addGameObject(gameObject);
    addGameObject(camera);
    //todo do not need the sceneGraph
    // _buildSceneGraphData("triangle", gameObject, result);
    // _buildSceneGraphData("camera", camera, result);
    // return result;
};
export var getSceneChildren = function () {
    return getChildren(getScene());
};
// const _buildSceneGraphData = (name: string, gameObject: GameObject, sceneGraph: ISceneGraph) => {
//     sceneGraph[name] = gameObject;
// };
//# sourceMappingURL=SceneOper.js.map