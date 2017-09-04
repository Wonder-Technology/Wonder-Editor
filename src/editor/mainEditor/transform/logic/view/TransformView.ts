import {setCurrentGameObjectTranslation as setCurrentGameObjectTranslationBuss,} from "../bussiness/TransformBuss";

export const setCurrentGameObjectTranslation = (x: number, y: number, z: number) => {
    setCurrentGameObjectTranslationBuss(x, y, z);
};

// export const setTriangleEulerAngle = (angle: number, x: number, y: number, z: number) => {
//     setTriangleEulerAngleBuss(angle, x, y, z);
// };
