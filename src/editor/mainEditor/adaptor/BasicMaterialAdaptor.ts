import {
    BasicMaterial, createBasicMaterial,
    setBasicMaterialColor
} from "wonder.js/dist/es2015/component/material/BasicMaterial";
import { Color } from "wonder.js/dist/es2015/structure/Color";


export const create = () => {
    return createBasicMaterial();
};

export const setColor = (material: BasicMaterial, color: Color) => {
    setBasicMaterialColor(material, color);
};
//
// export const setOpacity = (material: BasicMaterial, opacity: number) => {
//     setBasicMaterialOpacity(material, opacity);
// };

