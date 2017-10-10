export interface IGameObject {
    name: string;
    uid: number;
    children?: Array<IGameObject>;
    component: IComponent;
}

export interface IComponent {
    transform: ITransform;
    camera?: ICamera;
    material?: IMaterial;
}

export interface ITransform {
    rotate: Array<number>;
    position: Array<number>;
    scale: Array<number>;
}

export interface ICamera {
    projection: "Perspective" | "Orthographic";
    far: number;
    near: number;
    aspect: number;
    fovy: number;
}

export interface IMaterial {
    color: string | Array<number>;
    opacity: number;
}

/*
export interface IVector{
    x:number;
    y:number;
    z:number;
}
*/

