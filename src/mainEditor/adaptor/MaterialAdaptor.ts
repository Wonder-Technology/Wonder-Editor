import { BasicMaterial } from "amyjs/dist/es2015/Component/Material/BasicMaterial";
import { Color } from "amyjs/dist/es2015/Math/Color";
import { Material } from "amyjs/dist/es2015/Component/Material/Material";

export const createBasic = () => {
    return BasicMaterial.create();
};

export const setMaterialColor = (material: Material, color: Color) => {
    material.color = color;
};

export const setMaterialOpacity = (material: Material, opacity: number) => {
    material.opacity = opacity;
};

