import { create as createMeshRender } from "../../adaptor/MeshRenderAdaptor";
import { create as createColor } from "../../adaptor/ColorAdaptor";
import { createTriangle as createTriangleGeometry } from "../../adaptor/GeometryAdaptor";
import { addComponent, addMaterial, create as createGameObject } from "../../adaptor/GameObjectAdaptor";
import { create as createBasicMaterial, setColor as setMaterialColor } from "./BasicMaterialOper";
export var createTriangle = function (material) {
    var mat = null, geo = null, obj = null;
    if (material) {
        mat = material;
    }
    else {
        mat = createBasicMaterial();
        setMaterialColor(mat, createColor("#ff0000"));
    }
    geo = createTriangleGeometry();
    obj = createGameObject();
    addComponent(obj, geo);
    addComponent(obj, createMeshRender());
    addMaterial(obj, mat);
    return obj;
};
// export const createBox = (material?: Material) => {
//     let mat = null,
//         geo = null,
//         obj = null;
//
//     if (material) {
//         mat = material;
//     }
//     else {
//         mat = createBasicMaterial();
//
//         setMaterialColor(mat, createColor("#ff0000"));
//         // setMaterialOpacity(mat, 1);
//     }
//
//     geo = createBoxGeometry();
//     setMaterial(geo, mat);
//
//     obj = createGameObject();
//     addComponent(obj, geo);
//     addComponent(obj, createMeshRender());
//
//     return obj;
// };
//# sourceMappingURL=PrimitiveOper.js.map