module JsonData = {
  let app_composable_component_data = {|[
  {
    "name":"number_input","className":"inline-component","props":[
      {"name":"label", "value":"Arvin", "type":"string"},
      {"name":"onChange", "value":"fck2", "type":"function"}
    ]
  },
  {
    "name":"main_editor","className":"block-component","props":[
      {"name":"state","value":"appState", "type":"state"}
    ]
  },
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
  }
]|};
  let appRecord = app_composable_component_data |> ComposableParseSystem.convertDataToRecord;
};

module MapManager = {
  let createAppMap = (dispatch) => {
    let fck2 = (value) => Js.log(value);
    let redo = (action, _) => dispatch(action);
    let undo = (action, _) => dispatch(action);
    let appMap = WonderCommonlib.HashMapSystem.createEmpty();
    WonderCommonlib.HashMapSystem.set("fck2", Obj.magic(fck2), appMap)
    |> WonderCommonlib.HashMapSystem.set("redo", Obj.magic(redo(HistoryStore.TravelForward)))
    |> WonderCommonlib.HashMapSystem.set("undo", Obj.magic(undo(HistoryStore.TravelBackward)))
    |> ignore;
    appMap
  };
};