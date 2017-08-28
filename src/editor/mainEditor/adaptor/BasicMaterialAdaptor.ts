import {
    BasicMaterial, createBasicMaterial, getBasicMaterialColor,
    setBasicMaterialColor
} from "wonder.js/dist/es2015/component/material/BasicMaterial";
import { Color } from "wonder.js/dist/es2015/structure/Color";


export const create = () => {
    return createBasicMaterial();
};

export const getColor = (material: BasicMaterial) => {
    return getBasicMaterialColor(material);
};

export const setColor = (material: BasicMaterial, color: Color) => {
    setBasicMaterialColor(material, color);
};
