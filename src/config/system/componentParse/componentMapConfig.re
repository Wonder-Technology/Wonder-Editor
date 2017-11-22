open AppComposableComponent.MapManager;

open MainEditorComposableComponent.MapManager;

let createComponentMap = (dispatch) : MapStore.componentsMapType => {
  let componentMap = WonderCommonlib.HashMapSystem.createEmpty();
  WonderCommonlib.HashMapSystem.set("app", createAppMap(dispatch), componentMap)
  |> WonderCommonlib.HashMapSystem.set("main_editor", createMainEditorMap(dispatch))
  |> ignore;
  componentMap
};