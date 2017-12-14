open ExtendFunctionMap;

let createComponentMap = (dispatch) : MapStore.componentsMapType => {
  let componentMap = WonderCommonlib.HashMapSystem.createEmpty();
  WonderCommonlib.HashMapSystem.set(
    ExtendParseType.extendRecord.name,
    createExtendMap(),
    componentMap
  )
  |> ignore;
  componentMap
};