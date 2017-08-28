import { getTriangleFromState } from "../../../logic/editor/SceneGameObjectEdit";
import { getState } from "../../../logic/editor/StateManagerEdit";
import { translate } from "../../../logic/adaptorOperator/TransformOper";
import { getTransform } from "../adaptorOperator/GameObjectOper";
export var setTriangleTranslation = function (x, y, z) {
    translate(getTransform(_getTriangle()), x, y, z);
};
// export const setEulerAngle = (gameObject: GameObject, angle: number, x: number, y: number, z: number) => {
//     rotate(gameObject, angle, x, y, z);
// };
// export const setTriangleEulerAngle = (angle: number, x: number, y: number, z: number) => {
//     setEulerAngle(_getTriangle(), angle, x, y, z);
// };
var _getTriangle = function () {
    return getTriangleFromState(getState());
};
//# sourceMappingURL=TransformBuss.js.map