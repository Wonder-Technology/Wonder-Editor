import {
    BasicMaterial, createBasicMaterial, getBasicMaterialColor,
    setBasicMaterialColor
} from "wonder.js/dist/es2015/component/material/BasicMaterial";
import { MaterialData } from "wonder.js/dist/es2015/component/material/MaterialData";
import { Color } from "wonder.js/dist/es2015/structure/Color";

export const create = () => {
    //todo fix: not init material data
    MaterialData.materialMap = [];
    MaterialData.colors = new Float32Array(12);

    return createBasicMaterial();
};

export const getColor = (material: BasicMaterial) => {
    return getBasicMaterialColor(material);
};

export const setColor = (material: BasicMaterial, color: Color) => {
    setBasicMaterialColor(material, color);
};
