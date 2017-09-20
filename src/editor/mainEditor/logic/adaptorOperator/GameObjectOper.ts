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
                type:EComponentType = null;

            if(component instanceof ThreeDTransform){
                type = EComponentType.TRANSFORM;
            }
            else if(component instanceof Material){
                type = EComponentType.MATERIAL;
            }
            else if(component instanceof CameraController){
                type = EComponentType.CAMERA;
            }

            result.push({
                type,
                component
            });
        }
    }

    return result;
}
