import { GameObject } from "amyjs/dist/es2015/core/Entity/GameObject";
import { Transform } from "amyjs/dist/es2015/Component/Transform/Transform";

export const getTransform = (gameObject: GameObject) => {
    return gameObject.transform;
};

export const translate = (gameObject: GameObject, x: number, y: number, z: number) => {
    let transform = getTransform(gameObject);

    transform.translate(x, y, z);
};

export const rotate = (gameObject: GameObject, angle: number, x: number, y: number, z: number) => {
    let transform = getTransform(gameObject);

    transform.rotate(angle, x, y, z);
};