module JsonData = {
  let mainEditor_composable_component_data = {|[
    {
      "name":"sceneTree","className":"inline-component sceneTree-parent","props":[
        {"name":"state","value":"appState", "type":"state"}
      ]
    },
    {
      "name":"inspector","className":"inline-component inspector-parent","props":[
        {"name":"state","value":"appState", "type":"state"}
      ]
    }
]|};
  let mainEditorRecord =
    mainEditor_composable_component_data |> ComposableParseSystem.convertDataToRecord;
};

module MapManager = {
  let createMainEditorMap = (dispatch) => {
    let addA = (action, _) => dispatch(action);
    let addB = (action, _) => dispatch(action);
    let mainEditorMap = WonderCommonlib.HashMapSystem.createEmpty();
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
    mainEditorMap
  };
};