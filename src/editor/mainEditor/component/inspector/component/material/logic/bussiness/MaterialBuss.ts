import {getMaterial} from "../../../../../../adaptor/GameObjectAdaptor";
import {getCurrentGameObject} from "../../../../../../logic/bussiness/SceneBuss";
import {getColor, setColor} from "../adaptorOperator/BasicMaterialOper";
import {create as createColor} from "../../../../../../logic/adaptorOperator/ColorOper";

export const getCurrentGameObjectColor = () => {
    return getColor(getMaterial(getCurrentGameObject()));
};

export const setCurrentGameObjectColor = (colorStr:string) => {
    setColor(getMaterial(getCurrentGameObject()),createColor(colorStr));
};