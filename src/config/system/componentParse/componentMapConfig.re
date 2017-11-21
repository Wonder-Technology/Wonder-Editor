let createComponentMap = (state: AppStore.appState, dispatch) : MapStore.componentsMapType => {
  let componentMap = WonderCommonlib.HashMapSystem.createEmpty();
  /* app map */
  let appMap = WonderCommonlib.HashMapSystem.createEmpty();
  WonderCommonlib.HashMapSystem.set("app", appMap, componentMap) |> ignore;
  let log = (value) => Js.log(value);
  let redo = (action, _) => dispatch(action);
  let undo = (action, _) => dispatch(action);
  WonderCommonlib.HashMapSystem.set("dispatch", Obj.magic(dispatch), appMap)
  |> WonderCommonlib.HashMapSystem.set("fck2", Obj.magic(log))
  |> WonderCommonlib.HashMapSystem.set("redo", Obj.magic(redo(HistoryStore.TravelForward)))
  |> WonderCommonlib.HashMapSystem.set("undo", Obj.magic(undo(HistoryStore.TravelBackward)))
  |> ignore;
  /* mainEditor map */
  let mainEditorMap = WonderCommonlib.HashMapSystem.createEmpty();
  WonderCommonlib.HashMapSystem.set("main_editor", mainEditorMap, componentMap) |> ignore;
  let addA = (action, _) => dispatch(action);
  let addB = (action, _) => dispatch(action);
  WonderCommonlib.HashMapSystem.set(
    "addA",
    Obj.magic(addA(AppStore.StringAction(StringStore.A))),
    mainEditorMap
  )
  |> WonderCommonlib.HashMapSystem.set(
       "addB",
       Obj.magic(addA(AppStore.StringAction(StringStore.B)))
     )
  |> ignore;
  componentMap
};