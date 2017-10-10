import {
    getLocalPosition as getLocalPositionBuss, getPosition as getPositionBuss,
    setLocalPosition as setLocalPositionBuss, setPosition as setPositionBuss,
    translateLocal as translateLocalBuss} from "../bussiness/TransformBuss";
import {ThreeDTransform} from "wonder.js/dist/es2015/component/transform/ThreeDTransform";

export const setPosition = setPositionBuss;

export const setLocalPosition = setLocalPositionBuss;

export const getPosition = getPositionBuss;

export const getLocalPosition = getLocalPositionBuss;

export const translateLocal = (transform:ThreeDTransform, x: number, y: number, z: number) => {
    translateLocalBuss(transform,x, y, z);
};

// export const setTriangleEulerAngle = (angle: number, x: number, y: number, z: number) => {
//     setTriangleEulerAngleBuss(angle, x, y, z);
// };