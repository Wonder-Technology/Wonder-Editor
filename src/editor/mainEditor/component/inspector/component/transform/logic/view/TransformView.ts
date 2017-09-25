import {setGameObjectLocalTranslation} from "../bussiness/TransformBuss";
import {ThreeDTransform} from "wonder.js/dist/es2015/component/transform/ThreeDTransform";

export const setCurrentGameObjectLocalTranslation = (transform:ThreeDTransform,x: number, y: number, z: number) => {
    setGameObjectLocalTranslation(transform,x, y, z);
};

// export const setTriangleEulerAngle = (angle: number, x: number, y: number, z: number) => {
//     setTriangleEulerAngleBuss(angle, x, y, z);
// };