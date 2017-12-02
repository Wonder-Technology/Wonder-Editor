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
    let mainEditorMap = WonderCommonlib.HashMapSystem.createEmpty();
    mainEditorMap
  };
};