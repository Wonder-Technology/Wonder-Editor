module JsonData = {
  let mainEditor_composable_component_data = {|[
  {
    "name":"div","className":"block-component","props":[
      {"name":"text", "value":"text", "type":"stateValue"}
    ]
  },
  {
    "name":"button","className":"inline-component","props":[
      {"name":"text", "value":"addA", "type":"string" },
      {"name":"onClick", "value":"addA", "type":"function"}
    ]
  },
  {
    "name":"button","className":"inline-component","props":[
      {"name":"text", "value":"addB", "type":"string" },
      {"name":"onClick", "value":"addB", "type":"function"}
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