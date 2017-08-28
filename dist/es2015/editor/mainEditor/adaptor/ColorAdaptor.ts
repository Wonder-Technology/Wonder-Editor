import { Color } from "wonder.js/dist/es2015/structure/Color";

export const create = (colorStr: string = null) => {
    return Color.create(colorStr);
};

export const createByRGBA = (r: number, g: number, b: number, a: number) => {
    var color = Color.create();

    color.r = r;
    color.g = g;
    color.b = b;
    color.a = a;

    return color;
}