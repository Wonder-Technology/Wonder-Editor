import { addGameObject } from "../../adaptor/SceneAdaptor";
import { createTriangle } from "./PrimitiveOper";
import { createCamera } from "./CameraOper";
export var setDefaultScene = function () {
    var result = {}, gameObject = null, camera = null;
    gameObject = createTriangle();
    camera = createCamera();
    addGameObject(gameObject);
    addGameObject(camera);
    _buildSceneGraphData("triangle", gameObject, result);
    _buildSceneGraphData("camera", camera, result);
    return result;
};
var _buildSceneGraphData = function (name, gameObject, sceneGraph) {
    sceneGraph[name] = gameObject;
};
//# sourceMappingURL=SceneOper.js.map