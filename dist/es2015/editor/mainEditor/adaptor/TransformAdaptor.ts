import { Vector3 } from "wonder.js/dist/es2015/math/Vector3";
import {
    getThreeDTransformLocalPosition,
    getThreeDTransformPosition, setThreeDTransformLocalPosition,
    setThreeDTransformPosition, ThreeDTransform
} from "wonder.js/dist/es2015/component/transform/ThreeDTransform";

export const getPosition = (transform: ThreeDTransform) => {
    return getThreeDTransformPosition(transform);
};

export const getLocalPosition = (transform: ThreeDTransform) => {
    return getThreeDTransformLocalPosition(transform);
};

export const translate = (transform: ThreeDTransform, x: number, y: number, z: number) => {
    var position = getPosition(transform);

    setThreeDTransformPosition(transform, position.add(Vector3.create(x, y, z)));
};

export const translateLocal = (transform: ThreeDTransform, x: number, y: number, z: number) => {
    var position = getLocalPosition(transform);

    setThreeDTransformLocalPosition(transform, position.add(Vector3.create(x, y, z)));
};
