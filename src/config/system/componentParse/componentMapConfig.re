/* open ExtensionFunctionMap; */

let createComponentMap = (extensionName, extensionMap) : MapStore.componentsMapType => {
  let componentMap = WonderCommonlib.HashMapSystem.createEmpty();
  WonderCommonlib.HashMapSystem.set(extensionName, extensionMap, componentMap) |> ignore;
  componentMap
};