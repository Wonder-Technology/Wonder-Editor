import { addGameObject, getScene } from "../../adaptor/SceneAdaptor";
import { createTriangle } from "./PrimitiveOper";
import { createCamera } from "./CameraOper";
import { GameObject } from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";
import { getChildren, setParent } from "../../adaptor/GameObjectAdaptor";
import { translateLocal } from "./TransformOper";
import { getTransform } from "../../transform/logic/adaptorOperator/GameObjectOper";

export const setDefaultScene = () => {
    var gameObject: GameObject = null,
        camera: GameObject = null;

    gameObject = createTriangle();
    camera = createCamera();

    addGameObject(camera);
    addGameObject(gameObject);

    var obj1 = createTriangle();
    var obj2 = createTriangle();

    setParent(gameObject,obj1);
    setParent(gameObject,obj2);

    translateLocal(getTransform(obj1),0.5,0.6,0);
    translateLocal(getTransform(obj2),-0.5,0.6,0);
};

export const getSceneChildren = () => {
    return getChildren(getScene());
};
