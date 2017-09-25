import {getMaterial} from "../../../../../../adaptor/GameObjectAdaptor";
import {getCurrentGameObject} from "../../../../../../logic/bussiness/SceneBuss";
import {getColor, setColor} from "../adaptorOperator/BasicMaterialOper";
import {create as createColor} from "../../../../../../logic/adaptorOperator/ColorOper";
import {GameObject} from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";


export const getCurrentGameObjectColor = () => {
    return getColor(getMaterial(getCurrentGameObject()));
};

export const setGameObjectColor = (gameObject:GameObject,colorStr:string) => {
    setColor(getMaterial(gameObject),createColor(colorStr));
};
