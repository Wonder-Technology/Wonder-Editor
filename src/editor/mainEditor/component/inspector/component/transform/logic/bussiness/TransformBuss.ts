import {GameObject} from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";

import { translateLocal } from "../../../../../../logic/adaptorOperator/TransformOper";
import {ThreeDTransform} from "wonder.js/dist/es2015/component/transform/ThreeDTransform";

export const setGameObjectLocalTranslation = (transform:ThreeDTransform,x: number, y: number, z: number) => {
    translateLocal(transform, x, y, z);
};

// export const setEulerAngle = (gameObject: GameObject, angle: number, x: number, y: number, z: number) => {
//     rotate(gameObject, angle, x, y, z);
// };

// export const setTriangleEulerAngle = (angle: number, x: number, y: number, z: number) => {
//     setEulerAngle(_getTriangle(), angle, x, y, z);
// };

