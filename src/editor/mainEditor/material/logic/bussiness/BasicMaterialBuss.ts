import { create as createBasicMaterial, setColor as setColorOper } from "../../../logic/adaptorOperator/BasicMaterialOper";
import { create as createColor } from "../../../logic/adaptorOperator/ColorOper";

export const setColor = (colorStr:string) => {
    var currentBasicMaterial = _getCurrentBasicMaterial();

    setColorOper(currentBasicMaterial, createColor(colorStr));

    //todo update editor state
};

//todo fix
const _getCurrentBasicMaterial = () => {
    return createBasicMaterial();
}
