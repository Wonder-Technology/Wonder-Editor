let createComponentMap = (state: AppStore.appState, disptach) => {
  let componentMap = WonderCommonlib.HashMapSystem.createEmpty();
  let appMap = WonderCommonlib.HashMapSystem.createEmpty();
  WonderCommonlib.HashMapSystem.set("app", appMap, componentMap) |> ignore;
  let log = (value) => Js.log(value);
  WonderCommonlib.HashMapSystem.set("fck2", Obj.magic(log), appMap) |> ignore;
  componentMap
};