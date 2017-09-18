import {
    create as createBasicMaterial, getColor as getColorOper,
    setColor as setColorOper
} from "../../../logic/adaptorOperator/BasicMaterialOper";
import { create as createColor } from "../../../logic/adaptorOperator/ColorOper";

export const getColor = () => {
    var currentBasicMaterial = _getCurrentBasicMaterial();

    return getColorOper(currentBasicMaterial);
}

export const setColor = (colorStr: string) => {
    var currentBasicMaterial = _getCurrentBasicMaterial();

    setColorOper(currentBasicMaterial, createColor(colorStr));

    //todo update editor state
};

//todo fix: get material of current gameObject after finish scene tree
const _getCurrentBasicMaterial = () => {
    return createBasicMaterial();
}
