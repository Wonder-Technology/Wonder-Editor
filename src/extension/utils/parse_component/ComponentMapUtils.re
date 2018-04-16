let createComponentMap = () : MapStore.componentsMapType =>
  WonderCommonlib.HashMapService.createEmpty();

let addExtensionMap = (componentMap, extensionName, extensionMap) : MapStore.componentsMapType =>
  WonderCommonlib.HashMapService.set(extensionName, extensionMap, componentMap);