open ExtendFunctionMap;

let createComponentMap = () : MapStore.componentsMapType => {
  let componentMap = WonderCommonlib.HashMapSystem.createEmpty();
  WonderCommonlib.HashMapSystem.set(
    ExtendParseSystem.extendRecord.name,
    createExtendMap(),
    componentMap
  )
  |> ignore;
  componentMap
};