import {hasComponent} from "../../../../src/editor/mainEditor/adaptor/GameObjectAdaptor";
import {CameraController} from "wonder.js/dist/es2015/component/camera/CameraController";
import {Geometry} from "wonder.js/dist/es2015/component/geometry/Geometry";
import {getSceneChildren} from "../../../../src/editor/mainEditor/logic/adaptorOperator/SceneOper";

export const getTriangles = () => {
    var children = getSceneChildren();

    return children.filter(function (item) {
        return _isTriangle(item);
    });
}

export const getCameras = () => {
    var children = getSceneChildren();

    return children.filter(function (item) {
        return _isCamera(item);
    });
}

const _isTriangle = (gameObject) => {
    return hasComponent(gameObject, Geometry) === true;
}

const _isCamera = (gameObject) => {
    return hasComponent(gameObject, CameraController) === true;
}
