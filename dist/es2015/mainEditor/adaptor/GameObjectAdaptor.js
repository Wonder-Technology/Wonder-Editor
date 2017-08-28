import { addGameObjectComponent, createGameObject, getGameObjectChildren, getGameObjectComponent, getGameObjectTransform, hasGameObjectComponent, removeGameObject } from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";
import { forEach } from "wonder.js/dist/es2015/utils/arrayUtils";
export var create = function () {
    return createGameObject();
};
export var addComponent = function (gameObject, component) {
    addGameObjectComponent(gameObject, component);
};
export var addMaterial = function (gameObject, material) {
    addComponent(gameObject, material);
};
export var getTransform = function (gameObject) {
    return getGameObjectTransform(gameObject);
};
export var getComponent = function (gameObject, _class) {
    return getGameObjectComponent(gameObject, _class);
};
export var hasComponent = function (gameObject, _class) {
    return hasGameObjectComponent(gameObject, _class);
};
export var getChildren = function (gameObject) {
    return getGameObjectChildren(gameObject);
};
export var removeAllChildren = function (gameObject) {
    forEach(getGameObjectChildren(gameObject), function (child) {
        removeGameObject(gameObject, child);
    });
};
//# sourceMappingURL=GameObjectAdaptor.js.map