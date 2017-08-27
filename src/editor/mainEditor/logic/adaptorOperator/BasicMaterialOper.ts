import { create, setColor, setOpacity } from "../../adaptor/BasicMaterialAdaptor";
import { BasicMaterial } from "amyjs/dist/es2015/Component/Material/BasicMaterial";
import { Color } from "amyjs/dist/es2015/Math/Color";
import { Material } from "amyjs/dist/es2015/Component/Material/Material";

export const createBasicMaterial = create;
export const setMaterialColor = setColor;
export const setMaterialOpacity = setOpacity;
