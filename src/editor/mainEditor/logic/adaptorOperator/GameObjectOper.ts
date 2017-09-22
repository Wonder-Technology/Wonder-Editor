import {
    addChild as addChildAdaptor, getAllComponents,
    getChildren as getChildrenAdaptor, getComponent as getComponentAdaptor, getMaterial as getMaterialAdaptor,
    hasComponent as hasComponentAdaptor, setParent as setParentAdaptor
} from "../../adaptor/GameObjectAdaptor";
import { GameObject } from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";
import { ThreeDTransform } from "wonder.js/dist/es2015/component/transform/ThreeDTransform";
import { Material } from "wonder.js/dist/es2015/component/material/Material";
import { EComponentType } from "../../enum/EComponentType";
import { AllComponentData } from "../../type/componentType";
import { CameraController } from "wonder.js/dist/es2015/component/camera/CameraController";
import { Component } from "wonder.js/dist/es2015/component/Component";
import { EComponentName } from "../../enum/EComponentName";
import { BasicMaterial } from "wonder.js/dist/es2015/component/material/BasicMaterial";
import { LightMaterial } from "wonder.js/dist/es2015/component/material/LightMaterial";

export const getComponent = getComponentAdaptor;

export const getMaterial = getMaterialAdaptor;

export const hasComponent = hasComponentAdaptor;

export const getChildren = getChildrenAdaptor;

export const setParent = setParentAdaptor;

export const addChild = addChildAdaptor;

export const getAllComponentData = (gameObject: GameObject):AllComponentData => {
    var result = [],
        allComponents = getAllComponents(gameObject);

    for(let componentId in allComponents){
        if(allComponents.hasOwnProperty(componentId)){
            let component:Component = allComponents[componentId],
                type:EComponentType = null,
                name:EComponentName = null;

            if(component instanceof ThreeDTransform){
                type = EComponentType.TRANSFORM;
                name = EComponentName.THREEDTRANSFORM;
            }
            else if(component instanceof Material){
                type = EComponentType.MATERIAL;

                if(component instanceof BasicMaterial){
                    name = EComponentName.BASICMATERIAL;
                }
                else if(component instanceof LightMaterial){
                    name = EComponentName.LIGHTMATERIAL;
                }
            }
            else if(component instanceof CameraController){
                type = EComponentType.CAMERA;
                name = EComponentName.CAMERACONTROLLER;
            }

            result.push({
                type,
                name,
                component
            });
        }
    }

    return result;
}

