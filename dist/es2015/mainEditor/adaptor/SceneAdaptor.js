import { getDirector } from "./DirectorAdaptor";
import { addSceneChild } from "wonder.js/dist/es2015/core/entityObject/scene/Scene";
export var getScene = function () {
    return getDirector().scene;
};
export var addGameObject = function (gameObject) {
    addSceneChild(getScene(), gameObject);
};
//# sourceMappingURL=SceneAdaptor.js.map