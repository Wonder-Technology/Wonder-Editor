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
import { EComponentClassName } from "../../enum/EComponentClassName";
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
                className:EComponentClassName = null;

            if(component instanceof ThreeDTransform){
                type = EComponentType.TRANSFORM;
                className = EComponentClassName.THREED_TRANSFORM;
            }
            else if(component instanceof Material){
                type = EComponentType.MATERIAL;

                if(component instanceof BasicMaterial){
                    className = EComponentClassName.BASIC_MATERIAL;
                }
                else if(component instanceof LightMaterial){
                    className = EComponentClassName.LIGHT_MATERIAL;
                }
            }
            else if(component instanceof CameraController){
                type = EComponentType.CAMERA;
                className = EComponentClassName.CAMERA_CONTROLLER;
            }

            result.push({
                type,
                className,
                component
            });
        }
    }

    return result;
};
