open ExtendFunctionMap;

let createComponentMap = (extendName, extendMap) : MapStore.componentsMapType => {
  let componentMap = WonderCommonlib.HashMapSystem.createEmpty();
  WonderCommonlib.HashMapSystem.set(extendName, extendMap, componentMap) |> ignore;
  componentMap
};