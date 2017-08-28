import {
    addGameObjectComponent,
    createGameObject,
    GameObject, getGameObjectChildren, getGameObjectTransform, removeGameObject
} from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";
import { Component } from "wonder.js/dist/es2015/component/Component";
import { Material } from "wonder.js/dist/es2015/component/material/Material";
import { forEach } from "wonder.js/dist/es2015/utils/arrayUtils";

export const create = () => {
    return createGameObject();
};

export const addComponent = (gameObject: GameObject, component: Component) => {
    addGameObjectComponent(gameObject, component);
};

export const addMaterial = (gameObject: GameObject, material:Material) => {
    addComponent(gameObject, material);
}

export const getTransform = (gameObject: GameObject) => {
    return getGameObjectTransform(gameObject);
};

export const getChildren = (gameObject: GameObject) => {
    return getGameObjectChildren(gameObject);
};

export const removeAllChildren = (gameObject: GameObject) => {
    forEach(getGameObjectChildren(gameObject), (child: GameObject) => {
        removeGameObject(gameObject, child);
    });
};

