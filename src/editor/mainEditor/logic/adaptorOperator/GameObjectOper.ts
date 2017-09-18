import {
    addChild as addChildAdaptor,
    getChildren as getChildrenAdaptor, getComponent as getComponentAdaptor, getMaterial as getMaterialAdaptor,
    hasComponent as hasComponentAdaptor, setParent as setParentAdaptor
} from "../../adaptor/GameObjectAdaptor";
import { GameObject } from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";

export const getComponent = getComponentAdaptor;

export const getMaterial = getMaterialAdaptor;

export const hasComponent = hasComponentAdaptor;

export const getChildren = getChildrenAdaptor;

export const setParent = setParentAdaptor;

export const addChild = addChildAdaptor
