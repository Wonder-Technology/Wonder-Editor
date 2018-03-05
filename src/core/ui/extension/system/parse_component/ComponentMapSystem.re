let createComponentMap = () : MapStore.componentsMapType =>
  WonderCommonlib.HashMapSystem.createEmpty();

let addExtensionMap = (componentMap, extensionName, extensionMap) : MapStore.componentsMapType =>
  WonderCommonlib.HashMapSystem.set(extensionName, extensionMap, componentMap);