import { translate } from "../../../logic/adaptorOperator/TransformOper";
import { getTransform } from "../adaptorOperator/GameObjectOper";
import {getCurrentGameObject} from "../../../logic/bussiness/SceneBuss";

export const setCurrentGameObjectTranslation = (x: number, y: number, z: number) => {
    console.log(getCurrentGameObject());
    translate(getTransform(getCurrentGameObject()), x, y, z);
};

// export const setEulerAngle = (gameObject: GameObject, angle: number, x: number, y: number, z: number) => {
//     rotate(gameObject, angle, x, y, z);
// };

// export const setTriangleEulerAngle = (angle: number, x: number, y: number, z: number) => {
//     setEulerAngle(_getTriangle(), angle, x, y, z);
// };

