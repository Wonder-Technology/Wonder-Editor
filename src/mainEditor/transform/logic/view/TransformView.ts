import { setTriangleEulerAngle as setTriangleEulerAngleBuss, setTriangleTranslation as setTriangleTranslateBuss } from "../bussiness/TransformBuss";

export const setTriangleTranslation = (x: number, y: number, z: number) => {
    setTriangleTranslateBuss(x, y, z);
};

export const setTriangleEulerAngle = (angle: number, x: number, y: number, z: number) => {
    setTriangleEulerAngleBuss(angle, x, y, z);
};
