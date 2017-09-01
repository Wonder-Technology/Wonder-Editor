import { setColor as setColorBuss } from "../bussiness/BasicMaterialBuss";

export const setColor = (colorStr:string) => {
    setColorBuss(colorStr);
};

export const getColor = () => {
    // I guess I uneed this from bottom layer
    return "#FFFFFF"
}
