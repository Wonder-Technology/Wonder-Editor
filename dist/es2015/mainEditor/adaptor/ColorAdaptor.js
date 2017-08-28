import { Color } from "wonder.js/dist/es2015/structure/Color";
export var create = function (colorStr) {
    if (colorStr === void 0) { colorStr = null; }
    return Color.create(colorStr);
};
export var createByRGBA = function (r, g, b, a) {
    var color = Color.create();
    color.r = r;
    color.g = g;
    color.b = b;
    color.a = a;
    return color;
};
//# sourceMappingURL=ColorAdaptor.js.map