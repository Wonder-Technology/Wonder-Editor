import { GameObject } from "amyjs/dist/es2015/core/Entity/GameObject";

export interface ISceneGraph {
    camera: GameObject;
    triangle: GameObject;
}