import {
    getChildren as getChildrenAdaptor, getComponent as getComponentAdaptor,
    hasComponent as hasComponentAdaptor
} from "../../adaptor/GameObjectAdaptor";
import { GameObject } from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";

export const getComponent = getComponentAdaptor;

export const hasComponent = hasComponentAdaptor;

export const getChildren = getChildrenAdaptor;

