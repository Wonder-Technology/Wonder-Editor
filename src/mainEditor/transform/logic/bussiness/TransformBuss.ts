import { rotate, translate } from "../adaptorOperator/GameObjectOper";
import { getTriangleFromState } from "../../../logic/editor/SceneGameObjectEdit";
import { getState } from "../../../logic/editor/StateManagerEdit";
import { GameObject } from "amyjs/dist/es2015/core/Entity/GameObject";

export const setTriangleTranslation = (x: number, y: number, z: number) => {
    translate(_getTriangle(), x, y, z);
};

export const setEulerAngle = (gameObject: GameObject, angle: number, x: number, y: number, z: number) => {
    rotate(gameObject, angle, x, y, z);
};

export const setTriangleEulerAngle = (angle: number, x: number, y: number, z: number) => {
    setEulerAngle(_getTriangle(), angle, x, y, z);
};

const _getTriangle = () => {
    return getTriangleFromState(getState());
};
