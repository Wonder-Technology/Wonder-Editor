import { translateLocal } from "../../../../logic/adaptorOperator/TransformOper";
import { getTransform } from "../adaptorOperator/GameObjectOper";
import { getCurrentGameObject } from "../../../../logic/bussiness/SceneBuss";

export const setCurrentGameObjectLocalTranslation = (x: number, y: number, z: number) => {
    //todo if current gameobject not exist,should hide the component panel
    translateLocal(getTransform(getCurrentGameObject()), x, y, z);
};

// export const setEulerAngle = (gameObject: GameObject, angle: number, x: number, y: number, z: number) => {
//     rotate(gameObject, angle, x, y, z);
// };

// export const setTriangleEulerAngle = (angle: number, x: number, y: number, z: number) => {
//     setEulerAngle(_getTriangle(), angle, x, y, z);
// };

