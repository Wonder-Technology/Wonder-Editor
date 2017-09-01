import { getColor as getColorBuss, setColor as setColorBuss } from "../bussiness/BasicMaterialBuss";

export const getColor = () => {
    return getColorBuss();
};

export const setColor = (colorStr: string) => {
    setColorBuss(colorStr);
};
