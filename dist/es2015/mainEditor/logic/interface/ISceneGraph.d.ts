export interface IGameObject {
    name: string;
    uid: number;
    children?: IGameObject[];
    component: IComponent;
}
export interface IComponent {
    transform: ITransform;
    camera?: ICamera;
    material?: IMaterial;
}
export interface ITransform {
    rotate: number[];
    position: number[];
    scale: number[];
}
export interface ICamera {
    projection: "Perspective" | "Orthographic";
    far: number;
    near: number;
    aspect: number;
    fovy: number;
}
export interface IMaterial {
    color: string | number[];
    opacity: number;
}
