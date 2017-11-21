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