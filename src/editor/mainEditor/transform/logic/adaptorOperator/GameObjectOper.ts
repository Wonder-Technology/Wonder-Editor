import { rotate as rotateObject, translate as translateObject, getTransform as getGameObjectTransform } from "../../adaptor/GameObjectAdaptor";
import { GameObject } from "amyjs/dist/es2015/core/Entity/GameObject";
import { Transform } from "amyjs/dist/es2015/Component/Transform/Transform";

export const translate = translateObject;
export const rotate = rotateObject;
export const getTransform = getGameObjectTransform;
