import { Color } from "wonder.js/dist/es2015/structure/Color";

export const create = (colorStr: string = null) => {
    return Color.create(colorStr);
};