import { getColor as getColorBuss, setColor as setColorBuss } from "../bussiness/BasicMaterialBuss";

export const getColor = () => {
    //todo need return color string
    // return getColorBuss();

    return "#ffffff";
};

export const setColor = (colorStr: string) => {
    setColorBuss(colorStr);
};
