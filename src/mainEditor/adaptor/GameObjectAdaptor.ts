import { GameObject } from "amyjs/dist/es2015/core/Entity/GameObject";
import { Component } from "amyjs/dist/es2015/core/Component";

export const create = () => {
    return GameObject.create();
};

export const addComponent = (gameObject: GameObject, component: Component) => {
    gameObject.addComponent(component);
};

