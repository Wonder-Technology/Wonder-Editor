export interface ISceneTreeGameObject {
    uid: number;
    name: string;
    children?: Array<ISceneTreeGameObject>;
}