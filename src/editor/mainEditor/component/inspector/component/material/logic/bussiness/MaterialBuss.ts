import {getColor, setColor} from "../adaptorOperator/BasicMaterialOper";
import {create as createColor} from "../../../../../../logic/adaptorOperator/ColorOper";
import {GameObject} from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";

import {Material} from "wonder.js/dist/es2015/component/material/Material";

export const getGameObjectColor = (material:Material) => {
    return getColor(material);
};

export const setGameObjectColor = (material:Material,colorStr:string) => {
    setColor(material,createColor(colorStr));
};
