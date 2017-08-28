import { Vector3 } from "wonder.js/dist/es2015/math/Vector3";
import {
    getThreeDTransformPosition,
    setThreeDTransformPosition, ThreeDTransform
} from "wonder.js/dist/es2015/component/transform/ThreeDTransform";

export const getPosition = (transform: ThreeDTransform) => {
    return getThreeDTransformPosition(transform);
};

export const translate = (transform: ThreeDTransform, x: number, y: number, z: number) => {
    var position = getPosition(transform);

    setThreeDTransformPosition(transform, position.add(Vector3.create(x, y, z)));
};