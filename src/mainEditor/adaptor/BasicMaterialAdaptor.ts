import { BasicMaterial } from "amyjs/dist/es2015/Component/Material/BasicMaterial";
import { Color } from "amyjs/dist/es2015/Math/Color";
import { Material } from "amyjs/dist/es2015/Component/Material/Material";

export const create = () => {
    return BasicMaterial.create();
};

export const color = (material: Material, color: Color) => {
    material.color = color;
};

export const opacity = (material: Material, opacity: number) => {
    material.opacity = opacity;
};

