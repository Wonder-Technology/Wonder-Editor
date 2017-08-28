import { createBasicMaterial, getBasicMaterialColor, setBasicMaterialColor } from "wonder.js/dist/es2015/component/material/BasicMaterial";
export var create = function () {
    return createBasicMaterial();
};
export var getColor = function (material) {
    return getBasicMaterialColor(material);
};
export var setColor = function (material, color) {
    setBasicMaterialColor(material, color);
};
//# sourceMappingURL=BasicMaterialAdaptor.js.map