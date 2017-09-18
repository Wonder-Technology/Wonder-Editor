import {setCurrentGameObjectLocalTranslation as setCurrentGameObjectLocalTranslationBuss,} from "../bussiness/TransformBuss";

export const setCurrentGameObjectLocalTranslation = (x: number, y: number, z: number) => {
    setCurrentGameObjectLocalTranslationBuss(x, y, z);
};

// export const setTriangleEulerAngle = (angle: number, x: number, y: number, z: number) => {
//     setTriangleEulerAngleBuss(angle, x, y, z);
// };
