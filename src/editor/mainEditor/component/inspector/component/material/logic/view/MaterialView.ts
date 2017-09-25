import {Material} from "wonder.js/dist/es2015/component/material/Material";
import {getGameObjectColor, setGameObjectColor} from "../bussiness/MaterialBuss";

export const getCurrentGameObjectColor = (material:Material)=>{
    return getGameObjectColor(material);
};

export const setCurrentGameObjectColor = (material:Material,colorStr:string) =>{
    setGameObjectColor(material,colorStr);
};
