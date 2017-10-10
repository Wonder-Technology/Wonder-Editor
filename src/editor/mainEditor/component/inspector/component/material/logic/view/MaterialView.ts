import {Material} from "wonder.js/dist/es2015/component/material/Material";
import {getGameObjectColor as getGameObjectColorBuss, setGameObjectColor as setGameObjectColorBuss} from "../bussiness/MaterialBuss";

export const getGameObjectColor = (material:Material)=>{
    return getGameObjectColorBuss(material);
};

export const setGameObjectColor = (material:Material, colorStr:string) =>{
    setGameObjectColorBuss(material,colorStr);
};
