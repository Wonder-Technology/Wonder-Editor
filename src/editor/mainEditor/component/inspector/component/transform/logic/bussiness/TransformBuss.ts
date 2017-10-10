import {GameObject} from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";

import {
    getLocalPosition as getLocalPositionOper, getPosition as getPositionOper,
    setLocalPosition as setLocalPositionOper, setPosition as setPositionOper,
    translateLocal as translateLocalOper
} from "../adaptorOperator/TransformOper";
import {ThreeDTransform} from "wonder.js/dist/es2015/component/transform/ThreeDTransform";

export const setPosition = setPositionOper;

export const setLocalPosition = setLocalPositionOper;

export const getPosition = getPositionOper;

export const getLocalPosition = getLocalPositionOper;

export const translateLocal = (transform:ThreeDTransform, x: number, y: number, z: number) => {
    translateLocalOper(transform, x, y, z);
};

// export const setEulerAngle = (gameObject: GameObject, angle: number, x: number, y: number, z: number) => {
//     rotate(gameObject, angle, x, y, z);
// };

// export const setTriangleEulerAngle = (angle: number, x: number, y: number, z: number) => {
//     setEulerAngle(_getTriangle(), angle, x, y, z);
// };

