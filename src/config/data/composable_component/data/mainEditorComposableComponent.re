let mainEditor_composable_component_data = {|[
  {
    "name":"div","className":"block-component","props":[
      {"name":"text", "value":"redoBtn", "type":"string" }
    ]
  },
  {
    "name":"button","className":"inline-component","props":[
      {"name":"text", "value":"undoBtn", "type":"string" },
      {"name":"onClick", "value":"undo", "type":"function"}
    ]
  }
]|};

let mainEditorRecord =
  mainEditor_composable_component_data |> ComposableParseSystem.convertDataToRecord;