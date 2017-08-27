import { TriangleGeometry } from "amyjs/dist/es2015/Component/Geometry/TriangleGeometry";
import { BoxGeometry } from "amyjs/dist/es2015/Component/Geometry/BoxGeometry";
import { Material } from "amyjs/dist/es2015/Component/Material/Material";
import { Geometry } from "amyjs/dist/es2015/Component/Geometry/Geometry";

export const setMaterial = (geometry: Geometry, material: Material) => {
    geometry.material = material;
};

export const createTriangle = () => {
    return TriangleGeometry.create();
};

export const createBox = () => {
    return BoxGeometry.create();
};
