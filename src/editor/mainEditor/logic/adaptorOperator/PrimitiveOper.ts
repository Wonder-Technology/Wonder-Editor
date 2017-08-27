import { create as createMeshRender } from "../../adaptor/MeshRenderAdaptor";
import { create as createColor } from "../../adaptor/ColorAdaptor";
import { createBox as createBoxGeometry, createTriangle as createTriangleGeometry, setMaterial } from "../../adaptor/GeometryAdaptor";
import { addComponent, create as createGameObject } from "../../adaptor/GameObjectAdaptor";
import { Material } from "amyjs/dist/es2015/Component/Material/Material";
import { createBasicMaterial, setMaterialColor, setMaterialOpacity } from "./BasicMaterialOper";

export const createTriangle = (material?: Material) => {
    var mat = null,
        geo = null,
        obj = null;

    if (material) {
        mat = material;
    }
    else {
        mat = createBasicMaterial();

        setMaterialColor(mat, createColor("#ff0000"));
        setMaterialOpacity(mat, 1);
    }

    geo = createTriangleGeometry();
    setMaterial(geo, mat);

    obj = createGameObject();
    addComponent(obj, geo);
    addComponent(obj, createMeshRender());

    return obj;
};

export const createBox = (material?: Material) => {
    let mat = null,
        geo = null,
        obj = null;

    if (material) {
        mat = material;
    }
    else {
        mat = createBasicMaterial();

        setMaterialColor(mat, createColor("#ff0000"));
        setMaterialOpacity(mat, 1);
    }

    geo = createBoxGeometry();
    setMaterial(geo, mat);

    obj = createGameObject();
    addComponent(obj, geo);
    addComponent(obj, createMeshRender());

    return obj;
};

