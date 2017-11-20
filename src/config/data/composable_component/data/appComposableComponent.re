let app_composable_component_data = {|[
  {
    "name":"number_input","className":"inline-component","props":[
      {"name":"label", "value":"Arvin", "type":"string"},
      {"name":"onChange", "value":"fck2", "type":"function"}
    ]
  },
  {
    "name":"main_editor","className":"block-component","props":[
      {"name":"state","value":"stringState", "type":"state"},
      {"name":"dispatch","value":"dispatch", "type":"function"},
      {"name":"appState","value":"appState", "type":"state"}
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