import { Vector3 } from "wonder.js/dist/es2015/math/Vector3";
import { setThreeDTransformPosition } from "wonder.js/dist/es2015/component/transform/ThreeDTransform";

export const translate = (transform, x: number, y: number, z: number) => {
    setThreeDTransformPosition(transform, Vector3.create(x, y, z));
};