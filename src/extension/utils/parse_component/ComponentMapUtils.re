let createComponentMap = () : MapStore.componentsMapType =>
  WonderCommonlib.MutableHashMapService.createEmpty();

let addExtensionMap = (componentMap, extensionName, extensionMap) : MapStore.componentsMapType =>
  WonderCommonlib.MutableHashMapService.set(extensionName, extensionMap, componentMap);