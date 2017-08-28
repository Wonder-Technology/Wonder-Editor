import { Vector3 } from "wonder.js/dist/es2015/math/Vector3";
import { getThreeDTransformPosition, setThreeDTransformPosition } from "wonder.js/dist/es2015/component/transform/ThreeDTransform";
export var getPosition = function (transform) {
    return getThreeDTransformPosition(transform);
};
export var translate = function (transform, x, y, z) {
    var position = getPosition(transform);
    setThreeDTransformPosition(transform, position.add(Vector3.create(x, y, z)));
};
//# sourceMappingURL=TransformAdaptor.js.map