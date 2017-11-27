module JsonData = {
  let app_composable_component_data = {|[
  {
    "name":"button","className":"inline-component","props":[
      {"name":"text", "value":"redoBtn", "type":"string" },
      {"name":"onClick", "value":"redo", "type":"function"}
    ]
  },
  {
    "name":"button","className":"inline-component","props":[
      {"name":"text", "value":"undoBtn", "type":"string" },
      {"name":"onClick", "value":"undo", "type":"function"}
    ]
  },
  {
    "name":"main_editor","className":"block-component mainEditor-parent","props":[
      {"name":"state","value":"appState", "type":"state"}
    ]
  }
]|};
  let appRecord = app_composable_component_data |> ComposableParseSystem.convertDataToRecord;
};

module MapManager = {
  let createAppMap = (dispatch) => {
    let redo = (action, _) => dispatch(action);
    let undo = (action, _) => dispatch(action);
    let appMap = WonderCommonlib.HashMapSystem.createEmpty();
    WonderCommonlib.HashMapSystem.set("redo", Obj.magic(redo(HistoryStore.TravelForward)), appMap)
    |> WonderCommonlib.HashMapSystem.set("undo", Obj.magic(undo(HistoryStore.TravelBackward)))
    |> ignore;
    appMap
  };
};