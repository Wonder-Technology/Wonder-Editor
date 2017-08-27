export interface ISceneGraph {
    camera: IGameObject;
    triangle: IGameObject;
}

export interface IGameObject {
    children?: IGameObject[];
    component: IComponent;
}

export interface IComponent {
    transform: ITransform;
    material?: IMaterial;
    camera?: ICamera;
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

/*
export interface IVector{
    x:number;
    y:number;
    z:number;
}
*/

